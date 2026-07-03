export interface Banner {
  id: number
  title: string
  subtitle: string | null
  image: string | null
  description: string | null
  isActive: boolean
  travelPackageId: number | null
}