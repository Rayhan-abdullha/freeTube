import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
      permissions: {
        create: [
          { name: 'create' },
          { name: 'read' },
          { name: 'update' },
          { name: 'delete' }
        ]
      }
    }
  });

  const editorRole = await prisma.role.create({
    data: {
      name: 'editor',
      permissions: {
        create: [
          { name: 'create' },
          { name: 'read' },
          { name: 'update' }
        ]
      }
    }
  });

  const viewerRole = await prisma.role.create({
    data: {
      name: 'viewer',
      permissions: {
        create: [{ name: 'read' }]
      }
    }
  });

  console.log('Roles and permissions created:', { adminRole, editorRole, viewerRole });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
