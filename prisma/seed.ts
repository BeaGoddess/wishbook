import { PrismaClient } from '../src/generated/prisma/client.js'

import { getDatabaseUrl } from '../src/database-url.js'

import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: getDatabaseUrl(),
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')
  await prisma.rarity.upsert({
    where: { stars: 3 },
    update: { dropWeight: 80, color: '#4a90d9' },
    create: { stars: 3, dropWeight: 80, color: '#4a90d9' },
  })

  await prisma.rarity.upsert({
    where: { stars: 4 },
    update: { dropWeight: 17, color: '#a256e1' },
    create: { stars: 4, dropWeight: 17, color: '#a256e1' },
  })

  await prisma.rarity.upsert({
    where: { stars: 5 },
    update: { dropWeight: 3, color: '#e2a93b' },
    create: { stars: 5, dropWeight: 3, color: '#e2a93b' },
  })
  console.log('🌱 Rarities seeded')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
