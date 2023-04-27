import express from "express";
import cors from "cors";
import { db } from "./database/database.connection.js";


const app = express();
app.use(express.json());
app.use(cors());

//Função teste:
app.get("/teste", async(req,res)=>{
    try {
        const object = await db.collection("teste").findOne({teste:'funcionou!'});
        res.send(object.teste);
    } catch (err) {
        console.log(err);
    }
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));