import { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
    // Lógica para atualizar o status do pedido
    console.log('Atualizando status do pedidio:', event);
    return { status: 'DELIVERED' };
}