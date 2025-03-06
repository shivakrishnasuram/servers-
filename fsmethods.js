const express = require("express")
const app = express()
app.use(express.json())

const fs = require("fs").promises

app.get("/dataget", (req, res) => {
    // res.set("content-type","application/json")
    // res.json({"somethinfg":"sever is running in the port of 4500"})
    fs.readFile("./dummys.json", (err, data) => {  //utf 8 is not mandotory when you are sending data to the server ,
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

app.post("/postings", (req, res) => {
    // res.set("content-type","application/json")
    // res.json({"somethinfg":"sever is running in the port of 4500"})
    let name = req.body
    fs.writeFile("./myname.json", JSON.stringify(name), (err) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log(name)
            res.send(name)
        }
    })
})

app.put("/addcontent/:name", async (req, res) => {
    try {
        let reqName = req.params.name.toLowerCase()
        let { name, records, gmail } = req.body
        let existingData = JSON.parse(await fs.readFile("./myname.json", "utf8"))
        let searchingData = existingData.find((x, y) => {
            return x.name.toLowerCase() === reqName
        })
        console.log("this is my something ")
        console.log(searchingData)
        if (!searchingData) {
            res.status(404).send({ "data": "data is not found" })
        }
        else {
            existingData.push({ "id": existingData.length + 1, "name": name, "records": records, "email": gmail })
            res.send(existingData)
            await fs.writeFile("./myname.json", JSON.stringify(existingData))
        }
    }
    catch(e){
        res.send(e)
    }



    // existingData.push({"name":name,"records":records})
    // await fs.writeFile("./dummy.json",JSON.stringify(existingData))
})

app.post("/avoiddub",async (req,res)=>{
    let { name, records, email } = req.body
    let mydata =JSON.parse(await fs.readFile("./bowlers.json","utf8"))
    console.log(mydata,"mydata")
    results= mydata.some(x=>{
        return x.email === email && x.records ==records && x.name ==name
    })
    console.log(results)
    if(!results){
        mydata.push({"name":name,"records":records,"email":email})
        await fs.writeFile("./bowlers.json",JSON.stringify(mydata))
        res.status(200).json({"data":mydata})
    }
    else{
        res.json({
            "msg":"email already existing "
        })
    }
})
app.delete("/gone", async (req, res) => {
    try {
        await fs.unlink("./nodes.json");
        res.status(200).json({ message: "file deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});














// let normaldata = fs.readFileSync("./dummys.json", "utf8")
// console.log(normaldata)




app.listen("4500", () => {
    console.log({ "somethinfg": "sever is running in the port of 4500" })
})