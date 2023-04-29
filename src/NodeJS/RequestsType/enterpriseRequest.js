const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const enterprisesFilePath = './DateJSON/Enterprises.json';

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(enterprisesFilePath);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newEnterprise = req.body;
        const data = await fs.readFile(enterprisesFilePath);
        const enterprises = JSON.parse(data);

        if (newEnterprise && Object.keys(newEnterprise).length > 0) {
            // Генеруємо новий ідентифікатор (id) для нового підприємства
            newEnterprise.id = Date.now();
            enterprises.push(newEnterprise);
        }

        await fs.writeFile(enterprisesFilePath, JSON.stringify(enterprises));
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const newEnterprise = req.body;
        let data = await fs.readFile(enterprisesFilePath)
        let enterprises = JSON.parse(data);

        const enterpriseIndex = enterprises.findIndex((e) => e.id === id); // Знаходимо індекс підприємства за його id

        if (enterpriseIndex === -1) {
            res.status(404).send('Enterprise not found');
            return;
        }

        enterprises[enterpriseIndex] = {...enterprises[enterpriseIndex], ...newEnterprise}; // Замінюємо дані підприємства

        await fs.writeFile(enterprisesFilePath, JSON.stringify(enterprises))
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await fs.readFile(enterprisesFilePath)
        let enterprises = JSON.parse(data);

        const enterpriseIndex = enterprises.findIndex((e) => e.id === id); // Знаходимо індекс підприємства за його id

        if (enterpriseIndex === -1) {
            res.status(404).send('Enterprise not found');
            return;
        }

        enterprises.splice(enterpriseIndex, 1); // Видаляємо підприємство з масиву

        await fs.writeFile(enterprisesFilePath, JSON.stringify(enterprises))
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad request');
    }
});

module.exports = router;