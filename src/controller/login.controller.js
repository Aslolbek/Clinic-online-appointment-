const jwt = require("../libs/jwt")
const pg = require("../libs/pg")

const login = async (req, res) => {
    const {login, password} = req.body
    
    const foundUser = await pg(`select * from admin where login=$1`, login)

    if(foundUser[0].password == password){

        const token = await jwt.sign(foundUser[0].id)
        res.cookie("token",token)
        res.status(200).json({message:"you are logged in"})        
    } else {
        res.status(403).json({message:"username or password not found"})
    }
}

module.exports = {
    login,
}