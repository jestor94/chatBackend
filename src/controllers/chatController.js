import { sendMessage } from '../models/loginModel'

exports.send = async (req, res, next) => {
    try {
        let {user, message} = req.body;

        

        const chatResponse = await sendMessage(user, message)

        if(!chatResponse){
            res.status(400).json({
                resp: 400,
                description: 'Message error'
            })
            return
        }

        res.status(200).json({
            resp: 200,
            description: 'done'
        })
        console.log('Chat')
        return;
        
    } catch (error) {
        console.log('Chat error: ', error)
        next(error)

        return;
    }
}