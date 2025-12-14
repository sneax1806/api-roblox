const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = "CHANGE_MOI"; // 🔐 clé secrète

// Stockage temporaire des stands
const stands = {};

/* ===============================
   MIDDLEWARE DE SÉCURITÉ
================================ */
app.use((req, res, next) => {
	const key = req.headers["authorization"];
	if (key !== API_KEY) {
		return res.status(403).json({ error: "Forbidden" });
	}
	next();
});

/* ===============================
   METTRE À JOUR UN STAND
   (appelé par Roblox)
================================ */
app.post("/stand/update", (req, res) => {
	const { userId, gamepasses } = req.body;

	if (!userId || !Array.isArray(gamepasses)) {
		return res.status(400).json({ error: "Invalid data" });
	}

	stands[userId] = {
		gamepasses,
		updatedAt: Date.now()
	};

	res.json({ success: true });
});

/* ===============================
   RÉCUPÉRER UN STAND
================================ */
app.get("/stand/:userId", (req, res) => {
	const stand = stands[req.params.userId];
	if (!stand) {
		return res.json([]);
	}
	res.json(stand.gamepasses);
});

/* ===============================
   HEALTH CHECK
================================ */
app.get("/", (req, res) => {
	res.send("Roblox Stand API ONLINE");
});

app.listen(PORT, () => {
	console.log("API lancée sur le port " + PORT);
});
