import { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
    // Lógica de processamento de pagamento
    console.log('Processando pagamento:', event);
    return { status: 'PAID' };
}