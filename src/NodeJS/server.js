const express = require('express');
const bodyParser = require('body-parser');
const enterpriseRouter = require('./RequestsType/enterpriseRequest');
const companyRouter = require('./RequestsType/companyRequest');
const currencyRouter = require('./RequestsType/currencyRequest');
const financialReportRouter = require('./RequestsType/financialReportRequest');
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
app.use('/financialReport', financialReportRouter);
app.use('/currency', currencyRouter);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});