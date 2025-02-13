const app = require('./app');
const PORT = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);

server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })