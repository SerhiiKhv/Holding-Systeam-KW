const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const currencyFilePath = './DateJSON/Currency.json';

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(currencyFilePath);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;