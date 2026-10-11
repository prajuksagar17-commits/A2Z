var express=require('express');
var router=express.Router();
router.use(express.static('public'));
var mysql=require('mysql2');
var util=require('util');
router.use(express.urlencoded({extended:true}));
var conn=mysql.createConnection({
     host:'bhqebsznlryjywsg1wsq-mysql.services.clever-cloud.com',
    user:'uxhfsfcyoxpyjmjf',
    password:'jZyzYgCGr2pqVyrX9kiP',
    database:'bhqebsznlryjywsg1wsq'
})
var exe=util.promisify(conn.query).bind(conn);
router.get('/',(req,res)=>{
    res.render('web/index.ejs');
})
router.get('/about',async(req,res)=>{
     var sql='select * from about';
    var adata=await exe(sql);
    res.render('web/about.ejs',{adata:adata[0]});
    // res.render('web/about.ejs');
})
router.get('/header',(req,res)=>{
    res.render('web/header.ejs');
})
router.get('/footer',(req,res)=>{
    res.render('web/footer.ejs');
})
router.get('/courses',async(req,res)=>{
      var sql='select * from course';
    var course=await exe(sql);
    res.render('web/courses.ejs',{course:course[0]});
    // res.render('web/courses.ejs');
})
router.get('/batches',async(req,res)=>{
    var sql='select * from batches';
    var batch=await exe (sql);
    res.render('web/batches.ejs',{batch:batch[0]});
})
router.get('/internships',async(req,res)=>{
      var sql='select * from internship';
    var data1=await exe (sql);
    res.render('web/internshipS.ejs',{data1:data1[0]});
})
router.get('/certifications',async(req,res)=>{
    var sql='select * from certification';
    var cdata=await exe (sql);
    res.render('web/certifications.ejs',{cdata:cdata[0]});
})
router.get('/placements',async(req,res)=>{
 var sql='select * from placements';
    var pdata=await exe (sql);
    res.render('web/placements.ejs',{pdata:pdata[0]});
})
router.get('/jobs',async(req,res)=>{
     var sql='select * from jobs';
    var jdata=await exe (sql);
    res.render('web/jobs.ejs',{jdata:jdata[0]});
})
router.get('/team',async(req,res)=>{
    var sql='select * from team';
    var tdata=await exe (sql);
    res.render('web/team.ejs',{tdata:tdata[0]});
})
router.get('/blogs',async(req,res)=>{
     var sql='select * from blog';
    var bdata=await exe (sql);
    res.render('web/blogs.ejs',{bdata:bdata[0]});
})
router.get('/contact',async(req,res)=>{
    var sql='select * from contact';
    var cdata=await exe (sql);
    res.render('web/contact.ejs',{cdata:cdata[0]});
})
module.exports=router;
