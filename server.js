const { fstat } = require("fs")
const http = require("http")
const fs = require("fs")

const PORT = 7000
const server = http.createServer((req, res) => {

    if (req.method == "POST") {
        let datas = ""
        req.on("data", (chunk) => {
            datas += chunk.toString()
        })
        req.on("end", () => {
            fs.readFile("./dummys.json", "utf-8", (err, data) => {
                if (err) {
                    res.write(err)
                    res.end()
                }
                else {
                    let existingData = JSON.parse(data); 
                    let newData = JSON.parse(datas);
                    let isDuplicate = existingData.some(item => item.email === newData.email || item.username === newData.username);
                    if (!isDuplicate) {
                        existingData.push(newData);
                        res.write("every thing is good to see ")
                        console.log("New user added successfully.");
                    } else {
                        console.log("Duplicate email or username found. Data not added.");
                        res.writeHead(404,"change the email or usename")
                        res.write("usename or email already existing ")
                    }
                    console.log("Updated Data:", existingData);
                    let newdata = existingData;
                    console.log("This is passed data:");
                    console.log(newdata);
                    res.end()
                    fs.writeFile("./dummys.json", JSON.stringify(newdata), (err) => {
                        if (err) {
                            res.write(err)
                            res.end()
                        }
                        else {
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
server.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})