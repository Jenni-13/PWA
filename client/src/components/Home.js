import { useEffect, useState } from "react";

export default function Home() {
    const [cats, setCats] = useState([]);
    const [location, setLocation] = useState(null);
    const [notificationSent, setNotificationSent] = useState(false);

    // Cargar datos de gatitos
    useEffect(() => {
        fetch("http://localhost:4000/api/items")
            .then(res => res.json())
            .then(data => setCats(data))
            .catch(err => {
                const localData = localStorage.getItem("items");
                if (localData) setCats(JSON.parse(localData));
            });
    }, []);

    // Notificación
    const notify = () => {
        if (!("Notification" in window)) return alert("Este navegador no soporta notificaciones");
        if (Notification.permission === "granted") showNotification();
        else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") showNotification();
            });
        }
    };
    const showNotification = () => {
        new Notification("🐱 Nuevo gatito disponible", {
            body: "Mira los nuevos gatitos que puedes adoptar hoy",
            icon: "/logo192.png",
        });
        setNotificationSent(true);
    };

    // Geolocalización
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                err => alert("No se pudo obtener la ubicación: " + err.message)
            );
        } else alert("Geolocalización no soportada en este navegador");
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <header style={{ backgroundColor: "#FF9800", color: "white", padding: "1rem", textAlign: "center" }}>
                <h1>🐾 Adopta un Gatito</h1>
                <p>Encuentra tu compañero felino ideal</p>
            </header>

            {/* Panel de acciones */}
            <section style={{ display: "flex", justifyContent: "center", gap: "2rem", margin: "2rem 0", flexWrap: "wrap" }}>
                {/* Notificación */}
                <div style={{ border: "1px solid #FF9800", borderRadius: "12px", padding: "1.5rem", width: "220px", textAlign: "center", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                    <h3>🔔 Alertas de gatitos</h3>
                    <p>Recibe notificaciones cuando lleguen nuevos gatitos</p>
                    <button onClick={notify} style={{ padding: "0.5rem 1rem", borderRadius: "6px", backgroundColor: "#FF9800", color: "white", border: "none", cursor: "pointer", marginTop: "1rem" }}>
                        {notificationSent ? "✅ Enviada" : "Activar"}
                    </button>
                </div>

                {/* Geolocalización */}
                <div style={{ border: "1px solid #4CAF50", borderRadius: "12px", padding: "1.5rem", width: "220px", textAlign: "center", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                    <h3>📍 Refugios cercanos</h3>
                    <p>Encuentra refugios de gatos cerca de ti</p>
                    <button onClick={getLocation} style={{ padding: "0.5rem 1rem", borderRadius: "6px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer", marginTop: "1rem" }}>
                        Obtener ubicación
                    </button>
                    {location && (
                        <p style={{ marginTop: "0.5rem" }}>
                            Lat: {location.lat.toFixed(4)} <br />
                            Lon: {location.lon.toFixed(4)}
                        </p>
                    )}
                </div>
            </section>

            {/* Lista de gatos */}
            <main style={{ flex: 1, padding: "0 2rem" }}>
                <h2>🐱 Gatitos disponibles</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                    {cats.map(cat => (
                        <div key={cat.id} style={{ border: "1px solid #ddd", borderRadius: "8px", width: "180px", textAlign: "center", padding: "1rem", boxShadow: "0 2px px rgba(0,0,0,0.1)" }}>
                            <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }} />
                            <h4>{cat.name}</h4>
                            <p>{cat.age ? `${cat.age} años` : "Edad desconocida"}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: "#333", color: "white", textAlign: "center", padding: "1rem" }}>
                <p>© 2025 Adopta un Gatito. Todos los derechos reservados 🐾</p>
            </footer>
        </div>
    );
}
