const {Router} = require("express")
const { Clinika,  bolimlar, xizmatlar, shifokorIzlash, shifokorMutaxasislig, navbat, doctorOne} = require("../controller/clinika.controller")

const router = Router()

router.get("/", Clinika)
router.get("/bolimlar", bolimlar)
router.post("/xizmatlar/:id", xizmatlar)

router.post("/search/shifokor", shifokorIzlash)

router.post("/one/c/:idd/d/:id", doctorOne)
router.post("/search/mutaxasislik", shifokorMutaxasislig)
router.post("/navbat", navbat)



module.exports = router