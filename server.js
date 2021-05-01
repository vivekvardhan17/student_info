const express= require('express');
const app=express();
const bodyparser=require('body-parser');
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://localhost:27017/college';
const dbname='college';
var db;
var s;
MongoClient.connect(url,(err,client)=>{
    if(err) return console.log(err);
    db=client.db(dbname);
    console.log(`connected to database: ${url}`);
    console.log(`Database : ${dbname}`);
    app.listen(5000,()=>{
        console.log('server is listening at 3000');
    })
})
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.static('public'));
app.get('/',(req,res)=>{
    db.collection('students').find().toArray((err,result)=>{
        if(err) return console.log(err);
        res.render('home.ejs',{data:result});
    })
})
app.get('/create',(req,res)=>{
        res.render('add.ejs')
})
app.get('/updatestudent',(req,res)=>{
    res.render('update.ejs')
})
app.get('/deletestudent',(req,res)=>{
    res.render('delete1.ejs')
})
app.post('/AddData',(req,res)=>{
    db.collection('students').save(req.body,{sort :{_id:-1}},(err,result)=>{
        if(err) return console.log(err);
        res.redirect('/');
    })
})
app.post('/update',(req,res)=>{
    /*db.collection('students').find().toArray((err,result)=>{
        if(err) return console.log(err);
    for(var i=0;i<result.length;i++){
        if(result[i].stu_id==req.body.stu_id){
            s=result[i].course_name;
            break;
        }
    }*/
    db.collection('students').findOneAndUpdate({stu_id:req.body.stu_id},{
        $set:{course_name:req.body.course_name}},{sort :{_id:-1}
    },(err,result)=>{
        if(err)
        return console.log(err);
        res.redirect('/');
        console.log(req.body.stu_id+" "+'student details updated')
    })
})
app.post('/delete',(req,res)=>{
    db.collection('students').findOneAndDelete({stu_id:req.body.stu_id},(err,result)=>{
        if(err) return console.log(err);
        res.redirect('/');
    })
})