import mongoose from 'mongoose'

export default function db(){
    const dbconn = mongoose.connect(process.env.MONGO_URI).then(()=> {
        console.log('Veritabanına bağlandı.')
    }).catch((err)=>{
        console.log("Veritabanı hatası: ", err)
    })
    return dbconn
}