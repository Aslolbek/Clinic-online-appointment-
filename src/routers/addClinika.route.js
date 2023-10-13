const router = require("express").Router()
const { addClinika, updClinika, delClinika} = require("../controller/addClinika.controller")

router.post("/addClinika", addClinika)
router.put("/updClinika/:id", updClinika)
router.delete("/delClinika/:id", delClinika)

module.exports = router