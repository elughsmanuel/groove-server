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

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
      
        return user;
    }

    async findByUsername(username: string) {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
    
      return user;
  }

    async updateUserResetToken(userId: number, token: string, expires: Date) {
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            resetPasswordToken: token,
            resetPasswordExpires: expires,
          },
        });
      
        return updatedUser;
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
      
    
      async updateUserPassword(userId: number, hashedPassword: string) {
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            password: hashedPassword,
          },
        });
      
        return updatedUser;
    }

    async clearUserResetToken(userId: number) {
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
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

    async getUserById(userId: number) {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
      
        return user;
    }

    async updateMyProfile(userId: number, data: any) {
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            ...data,
          },
        });
      
        return updatedUser;
    }

    async switchUserAccess(userId: number, access: any) {
		const switchUserAccess = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				access: access,
			},
		});
    
      return switchUserAccess;
    } 

    async findPasswordByUserId(userId: number) {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            password: true,
          },
        });
      
        return user?.password || null;
    }

    async findByIdAndDelete(userId: number) {
        const user = await prisma.user.delete({
          where: {
            id: userId,
          },
        });
      
        return user;
    }

    async updateUser(userId: number, data: any) {
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            ...data,
          },
        });
      
        return updatedUser;
    }

    async updateUserRole(userId: number, role: any, access: any) {
        const updatedUserRole = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            role: role,
            access: access,
          },
        });
      
        return updatedUserRole;
    }
}

export default UserRepository;
