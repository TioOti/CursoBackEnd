const http = require('http')

const server = http.createServer((request, response)=>{
    response.end("<h1 style= 'color: blue' >Hola mundo from backend</h1>")
})

server.listen(8080, ()=>{
    console.log("Listening on port 8080")
})