const express = require('express');
const bodyParser = require('body-parser');
const enterpriseRouter = require('./RequestsType/enterpriseRequest');
const companyRouter = require('./RequestsType/companyRequest');
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

app.use('/enterprise', enterpriseRouter);
app.use('/company', companyRouter);

app.get('/currency', (req, res) => {
    const currency = { name: 'UAH' };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.send(JSON.stringify(currency));
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});