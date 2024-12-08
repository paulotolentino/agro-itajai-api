import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // Status de usuário
  await prisma.userStatus.upsert({
    create: {
      id: 1,
      name: 'Ativo',
    },
    update: {},
    where: {
      id: 1,
    },
  });
  await prisma.userStatus.upsert({
    create: {
      id: 2,
      name: 'Inativo',
    },
    update: {},
    where: {
      id: 2,
    },
  });

  // Tipos de pagamento
  await prisma.paymentType.upsert({
    create: {
      id: 1,
      name: 'Dinheiro',
    },
    update: {},
    where: {
      id: 1,
    },
  });
  await prisma.paymentType.upsert({
    create: {
      id: 2,
      name: 'Cartão de crédito',
    },
    update: {},
    where: {
      id: 2,
    },
  });
  await prisma.paymentType.upsert({
    create: {
      id: 3,
      name: 'Cartão de débito',
    },
    update: {},
    where: {
      id: 3,
    },
  });
  await prisma.paymentType.upsert({
    create: {
      id: 4,
      name: 'Pix',
    },
    update: {},
    where: {
      id: 4,
    },
  });
  await prisma.paymentType.upsert({
    create: {
      id: 5,
      name: 'Fiado',
    },
    update: {},
    where: {
      id: 5,
    },
  });

  // Status de pedido
  await prisma.orderStatus.upsert({
    create: {
      id: 1,
      name: 'Pago',
    },
    update: {
      name: 'Pago',
    },
    where: {
      id: 1,
    },
  });
  await prisma.orderStatus.upsert({
    create: {
      id: 2,
      name: 'Em aberto',
    },
    update: {
      name: 'Em aberto',
    },
    where: {
      id: 2,
    },
  });
  await prisma.orderStatus.upsert({
    create: {
      id: 3,
      name: 'Cancelado',
    },
    update: {},
    where: {
      id: 3,
    },
  });
  await prisma.orderStatus.upsert({
    create: {
      id: 4,
      name: 'Atrasado',
    },
    update: {
      name: 'Atrasado',
    },
    where: {
      id: 4,
    },
  });

  // Status de clientes
  await prisma.customerStatus.upsert({
    create: {
      id: 1,
      name: 'Ativo',
    },
    update: {},
    where: {
      id: 1,
    },
  });
  await prisma.customerStatus.upsert({
    create: {
      id: 2,
      name: 'Inativo',
    },
    update: {},
    where: {
      id: 2,
    },
  });
  await prisma.customerStatus.upsert({
    create: {
      id: 3,
      name: 'Bloqueado',
    },
    update: {},
    where: {
      id: 3,
    },
  });
  await prisma.customerStatus.upsert({
    create: {
      id: 4,
      name: 'Inadimplemte',
    },
    update: {},
    where: {
      id: 4,
    },
  });
  await prisma.settings.create({
    data: {
      id: 1,
      daysToExpireDebit: 40,
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
