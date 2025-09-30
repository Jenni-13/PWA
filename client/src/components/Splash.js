import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => navigate("/home"), 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "20vh" }}>
            <h1>🐾 Encuentra tu compañero felino ideal </h1>
            <p>Cargando...</p>
        </div>
    );
}
