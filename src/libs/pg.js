const { log } = require("console")
const {Pool} = require("pg")


const pool = new Pool({
    host:"localhost",
    port :5432,
    user :"postgres",
    password :"11",
    database :"klinika"
})

const pg = async (SQL, ...values) =>{
    const client = await pool.connect()
    try{

        const {rows} = await client.query(SQL, values.length ? values : null)
        return rows
        
    }catch(error){
        res.status(500).json({message: `${error.message}`})
    }finally{
        client.release()
    }
}

module.exports = pg