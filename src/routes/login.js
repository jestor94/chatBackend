import LoginController from '../controllers/loginController'

import express from 'express'

const route = express.Router()

route.post('/',  LoginController.login);


module.exports = route