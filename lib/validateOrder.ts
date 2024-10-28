import { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
    // Lógica de validação de pedidos
    console.log('Validando pedido:', event);
    return { status: 'VALIDATED' };
};