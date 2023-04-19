const express=require("express");
const path=require("path");
const  app = express();
const multer  = require('multer');
const merger=require("./merger")
const fs=require("fs");
app.use('/static', express.static('public'))



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
})

const upload = multer({ storage: storage })
app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+"/templates/index.html"))
})


app.post('/uploads', upload.array('pdfs', 6), async function (req, res, next) {
    try{
        if(req.files.length <2){
            return  res.send("select two files")
           }
          
             let d= await merger(req.files[0].path,req.files[1].path)
             await res.redirect(`http://localhost:4000/static/${d}.pdf`)
             await fs.unlinkSync(req.files[0].path)
             await fs.unlinkSync(req.files[1].path)
          
              // req.files is array of `photos` files
              // req.body will contain the text fields, if there were any
    }catch(err){

        console.log(err)
    }

  })
app.listen(4000,()=>{
    console.log("server listening on http://localhost:4000")
})