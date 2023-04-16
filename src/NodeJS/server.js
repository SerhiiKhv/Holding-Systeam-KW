const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Додати домен, з якого дозволяється зробити запит
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Додати список дозволених методів запиту
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Додати список дозволених заголовків запиту
    res.header('Access-Control-Allow-Credentials', 'true'); // Додати дозвіл на використання креденшалів
    next();
});

const enterprisesFilePath = './DateJSON/Enterprises.json';

app.get('/enterprise', (req, res) => {
    fs.readFile(enterprisesFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.send(data);
    });
});

app.get('/currency', (req, res) => {
    const currency = { name: 'UAH' };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.send(JSON.stringify(currency));
});
app.post('/enterprise', (req, res) => {
    try {
        const newEnterprise = req.body;

        fs.readFile(enterprisesFilePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }

            const enterprises = JSON.parse(data);

            if (newEnterprise && Object.keys(newEnterprise).length > 0) {
                // Генеруємо новий ідентифікатор (id) для нового підприємства
                const id = Date.now();
                newEnterprise.id = id;

                enterprises.push(newEnterprise);
            }

            fs.writeFile(enterprisesFilePath, JSON.stringify(enterprises), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                    return;
                }

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.sendStatus(200);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

app.put('/enterprise/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const newEnterprise = req.body;

        fs.readFile(enterprisesFilePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }

            let enterprises = JSON.parse(data);

            const enterpriseIndex = enterprises.findIndex((e) => e.id === id); // Знаходимо індекс підприємства за його id

            if (enterpriseIndex === -1) {
                res.status(404).send('Enterprise not found');
                return;
            }

            enterprises[enterpriseIndex] = { ...enterprises[enterpriseIndex], ...newEnterprise }; // Замінюємо дані підприємства

            fs.writeFile(enterprisesFilePath, JSON.stringify(enterprises), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                    return;
                }

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.sendStatus(200);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

app.delete('/enterprise/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        fs.readFile(enterprisesFilePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }

            let enterprises = JSON.parse(data);

            const enterpriseIndex = enterprises.findIndex((e) => e.id === id); // Знаходимо індекс підприємства за його id

            if (enterpriseIndex === -1) {
                res.status(404).send('Enterprise not found');
                return;
            }

            enterprises.splice(enterpriseIndex, 1); // Видаляємо підприємство з масиву

            fs.writeFile(enterprisesFilePath, JSON.stringify(enterprises), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                    return;
                }

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.sendStatus(200);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});