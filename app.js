import express from "express";
const app = express();

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser"
const text=[  ];
const work=[];
var personal=true;
const __dirname = dirname(fileURLToPath(import.meta.url));
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    "/css",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
  )
  app. use(express. static('public'));
let ttd=["I need to do cloth","I need to read","I need to do cloth"];
app.get("/",(req,res)=>{
    var bname="";
    if(personal){
        bname="WorkList"
    }else{
        bname="PersonalList"
    }
    res.render(
       "index.ejs",{
           text:text,
           bname:bname,
           personal:personal
       }
    )
})
app.get("/get",(req,res)=>{
    var bname="";
    if(personal){
        bname="WorkList"
    }else{
        bname="PersonalList"
    }
    res.render(
       "index.ejs",{
           text:text,
           bname:bname,
           personal:personal
       }
    )
   })
   app.get("/getwork",(req,res)=>{
    res.render(
       "index.ejs",{
           text:work,
           bname:"Personal List",
           personal:personal
       }
    )
   })
app.post("/submit",(req,res)=>{
    const textt=req.body.mytext;
    if(textt.length>0){
      if(personal){
        text.push(textt);
        res.redirect("/get");
      }else{
        work.push(textt);
        res.redirect("/getwork");
      }
      
    }else{
        res.redirect("/get");
    }   
})
app.post("/changedcheck",(req,res)=>{
    const id=req.body.para;
    console.log(id);
    text.splice(id, 1);
    setTimeout(function(){
        res.redirect("/get");
    }, 3000)
})
app.post("/worklist",(req,res)=>{
    if(personal){
        personal=false;
        res.redirect("/getwork");
        
       
    }else{
        res.redirect("/get");
        personal=true;
    }
})
app.listen(port,()=>{
    console.log(`The ${port} is listening`);
})
