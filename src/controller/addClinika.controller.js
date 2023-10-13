const {v4: uuid} = require("uuid")
const pg = require("../libs/pg")
const path = require("path");


const addClinika = async (req, res) => {
    try {
        const {name, address, callCenter } = req.body
        const {image} = req.files
    
        const foundClinika = await pg(`select * from clinika where name=$1`, name)
        if(foundClinika.length) {
            res.status(403).json({message: "Bu nomli klinika allaqachon mavjud"})
        } else {
           
             const image_name = `${uuid()}${path.extname(image.name)}`;
             image.mv(process.cwd() + "/uploads/" + image_name); 
    
    
           const clinika =  await pg( ` insert into clinika(name, address, image_name, callCenter) values($1, $2, $3, $4) `, name, address, image_name, callCenter)
    
            res.status(201).json({message: "klinika qo'shildi ", clinika })
        }         
    } catch (error) {
        console.log(error);
    }
}

const updClinika = async (req, res) => {
    const {name, address, callCenter } = req.body
    const {image} = req.files
    const {id} = req.params

    const image_name = `${uuid()}${path.extname(image.name)}`;
    image.mv(process.cwd() + "/uploads/" + image_name); 


    const foundClinika = await pg(`select * from clinika where id=$1`, id) 

    const data = await pg(` update clinika set name = $1, address = $2, image_name = $3, callCenter =$4 where id = $5` , name, address, image_name, callCenter, id) 
    
    res.status(200).json({message: "klinika yangilandi ", data })

}

const delClinika = async (req, res) => {
    const {id} = req.params
    
    const foundClinika = await pg(`select * from clinika where id=$1`, id)
    const id1 = foundClinika[0].id

    if(foundClinika.length) {

        const data = await pg(` delete from clinika where id = $1 `, id1)
         res.status(200).json({message: "klinika o'chirildi ", data })
    }

    
}




module.exports = {
    addClinika,
    updClinika,
    delClinika,
}