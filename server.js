import { GoogleGenAI } from "@google/genai";
import express from 'express'
const app = express();
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Server is Ready");
})

const PORT = process.env.PORT;
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

async function main(contents) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });
  console.log(response.text);
  return response.text;
}

// await main();

app.get('/api/content', async (req, res) => {
    try {
        const data = req.body.question;
        const result = await main(data);

        res.send({
            "result": result
        })
    } catch (error) {
        res.send("error: "  + error);
    }
})

app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`);
    
});