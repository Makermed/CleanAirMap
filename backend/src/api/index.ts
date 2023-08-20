import { server } from './server';
import { createContext, createLegacyContext } from './context'
import { startStandaloneServer, StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import dotenv from 'dotenv'

dotenv.config()
const portNum = process.env.PLAYGROUND_PORT ? parseInt(process.env.PLAYGROUND_PORT) : 4000
const opts = process.env.USE_LEGACY_ENDPOINT
    ? { context: createLegacyContext}
    : { context: createContext, listen: { port: portNum }}


startStandaloneServer(server, opts).then(({ url }) => {
    console.log(`Server ready at ${url}`)
    if (process.env.USE_LEGACY_ENDPOINT) {
        console.log(`Reading from: ${process.env.USE_LEGACY_ENDPOINT }`)
    }
});