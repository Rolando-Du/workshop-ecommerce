import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#f0f0f0",
    };

    const titleStyle = {
        color: "#326ffc",
        fontSize: "36px",
        fontWeight: "bold",
        padding: "10px",
        textAlign: "center",
    };

    const imageStyle = {
        width: "100%",
        maxWidth: "700px",
        height: "auto",
    };

    const buttonStyle = {
        backgroundColor: "#326ffc",
        color: "#fff",
        fontWeight: "bold",
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "18px",
        cursor: "pointer",
    };

    const navigate = useNavigate(); 

    const [typedText, setTypedText] = useState("");
    const fullText = "Oops, parece que has llegado a un callejón sin salida";

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 50);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const redirectToHome = () => {
        navigate("/");
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>{typedText}</h1>
            <img
                src="../../../public/assets/images/notFound.png"
                alt="NotFound"
                style={imageStyle}
            />
            <button
                style={buttonStyle}
                onClick={redirectToHome}
            >
                Ir a la página de inicio
            </button>
        </div>
    );
};

export default NotFound;
