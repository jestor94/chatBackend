import express from 'express'
import cors from 'cors'
import { deploy } from './config/environment'
import bodyParser from 'body-parser'
import fs from 'fs'




const routes = fs.readdirSync(__dirname + '/routes')
const router = express.Router();
const app = express()



//Settings
app.set('port', process.env.port || deploy.port)
let port = app.get('port')


//MW
app.use(cors({credentials: true, origin: 'http://localhost:4200'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




// Routes
routes.map(fileNameRoutes => {
    let prefix = fileNameRoutes.split('.')[0]
    let baseUrl =
      prefix === 'index' ?
        `/moons/` :
        `/moons/${prefix}/`
    app.use(baseUrl, [], require(`./routes/${fileNameRoutes}`))
})
  
app.use(router.all('*', (req, res) => {
  res.status(404).send({ err: 'Not found' })
}))
  




const server = app.listen(port, () => {
    console.log("Initialize on port ", port);
});

const SocketIO = require('socket.io')
const io = SocketIO(server)
io.on('connection', (socket) => {
  console.log('new user');

  socket.on('new-message', (message) => {
    console.log(' ', message)
    io.emit('new-message', message);
  });
})



module.exports = app;