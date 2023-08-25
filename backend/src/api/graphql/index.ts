import { decorateType } from 'nexus'
import { GraphQLDateTime } from 'graphql-scalars'
import { GraphQLGeoJSONPoint } from "./GraphQLPosition"

export const GQLDateTime = decorateType(GraphQLDateTime, {
    sourceType: 'Date',
    asNexusMethod: 'datetime'
} )

export const GQLGeoJSONPosition = GraphQLGeoJSONPoint;

export * from './Location'
export * from './Room'
export * from './Reading'