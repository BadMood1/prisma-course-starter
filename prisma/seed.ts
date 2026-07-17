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
                name: "Alice",
                email: "alice@example.com",
            },
            {
                name: "Bob",
                email: "bob123@google.com",
            },
        ],
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
