const router = require("express").Router()

const { addXizmatlar, delXizmatlar, updXizmatlar } = require("../controller/addXizmatlar.controller")

router.post("/addXizmatlar", addXizmatlar)
router.post("/delXizmatlar/:id", delXizmatlar)
router.post("/updXizmatlar/:id", updXizmatlar)

module.exports = router