import "dotenv/config";
import express from "express";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());

app.get("/users", async (_, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: "a",
                    mode: "insensitive",
                },
                NOT: {
                    age: {
                        gt: 27,
                    },
                },
            },
        });

        res.json(users);
    } catch (err) {
        console.error("Ошибка получения данных:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
