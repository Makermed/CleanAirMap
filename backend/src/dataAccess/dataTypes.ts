import { Prisma } from "@prisma/client"
// TODO: figure out if this can be referenced from Prisma types
export interface LocationModel {
    locationId: number
    name: string
    feature_type: string | null
    full_address: string
    geometry: Prisma.JsonValue
    created_id: number
    created_at: Date
}

export interface LocationModelInput {
    name: string
    feature_type: string | null
    full_address: string
    geometry: Prisma.InputJsonValue | Prisma.JsonNullValueInput
    created_id: number
}

export interface RoomModel {
    roomId: number
    locationId: number
    name: string
    created_id: number
    created_at: Date
}