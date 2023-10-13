const {Router} = require("express")
const { Logindoctor, tashxis } = require("../controller/auth.doctors.controller")

const router=Router()

router.get("/admin/doctor", Logindoctor)
router.get("/tashxis", tashxis)

module.exports=router

