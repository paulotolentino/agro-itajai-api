import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // Status de usuário
  await prisma.userStatus.create({
    data: {
      id: 1,
      name: 'Ativo',
    },
  });
  await prisma.userStatus.create({
    data: {
      id: 2,
      name: 'Inativo',
    },
  });

  // Tipos de pagamento
  await prisma.paymentType.create({
    data: {
      id: 1,
      name: 'Dinheiro',
    },
  });
  await prisma.paymentType.create({
    data: {
      id: 2,
      name: 'Cartão de crédito',
    },
  });
  await prisma.paymentType.create({
    data: {
      id: 3,
      name: 'Cartão de débito',
    },
  });
  await prisma.paymentType.create({
    data: {
      id: 4,
      name: 'Pix',
    },
  });
  await prisma.paymentType.create({
    data: {
      id: 5,
      name: 'Fiado',
    },
  });

  // Status de pedido
  await prisma.orderStatus.create({
    data: {
      id: 1,
      name: 'Aberto',
    },
  });
  await prisma.orderStatus.create({
    data: {
      id: 2,
      name: 'Fechado',
    },
  });
  await prisma.orderStatus.create({
    data: {
      id: 3,
      name: 'Cancelado',
    },
  });

  // Status de clientes
  await prisma.customerStatus.create({
    data: {
      id: 1,
      name: 'Ativo',
    },
  });
  await prisma.customerStatus.create({
    data: {
      id: 2,
      name: 'Inativo',
    },
  });
  await prisma.customerStatus.create({
    data: {
      id: 3,
      name: 'Bloqueado',
    },
  });
  await prisma.customerStatus.create({
    data: {
      id: 4,
      name: 'Inadimplemte',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
