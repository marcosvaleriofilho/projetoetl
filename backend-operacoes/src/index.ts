import http from "http";

const server = http.createServer((req, res) => {
    res.writeHead(200,
        { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            data: "Stro..."
        })
    );
});

server.listen(3000,()=>{
    console.log("Server rodando na porta 3000")
})

