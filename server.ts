import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ElevenLabs API Proxy
  app.post("/api/clone-voice", async (req, res) => {
    const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;
    if (!ELEVEN_LABS_API_KEY) {
      return res.status(500).json({ error: "ELEVEN_LABS_API_KEY is not set" });
    }
    // Implement proxy logic here
    res.json({ message: "Voice cloning endpoint ready" });
  });

  app.post("/api/generate-voice", async (req, res) => {
     // Proxy logic for text-to-speech
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
