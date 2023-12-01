const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const server = app.listen(3000,()=>{
    console.log("Start Server : localhost:3000");
})

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'user',
    password:'!thwn1wks',
    database: 'sparta'
});

connection.connect();


app.get('',(req,res)=>{
    res.sendFile(__dirname+'/main.html');
})

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/form.html');
})

app.get('/member',(req, res)=>{
    // console.log(req.query)
    if(req.query.id){
        const id = req.query.id;
        // console.log(id)
        connection.query('SELECT * FROM member WHERE id = ? ',[id],(err,result,fields)=>{
            console.log(`id : ${id} 멤버 조회`)
            console.log(result)
            const info = result[0]
            res.send(
                `
                <div class="bigbox" style="width:1200px;margin:20px auto 0px auto; padding:20px"

                            <div class="mypostingbox" id="postingbox">
                                <div class="row g-2">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <div> 이름 </div> <div>${info.name}</div>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="row g-2">
                                            <div class="col-md">
                                                <div class="form-floating">
                                                    <div> MBTI </div> <div>${info.mbti}</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-floating mb-3">
                                <div> 장점 </div> <div>${info.advantage}</div>
                            </div>
                            <div class="form-floating mb-3">
                                <div> 소개 </div> <div>${info.introduction}</div>
                            </div>
                            <div class="form-floating mb-3">
                                <div> 목표 </div> <div>${info.goal}</div>
                            </div>
                            <div class="form-floating mb-3">
                                <div> 약속 </div> <div>${info.promise}</div>
                            </div>
                            <div class="form-floating mb-3">
                                <div> GIT </div> <div>${info.git}</div>
                            </div>
                            <div class="mybtn">
                                <button id="postingbtn" type="button" class="btn btn-primary">수정</button>
                                <button type="button" class="btn btn-outline-primary">삭제</button>
                            </div>
                        </div>`
            )
        })
    }else{
    connection.query(`SELECT * FROM member limit 100`,(err,result,fields)=>{
        console.log("전체 멤버 조회")
        res.send(JSON.stringify(result))
    })
}
})


app.delete('/member',(req,res)=>{
    const id = req.params.id;
    // db.deleteMember(id)
    console.log("member3");
})

app.put('/member',(req,res)=>{
    const info = req.body
    // db.updateMember(id)
    console.log("member4");
})

app.post('/member',(req,res)=>{
    console.log("회원가입요청")
    console.log(req.body)
    const member = req.body;
    connection.query('INSERT INTO member (name, mbti, advantage, introduction, goal, promise, git, pw) VALUE (?, ?, ?, ?, ?, ?, ?, ?)',[member.name, member.mbti, member.advantage, member.introduction, member.goal, member.promise, member.git, member.pw],(err,result,fields)=>{
        if(err){
            res.send("회원가입에 실패하였습니다.");
        }        
        console.log(result)
        res.send("회원가입에 성공하였습니다.");
    })
    
})



let doc = {
    name: "name",
    mbti: "mbti",
    advantage: "advantage",
    introduction: "introduction",
    goal: "goal",
    promise: "promise",
    git: "git",
    pw: "pw"
};
