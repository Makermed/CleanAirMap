// TODO: figure out if this can be referenced from Prisma types
export interface LocationModel {
    locationId: number
    name: string
    feature_type: string
    full_address: string
    geometry: JSON
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