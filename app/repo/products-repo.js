/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class productsRepo {
  async addProduct(product) {
    try {
      return prisma.product.create({ data: product });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getProducts() {
    try {
      return prisma.product.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }
  async getSingelProduct(name) {
    try {
      return prisma.product.findMany({
        where: {
          productName: name,
        },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateProduct(id, body) {
    try {
      return prisma.product.update({
        where: {
          id: parseInt(id),
        },

        data: body,
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getPurchases() {
    try {
      return prisma.purchase.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }

  async bestSellingProducts() {
    try {
      // Query the database to group purchases by product name and count the quantity for each product
      const uniqueProducts = await prisma.purchase.groupBy({
        by: ["productName"],
        _count: {
          quantity: true,
        },
      });

      // Sort the uniqueProducts array by count in ascending order
      uniqueProducts.sort((a, b) => a._count.quantity - b._count.quantity);

      // Map the sorted array to fetch full product data and return the result
      const productsWithCounts = await Promise.all(
        uniqueProducts.map(async ({ productName, _count }) => {
          // Fetch the product details based on the product name
          const product = await prisma.product.findMany({
            where: {
              productName: productName,
            },
          });

          // Return the product data along with the count
          return {
            productName,
            count: _count.quantity,
            productData: product,
          };
        })
      );

      return productsWithCounts;
    } catch (error) {
      // If an error occurs, throw an error with the error message
      throw new Error(error.message);
    }
  }
}

export default new productsRepo();
