import 'dotenv'
import { createServer } from 'http'
import { App } from './config/App'

const server = createServer(new App().express)

server.listen(8000, () => console.log('Listening'))
