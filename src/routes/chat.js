import ChatController from '../controllers/chatController'

import express from 'express'

const route = express.Router()

route.post('/',  ChatController.send);


module.exports = route