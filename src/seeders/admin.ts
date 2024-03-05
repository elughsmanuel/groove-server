import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { ADMIN } from "../auth/utils/constants";
import { logger } from "../log/logger";

const prisma = new PrismaClient();

async function seedData() {
    // Your seeding logic using Prisma Client
    try {
        logger.info(`[SEEDING] - Seeding started...`);

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
                password: hashedPassword,
            },
        });

        logger.info(`[SEEDING] - Seeding successfully completed.`);

    } catch (error) {
        logger.error(`[ERROR] - Error during seeding:`, error);
    } finally {
        await prisma.$disconnect();
    }
}

seedData()
