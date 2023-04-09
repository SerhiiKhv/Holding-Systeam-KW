const express = require('express');
const fs = require('fs');


const app = express();
app.use(express.json());

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


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use((req, res, next) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        req.body = JSON.parse(data);
        next();
    });
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

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





