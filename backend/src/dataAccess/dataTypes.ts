import { Decimal } from "@prisma/client/runtime/library"

// TODO: figure out if this can be referenced from Prisma types
export interface LocationModel {
    locationId: number
    name: string
    type: number
    street: string
    locality: string | null
    place: string
    district: string | null
    region: string
    postcode: string | null
    country: string
    latitude: number
    longitude: number
    description: string | null
    avgCo2: number | null
    created_id: number
    created_at: Date
}

export interface RoomModel {
    roomId: number
    locationId: number
    name: string
    created_id: number
    created_at: Date
}

export interface ReadingModel {
    id: number
    locationId: number
    roomId: number | null
    value: Decimal
    unit: string
    notes: string | null
    created_id: number
    created_at: Date
}