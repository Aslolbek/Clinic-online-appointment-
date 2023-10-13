const express = require("express")
require("dotenv").config()
const cors = require("cors")
const path = require("path")
const router = require("./routers")
const file = require("express-fileupload")

const cookie = require("cookie-parser")

try {
    
    
    
    const  app = express()
    


app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookie())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(file())

app.use(express.static(process.cwd() + "/src/public"));
app.use(express.static(process.cwd() + "/uploads"));

app.use(router)


const PORT =process.env.PORT


app.listen(PORT, ()=>{
    console.log("PORT:",PORT);
})

} catch (error) {
    console.log(error.message);
    
}
