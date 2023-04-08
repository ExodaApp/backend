import 'dotenv'
import { createServer } from 'http'
import { App } from './config/App'

const server = createServer(new App().express)

server.listen(8080, () => console.log('Listening'))
