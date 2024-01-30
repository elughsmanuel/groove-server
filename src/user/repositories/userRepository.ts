import { Prisma, PrismaClient } from "@prisma/client";
import { UserRole } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepository {
    async createUser(firstName: string, lastName: string, email: string, username: string, password: string) {
        const user = await prisma.user.create({
            data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
          }
        });

        return user;
    }

    async findByEmailAndPassword(email: string) {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
      
        return user;
    }

    async updateUserResetToken(userId: string, token: string, expires: Date) {
        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(userId, 10),
          },
          data: {
            resetPasswordToken: token,
            resetPasswordExpires: expires,
          },
        });
      
        return updatedUser;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
      
        return user;
    }

    async findByResetToken(email: string, token: string) {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
            resetPasswordToken: token,
            resetPasswordExpires: {
              gt: new Date(),
            },
          },
        });
      
        return user;
    }
      
    
      async updateUserPassword(userId: string, hashedPassword: string) {
        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(userId, 10),
          },
          data: {
            password: hashedPassword,
          },
        });
      
        return updatedUser;
    }

    async clearUserResetToken(userId: string) {
        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(userId, 10),
          },
          data: {
            resetPasswordToken: null,
            resetPasswordExpires: null,
          },
        });
      
        return updatedUser;
    } 

    async getAllUsers(role: any, skip: any, perPage: any) {
       
        const query: Prisma.UserWhereInput = {};
      
        if (role) {
          query.role = role as UserRole;
        }
      
        const users = await prisma.user.findMany({
          where: query,
          skip: parseInt(skip, 10) || undefined,
          take: parseInt(perPage, 10) || undefined,
        });
      
        return users;
    }

    async getTotalUserCount(role: any) {
        const count = await prisma.user.count({
          where: {
            role: role as UserRole,
          },
        });
      
        return count;
    
    }

    async getUserById(userId: string) {
        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(userId, 10),
          },
        });
      
        return user;
    }

    async updateMyProfile(userId: string, data: any) {
        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(userId, 10),
          },
          data: {
            ...data,
          },
        });
      
        return updatedUser;
    }

    async findPasswordByUserId(userId: string) {
        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(userId, 10),
          },
          select: {
            password: true,
          },
        });
      
        return user?.password || null;
    }

    async findByIdAndDelete(userId: string) {
        const user = await prisma.user.delete({
          where: {
            id: parseInt(userId, 10),
          },
        });
      
        return user;
    }

    async updateUser(userId: string, data: any) {
        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(userId, 10),
          },
          data: {
            ...data,
          },
        });
      
        return updatedUser;
    }

    async updateUserRole(userId: string, role: any) {
        const updatedUserRole = await prisma.user.update({
          where: {
            id: parseInt(userId, 10),
          },
          data: {
            role: role as UserRole,
          },
        });
      
        return updatedUserRole;
      }


      async createSuperAdmin(data: any) {
        const createdUser = await prisma.user.create({
          data: {
            ...data,
          },
        });
      
        return createdUser;
      }
      
}

export default UserRepository;
