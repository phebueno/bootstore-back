import bcrypt from "bcrypt"
import { db } from "../database/database.connection.js"
import { v4 as uuid } from "uuid"

export async function register(req, res) {
    const { name, email, password } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (user) return res.status(409).send("Email já cadastrado!")

        const hash = bcrypt.hashSync(password, 10)

        await db.collection("users").insertOne({ name, email, password: hash })
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function login(req, res) {
    const { email, password } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (!user) return res.status(404).send("Email não cadastrado")

        const compareHash = bcrypt.compareSync(password, user.password)
        if (!compareHash) return res.status(401).send("Senha incorreta")

        const token = uuid()
        await db.collection("sessions").insertOne({ token, userId: user._id })

        res.status(200).send({ token, userName: user.name })
    } catch (err) {
        res.status(500).send(err.message)
    }

}
