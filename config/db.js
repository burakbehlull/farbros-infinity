const mongoose = require('mongoose')

const db = () => {
    const idb = mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Veritabanı bağlandı.')
    })
    .catch((err)=> console.log('Hata: ', err.message))
    return idb
}

export default db