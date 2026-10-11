var express=require('express');
var router=express.Router();
var mysql=require('mysql2');
router.use(express.json());
router.use(express.urlencoded({extended:true}));
var session=require('express-session')
var util=require('util');
var fs=require('fs');
const path = require('path');
var conn=mysql.createConnection({
    host:'bhqebsznlryjywsg1wsq-mysql.services.clever-cloud.com',
    user:'uxhfsfcyoxpyjmjf',
    password:'jZyzYgCGr2pqVyrX9kiP',
    database:'bhqebsznlryjywsg1wsq'
})
const fileUpload = require("express-fileupload");

router.use(fileUpload());
function logincheck(req,res,next) {
    if(req.session.name){
        next();

    }else{
        res.redirect('/admin');
    }
    
}
var exe=util.promisify(conn.query).bind(conn);
router.use(session({
    secret:'A2Z IT HUB',
    resave:false,
    saveUninitialized:true
}))
router.use(express.static('public'));
router.get('/',(req,res)=>{
    // res.send('admin');
    res.render('admin/login.ejs');
})
router.post('/login_check',async(req,res)=>{
    var {user,password}=req.body;
    // res.send(user);
    var sql='select * from login where user=? and password=?';
    var data=await exe(sql,[user,password]);
    // res.send(data);
    if(data[0]){
        //session data store
        req.session.id=data[0].lid;
        req.session.name=data[0].name;
    res.redirect('/admin/index-2');
    }else{
        res.redirect('/admin');
    }
    // res.redirect('/admin/blank');y
})
router.get('/blank',(req,res)=>{
    // res.send('dashboard');
    res.render('admin/blank.ejs');
})
router.get('/header',(req,res)=>{
    res.render('admin/header.ejs');
})
router.get('/footer',(req,res)=>{
    res.render('admin/footer.ejs');
})
router.get('/profile',(req,res)=>{
    res.render('admin/profile.ejs');
})
router.get('/index-2',(req,res)=>{
    // res.render('admin/index.ejs');
    // res.send(req.session.name);
    var name=req.session.name;
    res.render('admin/index.ejs',{name:name});
})
router.get('/tables',(req,res)=>{
    res.render('admin/tables.ejs');
})
router.get('/forms',(req,res)=>{
    res.render('admin/forms.ejs');
})
router.get('/about_add',(req,res)=>{
    res.render('admin/about_add.ejs');
})
router.post('/about_save',async(req,res)=>{
    console.log(req.files);


    var{
        title,
        a_desc,
        ceo_name,
        c_position,
        message,
        vision_title,
        vision_desc,
        mission_title,
        mission_desc
    }=req.body;


    var a_img=req.files.a_img;
    var a_imgname=req.files.a_img.name;
    var new_a_img=Date.now()+a_imgname;
    var a_imgpath=path.join(__dirname,'../public/img',new_a_img);

    await a_img.mv(a_imgpath);


    var ceo_img=req.files.ceo_img;
    var ceo_imgname=req.files.ceo_img.name;
    var new_ceo_img=Date.now()+ceo_imgname;
    var ceo_imgpath=path.join(__dirname,'../public/img',new_ceo_img);

    await ceo_img.mv(ceo_imgpath);


    var vision_img=req.files.vision_img;
    var vision_imgname=req.files.vision_img.name;
    var new_vision_img=Date.now()+vision_imgname;
    var vision_imgpath=path.join(__dirname,'../public/img',new_vision_img);

    await vision_img.mv(vision_imgpath);


    var mission_img=req.files.mission_img;
    var mission_imgname=req.files.mission_img.name;
    var new_mission_img=Date.now()+mission_imgname;
    var mission_imgpath=path.join(__dirname,'../public/img',new_mission_img);

    await mission_img.mv(mission_imgpath);


    var sql=`insert into about
    (title,a_desc,a_img,ceo_name,c_position,message,ceo_img,vision_title,vision_desc,vision_img,mission_title,mission_desc,mission_img)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;


    var data=await exe(sql,[
        title,
        a_desc,
        new_a_img,
        ceo_name,
        c_position,
        message,
        new_ceo_img,
        vision_title,
        vision_desc,
        new_vision_img,
        mission_title,
        mission_desc,
        new_mission_img
    ]);
    res.redirect('/admin/about_add');
});
router.get('/about_list',async(req,res)=>{
    var sql='select * from about';
    var data=await exe(sql);
    res.render('admin/about_list.ejs',{data:data});
})

router.get('/about_delete/:id',async(req,res)=>{
    var id=req.params.id;
    var sql="DELETE FROM about WHERE aid=?";
    await exe(sql,[id]);
    res.redirect('/admin/about_list');
})
router.get('/course_add',(req,res)=>{
    res.render('admin/course_add.ejs');
})


router.post('/course_save',async(req,res)=>{

    var{
        title,
        desc,
        course_name,
        course_desc
    }=req.body;
    var img=req.files.img;
    var imgname=req.files.img.name;
    var newname=Date.now()+imgname;
    var imgpath=path.join(__dirname,'../public/img',newname);
    await img.mv(imgpath);
    var sql='insert into course(title,`desc`,img,course_name,course_desc)values(?,?,?,?,?)';
    var data=await exe(sql,[
        title,
        desc,
        newname,
        course_name,
        course_desc
    ]);
    res.redirect('/admin/course_add');
})
router.get('/course_list',async(req,res)=>{
    var sql='select * from course';
    var course=await exe(sql);
    res.render('admin/course_list.ejs',{course:course});
})
router.get('/course_delete/:id',async(req,res)=>{
    var id=req.params.id;
    var sql="DELETE FROM course WHERE cid=?";
    await exe(sql,[id]);
    res.redirect('/admin/course_list');

})
router.post('/batch_update_save/:id',async(req,res)=>{

    var id=req.params.id;

    var {title,desc,title_2,desc_2}=req.body;

    var sql='update batches set title=?,`desc`=?,title_2=?,desc_2=? where bid=?';

    var data=await exe(sql,[title,desc,title_2,desc_2,id]);

    res.redirect('/admin/batch_update');

})
router.get('/batch_update',async(req,res)=>{

    var sql='select * from batches limit 1';

    var data=await exe(sql);

    console.log(data);

    res.render('admin/batch_update.ejs',{data:data[0]});

})

router.post('/batch_update_save/:id',async(req,res)=>{

    var id=req.params.id;

    var {title,desc,title_2,desc_2}=req.body;

    var sql='update batches set title=?,`desc`=?,title_2=?,`desc_2`=? where bid=?';

    var data=await exe(sql,[title,desc,title_2,desc_2,id]);

    res.redirect('/admin/batch_update');

})
router.get('/internship_add',(req,res)=>{
    res.render('admin/internship_add.ejs');
})


router.post('/internship_save',async(req,res)=>{

    var{
        title1,
        desc1,
        title2,
        points,
        title_3,
        mobile,
        icon,
        title3,
        desc2,
        title_4,
        desc_3
    }=req.body;

    var sql='insert into internship(title1,desc1,title2,points,title_3,mobile,icon,title3,desc2,title_4,desc_3)values(?,?,?,?,?,?,?,?,?,?,?)';

    var data=await exe(sql,[
        title1,
        desc1,
        title2,
        points,
        title_3,
        mobile,
        icon,
        title3,
        desc2,
        title_4,
        desc_3
    ]);

    res.redirect('/admin/internship_add');
})


router.get('/internship_list',async(req,res)=>{

    var sql='select * from internship';

    var internship=await exe(sql);

    res.render('admin/internship_list.ejs',{internship:internship});
})


router.get('/internship_delete/:id',async(req,res)=>{

    var id=req.params.id;

    var sql="DELETE FROM internship WHERE iid=?";

    await exe(sql,[id]);

    res.redirect('/admin/internship_list');

})
router.get('/certification_add',(req,res)=>{
    res.render('admin/certification_add.ejs');
})


router.post('/certification_save',async(req,res)=>{

    var{
        title1,
        desc1,
        title_2,
        name,
        certification_no,
        mobile,
        icon,
        title_3,
        desc2,
        instruction
    }=req.body;

    var sql='insert into certification(title1,desc1,title_2,name,certification_no,mobile,icon,title_3,desc2,instruction)values(?,?,?,?,?,?,?,?,?,?)';

    var data=await exe(sql,[
        title1,
        desc1,
        title_2,
        name,
        certification_no,
        mobile,
        icon,
        title_3,
        desc2,
        instruction
    ]);

    res.redirect('/admin/certification_add');

})


router.get('/certification_list',async(req,res)=>{

    var sql='select * from certification';

    var certification=await exe(sql);

    res.render('admin/certification_list.ejs',{
        certification:certification
    });

})


router.get('/certification_delete/:id',async(req,res)=>{

    var id=req.params.id;

    var sql="DELETE FROM certification WHERE cid=?";

    await exe(sql,[id]);

    res.redirect('/admin/certification_list');

})
router.get('/placement_add',(req,res)=>{
    res.render('admin/placement_add.ejs');
})


router.post('/placement_save',async(req,res)=>{

    var{
        title1,
        title_2,
        desc1,
        title_3,
        desc2,
        course_name,
        title_4,
        desc3,
        student_name,
        desc4,
        icon1,
        company,
        title_5,
        icon_2,
        student_name_2,
        course
    }=req.body;


    var img=req.files.img;
    var imgname=req.files.img.name;
    var newname=Date.now()+imgname;
    var imgpath=path.join(__dirname,'../public/img',newname);

    await img.mv(imgpath);


    var img2=req.files.img2;
    var img2name=req.files.img2.name;
    var newname2=Date.now()+img2name;
    var img2path=path.join(__dirname,'../public/img',newname2);

    await img2.mv(img2path);


    var sql='insert into placements(title1,title_2,desc1,title_3,desc2,img,course_name,title_4,desc3,img2,student_name,desc4,icon1,company,title_5,icon_2,student_name_2,course)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';


    var data=await exe(sql,[
        title1,
        title_2,
        desc1,
        title_3,
        desc2,
        newname,
        course_name,
        title_4,
        desc3,
        newname2,
        student_name,
        desc4,
        icon1,
        company,
        title_5,
        icon_2,
        student_name_2,
        course
    ]);


    res.redirect('/admin/placement_add');

})


router.get('/placement_list',async(req,res)=>{

    var sql='select * from placements';

    var placement=await exe(sql);

    res.render('admin/placement_list.ejs',{
        placement:placement
    });

})


router.get('/placement_delete/:id',async(req,res)=>{

    var id=req.params.id;

    var sql="DELETE FROM placements WHERE pid=?";

    await exe(sql,[id]);

    res.redirect('/admin/placement_list');

})
// JOB ADD

router.get('/job_add',(req,res)=>{
    res.render('admin/job_add.ejs');
})


// JOB SAVE

router.post('/job_save',async(req,res)=>{

    var{
        title_1,
        desc1,
        position,
        city,
        search,
        job,
        j_experience,
        sallery,
        location,
        role_Description,
        title_2,
        desc2,
        name,
        email,
        mobile,
        preffered_position,
        preffered_area
    }=req.body;

    var sql='insert into jobs(title_1,desc1,position,city,search,job,j_experience,sallery,location,role_Description,title_2,desc2,name,email,mobile,preffered_position,preffered_area) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    var data=await exe(sql,[
        title_1,
        desc1,
        position,
        city,
        search,
        job,
        j_experience,
        sallery,
        location,
        role_Description,
        title_2,
        desc2,
        name,
        email,
        mobile,
        preffered_position,
        preffered_area
    ]);

    res.redirect('/admin/job_add');

})


// JOB LIST

router.get('/job_list',async(req,res)=>{

    var sql='select * from jobs';

    var jobs=await exe(sql);

    res.render('admin/job_list.ejs',{
        jobs:jobs
    });

})


// JOB DELETE

router.get('/job_delete/:id',async(req,res)=>{

    var id=req.params.id;

    var sql='DELETE FROM jobs WHERE jid=?';

    await exe(sql,[id]);

    res.redirect('/admin/job_list');

})
// TEAM CRUD - 7

// Team Add Page
router.get('/team_add', (req, res) => {
    res.render('admin/team_add.ejs');
});

// Team Save
router.post('/team_save', async (req, res) => {
    var { title, desc, name, position, desc2 } = req.body;

    var image = req.files.image;
    var imagename = Date.now() + image.name;
    var imagepath = path.join(__dirname, '../public/img', imagename);

    await image.mv(imagepath);

    var sql = `INSERT INTO team 
    (title, \`desc\`, image, name, position, desc2)
    VALUES (?, ?, ?, ?, ?, ?)`;

    await exe(sql, [title, desc, imagename, name, position, desc2]);

    res.redirect('/admin/team_add');
});

// Team List
router.get('/team_list', async (req, res) => {
    var sql = 'SELECT * FROM team';
    var team = await exe(sql);

    res.render('admin/team_list.ejs', { team: team });
});

// Team Delete
router.get('/team_delete/:id', async (req, res) => {
    var id = req.params.id;

    var sql = 'DELETE FROM team WHERE tid = ?';
    await exe(sql, [id]);

    res.redirect('/admin/team_list');
});
// ================= BLOG CRUD - 8 =================

// Blog Add
router.get('/blog_add', (req, res) => {
    res.render('admin/blog_add.ejs');
});

// Blog Save
router.post('/blog_save', async (req, res) => {
    var {
        title1, desc, title2, desc2,
        title2_2, point1, title3, point2
    } = req.body;

    var img = req.files.img;
    var imgname = Date.now() + img.name;
    var imgpath = path.join(__dirname, '../public/img', imgname);

    await img.mv(imgpath);

    var sql = `INSERT INTO blog
    (title1, \`desc\`, img, title2, desc2, title2_2, point1, title3, point2)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await exe(sql, [
        title1, desc, imgname, title2, desc2,
        title2_2, point1, title3, point2
    ]);

    res.redirect('/admin/blog_add');
});

// Blog List
router.get('/blog_list', async (req, res) => {
    var sql = 'SELECT * FROM blog';
    var blog = await exe(sql);

    res.render('admin/blog_list.ejs', { blog: blog });
});

// Blog Delete
router.get('/blog_delete/:id', async (req, res) => {
    var id = req.params.id;

    var sql = 'DELETE FROM blog WHERE bid = ?';
    await exe(sql, [id]);

    res.redirect('/admin/blog_list');
});
// ================= CONTACT CRUD - 9 =================

// Contact Add
router.get('/contact_add', (req, res) => {
    res.render('admin/contact_add.ejs');
});

// Contact Save
router.post('/contact_save', async (req, res) => {
    var { title, desc, name, email, mobile, sub, mess } = req.body;

    var sql = `INSERT INTO contact
    (title, \`desc\`, name, email, mobile, sub, mess)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    await exe(sql, [title, desc, name, email, mobile, sub, mess]);

    res.redirect('/admin/contact_add');
});

// Contact List
router.get('/contact_list', async (req, res) => {
    var sql = 'SELECT * FROM contact';
    var contact = await exe(sql);

    res.render('admin/contact_list.ejs', { contact: contact });
});

// Contact Delete
router.get('/contact_delete/:id', async (req, res) => {
    var id = req.params.id;

    var sql = 'DELETE FROM contact WHERE cid = ?';
    await exe(sql, [id]);

    res.redirect('/admin/contact_list');
});
module.exports=router;
