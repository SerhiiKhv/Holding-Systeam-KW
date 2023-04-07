const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    const { method, url } = request;

    // Обробка запитів GET
    if (method === 'GET') {
        if (url === '/enterprise') {
            // Читання даних з JSON-файлу
            fs.readFile("./DateJSON/Enterprises.json", (err, data) => {
                if (err) {
                    console.error(err);
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.write('Internal server error');
                    response.end();
                    return;
                }

                // Встановлення заголовків відповіді
                response.setHeader('Content-Type', 'application/json');
                response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                response.setHeader('Access-Control-Allow-Credentials', 'true');

                // Відправлення даних як відповідь на запит
                response.write(data);
                response.end();
            });
        } else if (url === '/currency') {
            // Отримання даних з бази даних або з іншого джерела
            const currency = { name: 'UAH' };

            // Встановлення заголовків відповіді
            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            response.setHeader('Access-Control-Allow-Credentials', 'true');

            // Відправлення даних як відповідь на запит
            response.write(JSON.stringify(currency));
            response.end();
        }
    }
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
