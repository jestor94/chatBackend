
exports.sendMessage = (user, message) => {
    try {
        return new Promise ( (resolve, reject) => {
            resolve(true)
            
            // if(user == 'player1' && password == '1234'){
            //     resolve({user: 'Adam'})
            // }
            // else if(user == 'player2' && password == '12345'){
            //     resolve({user: 'Anna'})
            // }
            // else{
            //     resolve(false)
            // }
        })
    } catch (error) {
        return error
    }
}