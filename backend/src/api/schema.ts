import { makeSchema } from 'nexus'
import { join } from 'path'
import * as allTypes from './graphql'

export const schema = makeSchema({
  types: allTypes,
  outputs: {
    typegen: join(__dirname, '../..', 'nexus-typegen.ts'),
    schema: join(__dirname, '../..', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, "./context.ts"),
    export: "Context",
  },
  sourceTypes: {
    headers: [ 'import { LocationModel } from "./src/dataAccess/dataTypes" '],
    modules: []
  }
})
