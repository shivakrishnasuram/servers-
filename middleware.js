const { isUtf8 } = require("buffer")
const express =require("express")
const { read } = require("fs")
const app =express()
app.use(express.json())
const fs= require("fs").promises


// app.use((req,res,next)=>{
//     console.log("this is middlewares")
//     if(true){
//         next()
//     }
//     else{
//         console.log("this is not comming")
//     }
// })
// app.use((req,res,next)=>{
//     console.log("this is second")
//     res.send("midddle is comming")
// })

// app.post("/postingssss",(req,res)=>{
//     res.status(200).send({"message": "it is working"})
// })

// const middle1 =(req,res,next)=>{
//     if(true){
//         next()
//     }
//     else{
//         console.log("false")
//         res.send("false")
//     }
// }
// const middle12 =(req,res,next)=>{
//     if(true){
//         next()
//     }
//     else{
//         console.log("false at middleware api 2 ")
//         res.send("false at middleware api 2 ")
//     }
// }

const usernameValidator =(req,res,next)=>{
    let inputusername =req.body.username
    let regexss =/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/

    if(inputusername.length<=0){
        res.send("username should not be empty")
    }
    else if(regexss.test(inputusername)){
        next()
    }
    else{
        res.send("username should be currect something went wrong")
    }
}

const passwordvalidator =(req,res,next)=>{
    let userpass =req.body.password
    let passwordregex =/^[a-zA-Z0-9@#$_-]{6,20}$/
    if (userpass.length<=0){
        res.send("userpass should be greater than 0 char")
    }
    else if(passwordregex.test(userpass)){
        next()
    }
    else{
        res.send("something went wrong at userpass or uusername")
    }
}

const gmailvalidator =(req,res,next)=>{
    let usergmail =req.body.gmail
    let gmailregex =/^[a-zA-Z0-9._%+-]+@gmail\.com$/
    if (usergmail.length<=0){
        res.send("email should not be empty")
    }
    else if(gmailregex.test(usergmail)){
        next()
    }
    else{
        res.send("something went wrong at email")
    }
}
const loginsvalidation =async (req,res,next)=>{
    let {username,password,gmail} =req.body
    console.log(username,password,gmail)
    let filedata = JSON.parse(await((fs.readFile("./taskdata.json","utf8"))))
    let resultss =filedata.some((x)=>{
        return x.username ===username && x.password ===password && x.gmail ===gmail
        // return (
        //     (x.username === username && x.password === password) || 
        //     (x.gmail === gmail && x.password === password)
        //   );
        // return (x.username ==username && x.password ===password ) || (x.gmail ==gmail && x.password ==password)
    })
    console.log(resultss)
    if(resultss){
        next()
    }
}
app.post("/registration",usernameValidator,passwordvalidator,gmailvalidator,async (req,res)=>{
    let {username,password,gmail} =req.body
    console.log(username,password,gmail)
    existingData =JSON.parse(await fs.readFile("./taskdata.json","utf8")) 
    console.log(existingData)
    existingData.push({"username":username,"password":password,"gmail":gmail})
    await fs.writeFile("./taskdata.json", JSON.stringify(existingData))
    res.send(existingData)
})

app.post("/login",usernameValidator,passwordvalidator,gmailvalidator,loginsvalidation,(req,res)=>{
    res.send("login is fine")
})
app.listen(4100, () => {
    console.log("server is running")
})