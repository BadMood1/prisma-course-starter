import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Создает пул подключений к базе данных PostgreSQL
// -----------------
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
// ------------------

async function seed() {
    await prisma.user.createMany({
        data: [
            {
                name: "Pedro",
                email: "pedro@example.com",
                age: 19,
                isMarried: false,
                nationality: "Brazilian",
            },
            {
                name: "Alice",
                email: "alice456@google.com",
                age: 28,
                isMarried: true,
                nationality: "American",
            },
            {
                name: "Maksim",
                email: "maksim@example.com",
                age: 31,
                isMarried: false,
                nationality: "Russian",
            },
            {
                name: "Sofia",
                email: "sofia@example.com",
                age: 24,
                isMarried: true,
                nationality: "Ukrainian",
            },
            {
                name: "Liam",
                email: "liam@example.com",
                age: 27,
                isMarried: false,
                nationality: "Canadian",
            },
            {
                name: "Nina",
                email: "nina@example.com",
                age: 35,
                isMarried: true,
                nationality: "German",
            },
            {
                name: "Yuki",
                email: "yuki@example.com",
                age: 22,
                isMarried: false,
                nationality: "Japanese",
            },
        ],
        skipDuplicates: true,
    });
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
