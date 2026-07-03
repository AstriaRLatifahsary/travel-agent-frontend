export interface TravelPackage {
  id: number
  title: string
  destination: string
  description: string
  price: string
  duration: string
  quota: number
  facilities: string
  image: string
  rating?: number
  reviewCount?: number
}