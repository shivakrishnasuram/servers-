const { fstat } = require("fs")
const http =require("http")
const fs =require("fs")

const PORT =7000
const server =http.createServer((req,res)=>{

    if(req.method =="POST"){
        let datas =""
        req.on("data",(chunk)=>{
            datas+=chunk.toString()
        })
        req.on("end",()=>{
            fs.readFile("./dummys.json","utf-8",(err,data)=>{
                if(err){
                    res.write(err)
                    res.end()
                }
                else{
                    let existingData =JSON.parse(data)
                    existingData.push(JSON.parse(datas))
                    let newdata =existingData
                    console.log("this is paesed data ")
                    console.log(existingData)
                    res.end()


                    fs.writeFile("./dummys.json",JSON.stringify(newdata),(err)=>{
                        if(err){
                            res.write(err)
                            res.end()
                        }
                        else{
                            res.write(JSON.stringify(newdata))
                            console.log("last data is this")
                            console.log(newdata)
                            res.end()
                        }
                    })
                }
            })
        })
    }
    
})
server.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})