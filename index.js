const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// ROUTE PRINCIPALE
app.get("/gamepasses/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const url = `https://inventory.roblox.com/v1/users/${userId}/items/GamePass?limit=50&sortOrder=Asc`;
        const response = await axios.get(url);

        res.json(response.data.data);
    } catch (err) {
        res.status(500).json({ error: "Erreur Roblox API" });
    }
});

// TEST
app.get("/", (req, res) => {
    res.send("API Roblox GamePass OK");
});

app.listen(PORT, () => {
    console.log("API lancée sur le port", PORT);
});
