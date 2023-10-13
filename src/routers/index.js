const auth =require("./auth.router")
const clinika = require("./clinika.router")
const authdoctors = require("./auth.doctros.router")
const login = require("./login.route")
const addClinika = require("./addClinika.route")
const addXizmatlar = require("./addXizmatlar.route")
const addShifokor = require("./addShikorlar.route")


module.exports=[auth, clinika, authdoctors, login, addClinika, addXizmatlar, addShifokor]