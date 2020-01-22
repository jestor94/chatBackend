import { login } from '../models/loginModel'

exports.login = async (req, res, next) => {
    try {
        let {user, password} = req.body;

        

        const loginDone = await login(user, password)

        if(!loginDone){
            res.status(400).json({
                resp: 400,
                description: 'User or password incorrect'
            })
            return
        }

        res.status(200).json({
            resp: 200,
            description: 'Login done'
        })
        console.log('Login')
        return;
        
    } catch (error) {
        console.log('Login error: ', error)
        next(error)

        return;
    }
}