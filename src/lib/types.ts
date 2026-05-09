export interface ProductWithCategory {
  id: number
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  stock: number
  active: boolean
  category: {
    id: number
    name: string
    slug: string
  }
}
