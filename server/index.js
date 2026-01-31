import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load .env.local to access GEMINI_API_KEY
dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

if (!process.env.GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set in .env.local');
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

app.get('/api/insights', async (req, res) => {
  const skill = String(req.query.skill || '');
  if (!skill) return res.status(400).json({ error: 'skill query param is required' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a 2-sentence market insight for the skill "${skill}" and list 3 helpful learning URLs.`,
      config: { tools: [{ googleSearch: {} }] },
    });

    const summary = response.text || 'No insights found for this skill.';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const chunks = Array.isArray(groundingChunks) ? groundingChunks : [];
    const links = chunks
      .filter((c) => c && c.web)
      .map((c) => ({ title: c.web.title, uri: c.web.uri }))
      .slice(0, 3);

    return res.json({ summary, links });
  } catch (err) {
    console.error('Gemini insights error:', err);
    return res.status(500).json({ error: 'Failed to fetch insights from Gemini', details: String(err) });
  }
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'message is required in body' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "You are SkillSwap AI, a helpful mentor on a skill-exchange platform. Be concise and professional.",
        temperature: 0.7,
      },
    });

    return res.json({ reply: response.text || "I'm having a little trouble thinking." });
  } catch (err) {
    console.error('Gemini chat error:', err);
    return res.status(500).json({ error: 'Gemini API error', details: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});