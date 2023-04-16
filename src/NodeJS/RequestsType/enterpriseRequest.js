const express = require('express');
const fs = require('fs');

const router = express.Router();

const enterprisesFilePath = './DateJSON/Enterprises.json';

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;