/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class purchasesRepo {
  async addPurchase(purchase) {
    try {
      return prisma.purchase.create({ data: purchase });
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

  async getBuyersCityWithCount() {
    try {
      const uniqueCitiesWithCount = await prisma.purchase.groupBy({
        by: ["city"],
        _count: {
          city: true,
        },
      });
      return uniqueCitiesWithCount.map(({ city, _count }) => ({
        city,
        count: _count,
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPurchasesByBuyer(email) {
    try {
      return prisma.purchase.findMany({
        where: {
          buyerEmail: email,
        },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getPurchasesBySeller(email) {
    try {
      return prisma.purchase.findMany({
        where: {
          sellerEmail: email,
        },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getAvgPurchasePrice() {
    try {
      const purchases = await prisma.purchase.findMany();
      const totalOrderValue = purchases.reduce((acc, purchase) => {
        return acc + purchase.quantity * purchase.price;
      }, 0);
      const averageOrderValue = totalOrderValue / purchases.length;
      return averageOrderValue;
    } catch (error) {
      console.error("Error fetching purchases:", error);
      return null;
    }
  }
  async getRepeatBuyer() {
    try {
      const purchases = await prisma.purchase.findMany({
        select: {
          buyerEmail: true,
          quantity: true,
          price: true,
        },
      });

      const buyerEmails = [
        ...new Set(purchases.map((purchase) => purchase.buyerEmail)),
      ];
      const buyerNamesMap = new Map();
      await Promise.all(
        buyerEmails.map(async (email) => {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
          buyerNamesMap.set(email, user ? user.name : null);
        })
      );

      const summaries = purchases.reduce((acc, purchase) => {
        const { buyerEmail, quantity, price } = purchase;
        const totalPrice = quantity * price;
        const buyerName = buyerNamesMap.get(buyerEmail);

        if (acc.has(buyerEmail)) {
          const summary = acc.get(buyerEmail);
          summary.totalQuantity += quantity;
          summary.totalPrice += totalPrice;
        } else {
          acc.set(buyerEmail, {
            buyerEmail: buyerEmail,
            buyerName: buyerName,
            totalQuantity: quantity,
            totalPrice: totalPrice,
          });
        }
        return acc;
      }, new Map());

      const summariesArray = Array.from(summaries.values());

      summariesArray.sort((a, b) => b.totalPrice - a.totalPrice);

      return summariesArray;
    } catch (error) {
      console.error("Error fetching purchase list:", error);
      throw error;
    }
  }

  async getTotalPurchasePrice() {
    try {
      const purchases = await this.getPurchases();

      const total = purchases.reduce((accumulator, currentPurchase) => {
        const purchaseTotal = currentPurchase.price * currentPurchase.quantity;
        return accumulator + purchaseTotal;
      }, 0);

      return total;
    } catch (error) {
      console.error("Error fetching purchases:", error);
      return null;
    }
  }

  async getPurchasePerMonth() {
    try {
      const purchases = await prisma.purchase.findMany();

      // Group purchases by year and month
      const purchasesPerMonth = purchases.reduce((acc, purchase) => {
        const date = new Date(purchase.createdAt);
        const year = date.getFullYear();
        const monthName = date.toLocaleString("default", { month: "long" }); // Get month name
        const key = `${year}-${monthName}`;

        if (!acc[key]) {
          acc[key] = { month: monthName, totalAmount: 0 };
        }
        acc[key].totalAmount += purchase.quantity * purchase.price;

        return acc;
      }, {});

      // Convert object to array of objects
      const purchasesArray = Object.keys(purchasesPerMonth).map(
        (key) => purchasesPerMonth[key]
      );

      return purchasesArray;
    } catch (error) {
      console.error("Error finding purchases per month:", error);
      throw error;
    }
  }

  asy;
}

export default new purchasesRepo();
