import { useEffect, useState } from "react";

export default function Home() {
    const [cats, setCats] = useState([]);


    // Cargar datos de gatitos
    const API_URL = process.env.NODE_ENV === "production"
        ? "https://pwa-km5q.onrender.com/api/items"
        : "http://localhost:4000/api/items";

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setCats(data);  // ← aquí estaba setItems
            })
            .catch(err => {
                console.error("Error al cargar datos remotos:", err);

                // Si falla, cargar datos locales
                const localData = localStorage.getItem("cats"); // ← aquí también
                if (localData) {
                    setCats(JSON.parse(localData)); // ← reemplazar
                }
            });
    }, []);



    return (
        <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <header style={{ backgroundColor: "#005eff55", color: "white", padding: "1rem", textAlign: "center" }}>
                <h1>Tenda campus </h1>
                <p>Encuentra tu  Papelería, Electrónica, Snacks.</p>
            </header>

            {/* Lista de gatos */}
            <main style={{ flex: 1, padding: "0 2rem" }}>
                <h2>Papelería</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                    {cats.map(cat => (
                        <div key={cat.id} style={{ border: "1px solid #ddd", borderRadius: "8px", width: "180px", textAlign: "center", padding: "1rem", boxShadow: "0 2px px rgba(0,0,0,0.1)" }}>
                            <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }} />
                            <h4>{cat.name}</h4>

                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: "#333", color: "white", textAlign: "center", padding: "1rem" }}>
                <p>© 2025 Todos los derechos reservados 🐾</p>
            </footer>
        </div>
    );
}
