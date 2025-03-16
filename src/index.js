const http = require("http")
const fs = require("fs")
const path = require("path")
const port = 3000

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === "/" ? "/pages/questions.html" : req.url)

    // Get the file extension
    let extname = path.extname(filePath)
    let contentType = "text/html" // Default to HTML

    // Set correct Content-Type based on file extension
    switch (extname) {
        case ".js":
            contentType = "text/javascript"
            break;
        case ".css":
            contentType = "text/css"
            break;
        case ".json":
            contentType = "application/json"
            break;
        case ".png":
            contentType = "image/png"
            break;
        case ".jpg":
            contentType = "image/jpg"
            break;
        case ".ico":
            contentType = "image/x-icon"
            break;
        case ".svg":
            contentType = "image/svg+xml";
            break;
        default:
            contentType = "text/html"
    }

    // Read the file and serve it
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" })
            res.end("<h1>404 Not Found</h1>")
        } else {
            res.writeHead(200, { "Content-Type": contentType })
            res.end(data, "utf-8")
        }
    }); 
});

server.listen(port, (error) => {
    if (error) {
        console.log("Something went wrong: " + error)
    } else {
        console.log("Server is listening on port: " + port)
    }
})