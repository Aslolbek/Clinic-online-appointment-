const pg =require("../libs/pg")
const bcrypt = require("../libs/bcrypt")
const jwt = require("../libs/jwt")
const {validation} = require("../validation/user.validation")


//Registr
const SignUp =async (req, res )=>{
    try {
        
        const error = await validation(req.body)
        
        if(error) return res.status(400).json({message: error})
        
        const {ism, familiya, yoshi, tel} = req.body
        
        const checktel = (await pg(`select * from mijozlar where tel=$1 `, tel))[0]
        
        
        if(checktel){
            
            res.status(400).json("Bu telfon raqamidan ro'yxatdan o'tilgan")
            
        }else{
            
            const password_hesh =await bcrypt.hesh(tel)
            
            console.log(req.body);
            await pg(`insert into mijozlar(ism, familiya, yosh, tel, password) Values($1,$2,$3,$4,$5)`,ism, familiya, yoshi, tel, password_hesh)
            
            res.status(201).json("Ro'yxatdan o'tdingiz") 
        }
        
    } catch (error) {
        res.status(403).json({message:`${error.message}`})
    }
    }
  

//LOGIN
const SignIn = async (req, res)=>{
    try {
        
        
        const {ism, tel} = req.body
        
        const bemor = (await pg(`select * from mijozlar where ism=$1`, ism))[0]
        
        if(!bemor){
            
            res.status(403).json("Topilmadi")
            
        }else {
            
            const chec = await bcrypt.passcompare(tel, bemor.password)
            if(chec){
                const token = await jwt.sign(bemor.id)
                res.cookie("token",token)
                res.status(201).json({message:"Tizmmiga kirdingiz", data:`${token}`})
            }else{
                res.status(201).json("parol xato")
            }
        }
        
    } catch (error) {
        res.status(403).json({message:`${error.message}`})
        
    }
}
    
    
    module.exports={
        SignUp,
        SignIn
    }
