const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.jpg':'image/jpeg', '.png':'image/png', '.webp':'image/webp', '.mp4':'video/mp4'};
http.createServer((req,res) => {
    let file;
    try { file = path.resolve(__dirname, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); }
    catch { res.writeHead(400).end(); return; }
    if (!file.startsWith(__dirname + path.sep) && file !== __dirname) { res.writeHead(403).end(); return; }
    if (file === __dirname) file = path.join(file, 'index.html');
    fs.stat(file, (error, stat) => {
        if (error || !stat.isFile()) { res.writeHead(404).end(); return; }
        res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream'});
        fs.createReadStream(file).pipe(res);
    });
}).listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
