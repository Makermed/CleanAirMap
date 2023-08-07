export { User } from "@prisma/client"
export { Reading } from "@prisma/client"
export { Location } from "@prisma/client"
export { Room } from "@prisma/client"

// TODO: figure out if this can be referenced from Prisma types
export interface LocationModel {
    id: number
    name: String
    type: number
    street: String
    locality: String | null
    place: String
    district: String | null
    region: String
    postcode: String | null
    country: String
    latitude: number
    longitude: number
    description: String | null
    avgCo2: number | null
    created_id: number
    created_at: Date
}