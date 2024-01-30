import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { SUPER_ADMIN } from "../auth/utils/constants";

const prisma = new PrismaClient();

async function seedData() {
    // Your seeding logic using Prisma Client
    try {
        console.log(`[SEEDING] - Seeding started...`);

        // Hash the new password and update the user's password
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        const hashedPassword = await bcrypt.hash(String(process.env.SUPER_ADMIN_PASSWORD), salt);

        // Seeing process
        await prisma.user.create({
            data: {
                firstName: String(process.env.SUPER_ADMIN_FIRST_NAME),
                lastName: String(process.env.SUPER_ADMIN_LAST_NAME),
                email: String(process.env.SUPER_ADMIN_EMAIL),
                username: String(process.env.SUPER_ADMIN_USERNAME),
                role: SUPER_ADMIN,
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
