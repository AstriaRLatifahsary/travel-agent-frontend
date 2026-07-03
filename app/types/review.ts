import type { TravelPackage } from './travel-package'

export interface Review {
  id: number
  travelPackageId: number
  customerName: string
  customerPhoto: string
  comment: string
  rating: number
  travelPackage?: TravelPackage | null
}