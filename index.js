const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const url="mongodb+srv://lekhak-user:ram123@cluster0.wtutu.mongodb.net/edutify?retryWrites=true&w=majority"
const port=process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/views'))
app.use(express.static(__dirname+'/css/'))

mongoose.connect(url)


app.get('/',(req,res)=>{
    res.render('login',{class:"d-none",message:""})
})
app.get('/regPage',(req,res)=>{
    res.render('Register',{message:"", class:""})
})
app.get('/logPage',(req,res)=>{
    res.render('login',{class:"d-none",message:""})
})


var RegUser=new mongoose.Schema({
    userMail:String,
    userId:String,
    userPass:String,
    userName:String
})
var RegUser=new mongoose.Schema({
    userMail:String,
    userId:String,
    userPass:String,
    userName:String
})

var RegUserModel=new mongoose.model('regUser',RegUser);


app.use(express.static(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"css")));
app.set('view engine', 'ejs');




app.use(bodyParser.urlencoded({
    extended: true
  }));



function numValidate(num){
    if (num.length==10){

        if (num[0]==9){

            return true;
        }
        else if(num[0]==7){
            return true;
        }
        else if(num[0]==8){
            return true;
        }
        else if(num[0]==6){
            return true;
        }
        else{
            return false
        }
    }
    else{

        return false;
    }
    
}

function emailValidate(email){
   var mail=email.split('.')
   if (mail[mail.length-1]=='com'  || mail[mail.length-1]=='in'){
       return true
   }
   else{
       return false
   }
    
}








app.post('/regUser', (req,res)=>{
    

    let userMail=req.body.userMail
    // let userName=req.body.userName
    // let userId=req.body.userId
    // let userPass=req.body.userPass
    console.log(req.body)
    if (emailValidate(userMail)==false){
       res.render('Register',{message:"Please Check the Details", class:""})
    }else{

        let register=new RegUserModel(req.body);
        register.save();
        res.send("SuccessFully Registered")
    }
    
});




//Panel endpoint
app.post('/login', async(req,res)=>{

    console.log(req.body)
    var userRecord=await RegUserModel.find({userId:req.body.userId}).exec();

    // console.log(findbyId.length)
    // console.log(findbyPwd.length)
    console.log(userRecord)
    if(userRecord[0].userPass!=req.body.userPass){
            res.render('login',{message:"No User Found",class:""})
    }else{
        // var findNews=await newsModel.find({}).sort({_id:-1}).exec()
        res.render('index')
    }
});





//Running the App
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
