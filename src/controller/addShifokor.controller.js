const pg = require("../libs/pg")
const {v4: uuid} = require("uuid")
const path = require("path");


const addShifokorlar = async (req, res) => {
   try {
      
    const { Clinika_id, ism, familiya, tel, mutaxasisligi, xizmat_id, ish_vaqti, ish_kuni, malakasi, xona, etaj  } = req.body
    const {rasm} = req.files

    const image_name = `${uuid()}${path.extname(rasm.name)}`;
    rasm.mv(process.cwd() + "/uploads/" + image_name); 


    const shifokor =  await pg( ` insert into shifokorlar(Clinika_id, ism, familiya, tel, image_name, mutaxasisligi, xizmat_id, ish_vaqti, ish_kuni, malakasi, xona, etaj) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) `, Clinika_id, ism, familiya, tel, image_name, mutaxasisligi, xizmat_id, ish_vaqti, ish_kuni, malakasi,
    xona, etaj)
    
    res.status(201).json({message: "shifokor qo'shildi", shifokor })   
   } catch (error) {
    console.log(error);
   }

}

const updShifokorlar = async (req, res) => {
   try {
    const { Clinika_id, ism, familiya, tel, mutaxasisligi, xizmat_id, ish_vaqti, ish_kuni, malakasi, xona, etaj  } = req.body
    const {rasm} = req.files
    const {id} = req.params

    
    const image_name = `${uuid()}${path.extname(rasm.name)}`;
    rasm.mv(process.cwd() + "/uploads/" + image_name); 

    const shifokor =  await pg( ` update  shifokorlar set Clinika_id = $1, ism = $2, familiya = $3, tel = $4, image_name = $5, mutaxasisligi = $6, xizmat_id = $7, ish_vaqti = $8, ish_kuni = $9, malakasi = $10, xona = $11, etaj = $12 where id = $13`, Clinika_id, ism, familiya, tel, image_name, mutaxasisligi, xizmat_id, ish_vaqti, ish_kuni, malakasi,
    xona, etaj, id)

    res.status(201).json({message: "shifokor yangilandi", shifokor })   
   
   } catch (error) {
    console.log(error);
   }
}

const delShifokor = async (req, res) => {
   try {
    const {id} = req.params

    const foundShifokor = await pg(`select * from shifokorlar where id=$1`, id)
    
    if(foundShifokor.length) {
        const id1 = foundShifokor[0].id

        const data = await pg(` delete from shifokorlar where id = $1 `, id1)
         res.status(200).json({message: "shifokor o'chirildi ", data })
    } else {
        res.status(403).json({message: "shifokor topilmadi " })

    }    
   } catch (error) {
    console.log(error);
   }
}

module.exports = {
    addShifokorlar,
    updShifokorlar,
    delShifokor,
}