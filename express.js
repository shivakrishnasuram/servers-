const { error } = require("console")
const express = require("express")
const { readFile } = require("fs")
const { parse } = require("path")
const { json } = require("stream/consumers")
const fs = require("fs").promises // it will return the data throwth the promis in the aschnch and await in this case 
const app = express()

app.use(express.json())
// app.get("/getting",(req,res)=>{
//     // res.send("this is getting data")
//     fs.readFile("./dummy.json","utf8",(err,data)=>{
//         if(err){
//             res.write("something went wrong to this ")
//             res.send(err)
//             // res.setHeader("it is ")
//         }
//         else{
//             res.send(data)
//         }

//     })
// })
// const fs = require('fs');

// app.get("/getting", (req, res) => {
//     fs.readFile("./dummys.json", "utf8", (err, data) => {
//         if (err) {
//             console.error(err); // Log the error for debugging
//             res.status(500).send("Something went wrong");
//         } else {
//                 // console.log(data)
//                 const parsedData = JSON.parse(data);
//                 console.log(parsedData)
//                 res.status(200).json({ data: parsedData, message: "this is the data" });
//                 // res.send("<h1>something is in h1</h1>")

//         }
//     });
// });

// app.get("/gettings",async (req,res)=>{
//     let datass =await fs.readFile("./dummys.json","utf8", (err,data)=>{
//         if(err){
//             res.send(err)
//         }
//         else{
//             let parsedData =JSON.parse(data)
//             res.status(201).json({status:"201",msg:"everything is very file to do with express if it is currect response",datas:parsedData})
//             console.log(parsedData)

//             // res.send(parsedData)
//         }
//     })
//     console.log(datass)
// })


// app.get("/gettings", async (req, res) => {
//     try {
//         var datassss = await fs.readFile("./dummy.json", "utf8")
//         let parsedDatas = JSON.parse(datassss)

//         console.log(parsedDatas);
//         res.status(200).json({ msg: "msg is clear for getting data", datasssssssss: parsedDatas })
//     }
//     catch(e){
//         res.status(500).send(e)
//         console.log('data is not found')
//     }
// });
app.get("/gettings", async (req, res) => {
    try {
        let datas = await fs.readFile("./dummys.json", "utf8");
        let parsedData = JSON.parse(datas)
        res.status(200).json({ msg: "everything is looking good", mydata: parsedData })
    }
    catch (e) {
        res.status(404).json({ error: e })
    }


})

app.post("/data", async (req, res) => {
    try {
        let newdatas = req.body
        let exxisting_data = JSON.parse(await fs.readFile("./dummys.json", "utf-8"))
        exxisting_data.push(newdatas)

        console.log(exxisting_data)
        await fs.writeFile("./dummys.json", JSON.stringify(exxisting_data))
        res.status(201).send({ msg: "data is inserted for us", datais: exxisting_data })

    }
    catch (e) {
        res.send({ "erris": e })
    }
})


// app.post("/what", async (req, res) => {
//     try {
//         let namess = req.params.name
//         console.log(namess)
//         let fsdata = await fs.readFile("./dummys.json", "utf8")
//         let parsedData = JSON.parse(fsdata)
//         parsedData.push(namess)
//         // console.log(parsedData)
//         res.send({ "mydata is": parsedData })
//     }
//     catch(e){
//         res.send(e)
//     }
// })


app.get("/gettingdata",async (req,res)=>{
    // let mydata = {"name": "virat krishna", "records": "18 wickets"}



    let {name,records} =req.body
    let cricketersdata =await fs.readFile("./dummys.json","utf8")
    console.log("my data")
    console.log(cricketersdata)



    let parsed_data =JSON.parse(cricketersdata)



    console.log(parsed_data)

    parsed_data.push({"name":name,"records":records})
    //pushing data by destructuring 
    console.log("updated data")
    console.log(parsed_data)
    let stringgydata =JSON.stringify(parsed_data)
    // res.send({"mycricketsData":parsed_data})
    fs.writeFile("./dummys.json",stringgydata)
    res.send({"mydata":parsed_data})
    // res.send({"myupdated data is in the currect for " :parsed_data})
})














// app.get("/gettings/:name",async (req,res)=>{
//     try{
//         // console.log(req.params)
//         let reqName =req.params.name
//         let datas =await fs.readFile("./dummys.json","utf-8")
//         console.log(datas)
//         let parsedData =JSON.parse(datas)
//         let result =parsedData.filter((x,y)=>{
//             return x.name ==reqName
//         })
//         console.log("this is my results")
//         console.log(result)
//         console.log("this is my data")
//         console.log(parsedData)
//         res.send({mydata:parsedData[reqName]})
//     }
//     catch(e){
//         res.send(e)
//     }
// })
// app.post("/data",async(req,res)=>{
//     console.log(req.body)
// })

// app.get("/getting", (req, res) => {
//     fs.readFile("./dummys.json", "utf8", (err, data) => {
//         if (err) {
//             return res.status(500).json({
//                 message: "Something went wrong",
//                 error: err.message
//             });
//         }
//         res.send(data); // Sends the file content
//     });
// });
// app.post("/postingdata", (req, res) => {
//     res.send("this is posting data")
// })
// app.put("/putting", (req, res) => {
//     res.send("this is the putting data")
// })
// app.delete("/deletes", (req, res) => {
//     res.send("deleted data")
// })
app.listen("3000", () => {
    console.log("port is rinning in the number 3000")
})