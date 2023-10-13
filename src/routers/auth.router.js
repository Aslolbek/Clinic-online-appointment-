const {Router}=require("express")
const { SignUp, SignIn } = require("../controller/auth.controler")

const router = Router()

router.post("/signup", SignUp)
router.post("/signin", SignIn)



module.exports=router