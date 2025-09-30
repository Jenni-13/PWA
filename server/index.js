const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Datos de ejemplo (gatitos)
const cats = [
    { id: 1, name: "Michi", age: 2, image: "/images/gato1.jpg" },
    { id: 2, name: "Luna", age: 1, image: "/images/gato2.jpg" },
    { id: 3, name: "Simba", age: 3, image: "/images/gato3.jpg" },
    { id: 4, name: "Nala", age: 4, image: "/images/gato4.jpg" }
];

// Endpoint de datos remotos
app.get("/api/items", (req, res) => {
    res.json(cats);
});

// Vista simple del servidor
app.get("/", (req, res) => {
    res.send("<h1>Servidor Express para PWA de Adopta un Gatito 🐱</h1>");
});

// Levantar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
