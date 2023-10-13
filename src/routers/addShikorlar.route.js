const router = require("express").Router()
const { addShifokorlar, updShifokorlar, delShifokor } = require("../controller/addShifokor.controller")

router.post("/addShifokorlar", addShifokorlar)
router.post("/updShifokorlar/:id", updShifokorlar)
router.post("/delShifokor/:id", delShifokor)

module.exports = router