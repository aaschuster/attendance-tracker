const server = require("./backend/index");

const PORT = 1234;

server.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`)
})