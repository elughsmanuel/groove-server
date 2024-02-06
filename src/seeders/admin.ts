import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { ADMIN } from "../auth/utils/constants";

const prisma = new PrismaClient();

async function seedData() {
    // Your seeding logic using Prisma Client
    try {
        console.log(`[SEEDING] - Seeding started...`);

        // Hash the new password and update the user's password
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        const hashedPassword = await bcrypt.hash(String(process.env.ADMIN_PASSWORD), salt);

        // Seeing process
        await prisma.user.create({
            data: {
                firstName: String(process.env.ADMIN_FIRST_NAME),
                lastName: String(process.env.ADMIN_LAST_NAME),
                email: String(process.env.ADMIN_EMAIL),
                username: String(process.env.ADMIN_USERNAME),
                role: ADMIN,
                access: ADMIN,
                premium: true,
                password: hashedPassword,
            },
        });

        console.log(`[SEEDING] - Seeding successfully completed.`);

    } catch (error) {
        console.log(`[ERROR] - Error during seeding:`, error);
    } finally {
        await prisma.$disconnect();
    }
}

seedData()
