import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'taschen' }, update: {}, create: { name: 'Taschen', slug: 'taschen' } }),
    prisma.category.upsert({ where: { slug: 'wohnen' }, update: {}, create: { name: 'Wohnen', slug: 'wohnen' } }),
    prisma.category.upsert({ where: { slug: 'kleidung' }, update: {}, create: { name: 'Kleidung', slug: 'kleidung' } }),
    prisma.category.upsert({ where: { slug: 'kueche' }, update: {}, create: { name: 'Küche', slug: 'kueche' } }),
    prisma.category.upsert({ where: { slug: 'beleuchtung' }, update: {}, create: { name: 'Beleuchtung', slug: 'beleuchtung' } }),
  ])

  const [taschen, wohnen, kleidung, kueche, beleuchtung] = categories

  const products = [
    {
      name: 'Artisan Leder-Shopper',
      slug: 'artisan-leder-shopper',
      description: 'Handgefertigter Shopper aus hochwertigem Leder. Jedes Stück ist ein Unikat mit einzigartiger Maserung.',
      price: 249,
      images: ['https://images.unsplash.com/photo-1544816153-0973059430c5?q=80&w=800&auto=format&fit=crop'],
      categoryId: taschen.id,
    },
    {
      name: 'Minimalistische Keramik-Vase',
      slug: 'minimalistische-keramik-vase',
      description: 'Handgefertigte Keramikvase im minimalistischen Stil. Perfekt für moderne Wohnräume.',
      price: 89,
      images: ['https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800&auto=format&fit=crop'],
      categoryId: wohnen.id,
    },
    {
      name: 'Handgewebter Seidenschal',
      slug: 'handgewebter-seidenschal',
      description: 'Luxuriöser Seidenschal, sorgfältig von Hand gewebt. Zeitloser Stil für jede Jahreszeit.',
      price: 129,
      images: ['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop'],
      categoryId: kleidung.id,
    },
    {
      name: 'Holz-Servierbrett',
      slug: 'holz-servierbrett',
      description: 'Handgefertigtes Servierbrett aus nachhaltigem Walnussholz. Ideal für Käse und Charcuterie.',
      price: 75,
      images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop'],
      categoryId: kueche.id,
    },
    {
      name: 'Leinen-Kissenbezug',
      slug: 'leinen-kissenbezug',
      description: 'Natürlicher Leinenstoff in zeitlosem Beige. Weich und atmungsaktiv für höchsten Schlafkomfort.',
      price: 45,
      images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop'],
      categoryId: wohnen.id,
    },
    {
      name: 'Schreibtischlampe aus Messing',
      slug: 'schreibtischlampe-messing',
      description: 'Elegante Schreibtischlampe aus poliertem Messing. Handgefertigt mit einstellbarem Arm.',
      price: 185,
      images: ['https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop'],
      categoryId: beleuchtung.id,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('Seed erfolgreich: Kategorien und Produkte eingefügt.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
