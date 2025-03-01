
const http = require("http");
const fs = require("fs");
const { url } = require("inspector");

const PORT = 7000;
const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = parsedUrl.pathname;

    if (req.method == "POST" && (pathname === "/user" || pathname === "/admin")) {
        let datas = "";
        req.on("data", (chunk) => {
            datas += chunk.toString();
        });
        req.on("end", () => {
            fs.readFile("./dummys.json", "utf-8", (err, data) => {
                if (err) {
                    res.write(err);
                    res.end();
                } else {
                    let existingData = JSON.parse(data);
                    let newData = JSON.parse(datas);
                    newData.role = pathname.substring(1);
                    let isDuplicate = existingData.some(
                        (item) => item.email === newData.email || item.username === newData.username
                    );

                    if (!isDuplicate) {
                        existingData.push(newData);
                        res.write("Everything is good to see");
                        console.log("New user added successfully.");
                    } else {
                        console.log("Duplicate email or username found. Data not added.");
                        res.writeHead(404, "Change the email or username");
                        res.write("Username or email already exists");
                    }
                    console.log("Updated Data:", existingData);
                    let newdata = existingData;
                    console.log("This is passed data:");
                    console.log(newdata);
                    res.end();
                    fs.writeFile("./dummys.json", JSON.stringify(newdata), (err) => {
                        if (err) {
                            res.write(err);
                            res.end();
                        } else {
                            res.write(JSON.stringify(newdata));
                            console.log("Last data is this");
                            console.log(newdata);
                            res.end();
                        }
                    });
                }
            });
        });
    } else if (req.method === "GET") {
        if (pathname === "/user" || pathname === "/admin") {
            fs.readFile("./dummys.json", "utf-8", (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Error reading file" }));
                } else {
                    let users = JSON.parse(data);
                    let filteredUsers = users.filter(user => user.role === pathname.substring(1));
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(filteredUsers));
                }
            });
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Route not found");
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
