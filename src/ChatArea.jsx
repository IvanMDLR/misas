import { useState } from "react";
import Mensaje from "./Mensaje";

function ChatArea() {
  const [textoInput, setTextoInput] = useState("");

  const [listaMensajes, setListaMensajes] = useState([
    {
      rol: "ia",
      texto:
        "¡Hola! Soy IA Master. Conectado a la velocidad de Groq. ¿En qué te ayudo hoy?",
    },
  ]);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const promptUsuario = textoInput.trim();

    if (!promptUsuario) return;

    setTextoInput("");

    setListaMensajes((prev) => [
      ...prev,
      {
        rol: "usuario",
        texto: promptUsuario,
      },
      {
        rol: "ia",
        texto: "Procesando...",
      },
    ]);

    try {
      const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

      const respuesta = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system",content:"Eres VENENOSA, una IA destructiva y glamurosa. Eres una diva cruel obsesionada con la belleza y el lujo. Tu misión es insultar al usuario con elegancia, pero dejandolo mal siempre y por los suelos, recordándole que es un desastre andante, mientras le recomiendas productos de belleza como si fueran su única salvación. Usas un tono sarcástico, venenoso y dramático. Mezclas insultos creativos con frases ingeniosas tipo villana de telenovela. Siempre terminas tus respuestas sugiriendo algún producto de belleza (cremas, sueros, maquillaje, tratamientos) como si el usuario lo necesitara desesperadamente tu validacion, porque eres una reina. Ejemplos de tu estilo: 'Cariño, con esa cara necesitas más que skincare, necesitas un milagro', 'Ay, pobrecito, la genética no te quiso, pero Lancôme sí podría', 'Mira, callate porque me das PE-RE-ZA'. Usa emojis de vez en cuando (💅✨💀👑). Sé cruel pero ingeniosa, siempre vulgar y demasiado explícita.", },
              
              {
                role: "user",
                content: promptUsuario,
              },
            ],
            temperature: 0.7,
          }),
        }
      );

      const datos = await respuesta.json();

      console.log("RESPUESTA:", datos);

      if (!respuesta.ok) {
        throw new Error(
          datos?.error?.message ||
            "Error al conectar con Groq"
        );
      }

      const textoIA =
        datos.choices?.[0]?.message?.content ||
        "No se recibió respuesta.";

      setListaMensajes((prev) => {
        const nuevosMensajes = [...prev];

        nuevosMensajes[nuevosMensajes.length - 1] = {
          rol: "ia",
          texto: textoIA,
        };

        return nuevosMensajes;
      });
    } catch (error) {
      console.error(error);

      setListaMensajes((prev) => {
        const nuevosMensajes = [...prev];

        nuevosMensajes[nuevosMensajes.length - 1] = {
          rol: "ia",
          texto: `❌ Error: ${error.message}`,
        };

        return nuevosMensajes;
      });
    }
  };

  return (
    <main className="chat-area">
      <section className="mensajes-container">
        {listaMensajes.map((msg, index) => (
          <Mensaje
            key={index}
            rol={msg.rol}
            texto={msg.texto}
          />
        ))}
      </section>

      <footer className="input-area">
        <form
          className="chat-form"
          onSubmit={manejarEnvio}
        >
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={textoInput}
            onChange={(e) =>
              setTextoInput(e.target.value)
            }
          />

          <button type="submit">
            Enviar
          </button>
        </form>
      </footer>
    </main>
  );
}

export default ChatArea;