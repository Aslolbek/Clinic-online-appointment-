const pg = require("../libs/pg")


//klinikalar uchun get zapros bilan mavjud barcha klinikalar olib beriladi

const Clinika = async (req, res) => {
    try {
        const clinics = (await pg(`select * from clinikalar`))

        res.status(200).json(clinics)

    } catch (error) {
        res.status(403).json(`${error.message}`)
    }   
}



//klinika bolimlari uchun klinika id kelishi kerak
const bolimlar = async (req, res) =>{
    try {
        const {id} = req.headers;
        console.log(id);
        const clinika = await pg(`select * from clinikalar where id=$1`, id)
        const doctors = await pg(`select * from shifokorlar where Clinika_id=$1`, id)
        const services = await pg(`select * from xizmatlar where Clinika_id=$1`, id)
      
        res.status(200).json({doctors, services, clinika })

    } catch (error) {
        res.status(403).json(`${error.message}`)
    }
}




//xizmatlar olinishi uchun clinikani id si va xizmat nomi bolishi kerak PS:LOR

const xizmatlar = async (req, res) => {
    try {
        
    const {id} = req.params
    const {xizmat_nomi} = req.body
    const services = await pg(`select * from xizmatlar where clinika_id=$1 and xizmat_nomi=$2`, id, xizmat_nomi)

   res.status(201).json({services})

} catch (error) {
    res.status(403).json(`${error.message}`)
    
}
}

//shifokorni 1 tasini olish

const doctorOne = async (req, res) => {
    try {
        const {idd, id} = req.params;
        console.log(id,idd);
        const doctor = await pg(`select * from shifokorlar where clinika_id=$1 and id=$2`, idd, id)
        console.log(doctor);
        res.status(200).json({doctor})
    } catch (error) {
        res.status(403).json(`${error.message}`)
    }
}


//shifokorlarni izlash uchun mutahasisliginini aniqlamaydi

const shifokorIzlash = async (req, res) => {
    try {
        const {clinika_id, ism} = req.body
        const  doctors = await pg(`select * from shifokorlar where clinika_id=$1 and ism=$2 `,clinika_id, ism )
        if(!doctors?.length){
         return   res.status(400).json({message: "so'rov natijasi  topilmadi"})
        }else{
            res.status(201).json(doctors)
        }
        
    } catch (error) {
        res.status(403).json(`${error.message}`)
        
    }
}


//shifokorni mutaxasisligi yordamida izlash

const shifokorMutaxasislig = async (req, res) => {
    try {
        
        const {clinika_id, mutaxasislik} = req.body
        const doctors = await pg(`select * from shifokorlar where clinika_id=$1 and mutaxasisligi=$2 `,clinika_id,mutaxasislik)

        if(!doctors?.length){
            res.status(400).json({message: "So'rov bo'yicha natija topilmadi"})
        }else{
            res.status(400).json(doctors )
        }

    } catch (error) {
        res.status(403).json(`${error.message}`)
    }
}






//navbat olish shifokor id va mijoz id kelishi shart
//hali 100% yakunlanmagan


const navbat =  async (req, res) =>{
    try {
         
        const {shifokor_id, mijoz_id} = req.body

        // const shifokor = (await pg(`select * from shifokorlar where id=$1`, shifokor_id,))[0]
        // const korik = (await pg(`select count(*) from tashxislar where mijoz_id=$1`, mijoz_id ))[0]
        // const navbat = (await pg(`select count(*) from navbat where shifokor_id=$1`, shifokor_id))[0]


        // console.log(shifokor, korik, navbat);
        // const data = {shifokor:shifokor.ism, navbat:navbat }
        // console.log(data);
        await pg(`insert into navbat(shifokor_id,mijoz_id, status) Values($1,$2,$3)`,shifokor_id, mijoz_id, 'false')
        res.status(201).json("Navbat olindi")
    } catch (error) {
        res.status(403).json(`${error.message}`)
    }
}



module.exports = {
    Clinika,
    bolimlar,
    xizmatlar,
    shifokorIzlash,
    doctorOne,
    shifokorMutaxasislig,
    navbat
}