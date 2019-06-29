const express = require("express");
const jwt     = require("jsonwebtoken");

const app = express();

app.get('/api',(req,res) => {
    res.json({
        message: "Welcome to the API"
    });
});

app.post('/api/post', verifyToken, (req,res) => {
    jwt.verify(req.token,"cokelek", (err,authData) => {
        if(err){
            res.sendStatus(403);
        }
        res.json({
            message: "Post created.",
            authData
        });
    });
});

app.post('/api/login', (req,res) => {
    const user = {
        id: 1,
        username : "muhittin",
        email: "muhittin@gmail.com",
    }
    jwt.sign({
        user
    },
    "cokelek", {expiresIn: "30s"},(err,token) => {
        res.json({
            token
        })
    });
});


function verifyToken(req,res,next){
    const header= req.headers['token'];
    if(typeof header !== 'undefined'){
        req.token = header;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(5000,() => console.log("Server Started"));