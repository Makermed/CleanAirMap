import { decorateType } from 'nexus'
import { GraphQLDateTime } from 'graphql-scalars'

export const GQLDateTime = decorateType(GraphQLDateTime, {
    sourceType: 'Date',
    asNexusMethod: 'datetime'
} )

export * from './Location'