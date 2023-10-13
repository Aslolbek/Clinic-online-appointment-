const router = require("express").Router()
const {login} = require("../controller/login.controller")

router.post("/login", login)

module.exports = router