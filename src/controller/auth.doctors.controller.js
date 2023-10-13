const { sign, verify } = require("../libs/jwt");
const { passcompare } = require("../libs/bcrypt");
const pg = require("../libs/pg");
const joi = require("joi");


const loginSchema = joi.object({
    clinika_nomi: joi.string().required(), 
    tel: joi.string().min(9).required(),
  });
  

const Logindoctor = async (req, res) => {
    try {
        const { clinika_nomi, tel } = req.body;
        console.log(req.body   );
        
      const validationResult = loginSchema.validate({ clinika_nomi, tel });
      if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message });
      }
      const doctor = (await pg("select * from shifokorlar where tel=$1", tel))[0];
      if (!doctor) {
        return res.status(403).json({ message: 'Bunday telefon nomerni tekshirib koring ' });
      }

      const clinika = (await pg(`select * from clinikalar where clinika_nomi=$1`,clinika_nomi))[0]
      if(!clinika){
        return res.status(403).json({ message: 'Clinika nomini tekshirib koring ' });
      }

      if(clinika.id===doctor.clinika_id){
        const token = await sign(doctor.id);
      res.cookie('token', token);
      const navbat = await pg(`select * from navbat where shifokor_id=$1 ORDER BY create_at ASC`, doctor.id)
      console.log(navbat);
      return  res.status(200).json({ message: 'Tizimga kirdingiz',navbat:navbat});
      }
      res.status(200).json({ message: 'Xato' });
      
      
    } catch (error) {
      res.status(400).json({ msg: `${error.message}` });
    }
  };


  //tashxis mijoj id va qoyilgan tashxis kelishi kerak type text 

  const tashxis = async (req, res) =>{
    try {
      
      const shifokor_id = await verify(req.cookies.token)
      const {mijoz_id, tashxis} = req.body
      await pg(`update navbat set status=$1 where mijoz_id=$2`, 'true', mijoz_id )

      await pg(`insert into tashxislar(mijoz_id, shifokor_id, tashxis) Values($1, $2, $3)`,mijoz_id, shifokor_id, tashxis)

      res.status(201).json(
        "Tashxis qoyildi"
      )
    } catch (error) {

      res.status(400).json({ msg: `${error.message}` });
      
    }
  }
  
  module.exports={
    Logindoctor,
    tashxis
  }