/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class usersRepo {
  async addUser(user) {
    try {
      return prisma.user.create({ data: user });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getUsers() {
    try {
      return prisma.user.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }
  async getBuyers() {
    try {
      return prisma.user.findMany({
        where: {
          type: "buyer",
        },
      });
    } catch (error) {
      return { error: error.message };
    }
  }
  async getSingelUser(userEmail) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getSellerUser(userEmail) {
    try {
      const user = await prisma.user.findMany({
        where: {
          type: "seller",
          email: userEmail,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Error fetching seller user: ${error.message}`);
    }
  }
  async getBuyerUser(userEmail) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          type: "buyer",
          email: userEmail,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Error fetching seller user: ${error.message}`);
    }
  }

  async updateSellerUser(email, body) {
    try {
      return prisma.user.update({
        where: {
          email: email,
        },

        data: body,
      });
    } catch (error) {
      return { error: error.message };
    }
  }
  async updateBuyerUser(email, body) {
    try {
      return prisma.user.update({
        where: {
          email: email,
        },

        data: body,
      });
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default new usersRepo();
