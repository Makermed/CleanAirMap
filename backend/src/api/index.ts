import { server } from './server';
import { createContext } from './context'
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from 'dotenv'

dotenv.config()
const portNum = process.env.PLAYGROUND_PORT == undefined ? 4000 : parseInt(process.env.PLAYGROUND_PORT)
startStandaloneServer(server, { context: createContext, listen: { port: portNum }}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
});