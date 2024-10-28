import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';

export class DeliveryAssistantStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Função Lambda para validar pedidos
    const validateOrderFunction = new lambda.Function(this, 'ValidateOrderFunction', {
      runtime: lambda.Runtime.NODEJS_14_X, // ou a versão que você estiver usando
      handler: 'validateOrder.handler',
      code: lambda.Code.fromAsset('lib'),
  });

  // Função Lambda para processar pagamentos
  const processPaymentFunction = new lambda.Function(this, 'ProcessPaymentFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'processPayment.handler',
      code: lambda.Code.fromAsset('lib'),
  });

  // Função Lambda para atualizar o status do pedido
  const updateOrderStatusFunction = new lambda.Function(this, 'UpdateOrderStatusFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'updateOrderStatus.handler',
      code: lambda.Code.fromAsset('lib'),
  });

  // Definindo as tarefas do Step Functions
  const validateOrderTask = new tasks.LambdaInvoke(this, 'Validate Order', {
      lambdaFunction: validateOrderFunction,
      outputPath: '$.Payload',
  });

  const processPaymentTask = new tasks.LambdaInvoke(this, 'Process Payment', {
      lambdaFunction: processPaymentFunction,
      outputPath: '$.Payload',
  });

  const updateOrderStatusTask = new tasks.LambdaInvoke(this, 'Update Order Status', {
      lambdaFunction: updateOrderStatusFunction,
      outputPath: '$.Payload',
  });

  // Criando a máquina de estados
  const definition = validateOrderTask
      .next(processPaymentTask)
      .next(updateOrderStatusTask);

  const stateMachine = new sfn.StateMachine(this, 'DeliveryStateMachine', {
      definition,
      timeout: cdk.Duration.minutes(5),
  });
}
}
