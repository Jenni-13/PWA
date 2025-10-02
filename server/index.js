const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());


const cats = [
    { id: 1, name: "Hojas", image: "/images/lapiz.jpg" },
    { id: 2, name: "Plumon", image: "/images/lapiz.jpg" },
    { id: 3, name: "Lapices", image: "/images/lapiz.jpg" },

];

// Endpoint de datos remotos
app.get("/api/items", (req, res) => {
    res.json(cats);
});

// Vista simple del servidor
app.get("/", (req, res) => {
    res.send("<h1>Servidor Express para PWA</h1>");
});

// Levantar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
