const pg = require("../libs/pg")
const addXizmatlar = async (req, res) => {
    const {xizmat_nomi, xizmat_narxi, Clinika_id} = req.body



     await pg( ` insert into xizmatlar(xizmat_nomi, xizmat_narxi, Clinika_id ) values($1, $2, $3)`, xizmat_nomi, xizmat_narxi, Clinika_id)
    res.status(201).json({message: "xizmatlar added", })
}

const updXizmatlar = async (req, res) => {
    const {xizmat_nomi, xizmat_narxi, Clinika_id} = req.body    
    const {id} = req.params

    const data = await pg(` update xizmatlar set xizmat_nomi = $1, xizmat_narxi = $2, Clinika_id = $3 where id = $4` , xizmat_nomi, xizmat_narxi, Clinika_id, id) 
    res.status(200).json({message: "xizmat yangilandi ", data })

}

const delXizmatlar = async (req, res) => {
    const {id} = req.params

    const foundClinika = await pg(`select * from clinika where id=$1`, id)
    const id1 = foundClinika[0].id

    if(foundClinika.length) {
        const data = await pg(` delete from xizmatlar where id = $1 `, id1)
         res.status(200).json({message: "xizmat o'chirildi ", data })

    }
}

module.exports = {
    addXizmatlar,
    updXizmatlar,
    delXizmatlar,
}