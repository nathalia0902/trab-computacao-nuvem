const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM tasks ORDER BY id"
        );

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
});

router.post("/", async (req, res) => {

    const { title } = req.body;

    try {

        await db.query(
            "INSERT INTO tasks(title, done) VALUES($1,false)",
            [title]
        );

        res.sendStatus(201);

    } catch (err) {

        console.error(err);
        res.status(500).send("Erro");

    }

});

router.put("/:id", async (req, res) => {

    try {

        await db.query(
            "UPDATE tasks SET done = NOT done WHERE id=$1",
            [req.params.id]
        );

        res.sendStatus(200);

    } catch (err) {

        console.error(err);
        res.status(500).send("Erro");

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await db.query(
            "DELETE FROM tasks WHERE id=$1",
            [req.params.id]
        );

        res.sendStatus(200);

    } catch (err) {

        console.error(err);
        res.status(500).send("Erro");

    }

});

module.exports = router;
