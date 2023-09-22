import { decorateType } from 'nexus'
import { GraphQLDateTime, GraphQLJSONObject } from 'graphql-scalars'
import { GraphQLGeoJSONPoint } from "./GraphQLPosition"

export const GQLDateTime = decorateType(GraphQLDateTime, {
    sourceType: 'Date',
    asNexusMethod: 'datetime'
} )

export const GQLJSONObject = decorateType(GraphQLJSONObject, {
    sourceType: 'any',
    asNexusMethod: 'jsonObject'
})

export const GQLGeoJSONPosition = GraphQLGeoJSONPoint;

export * from './Location'
export * from './Room'