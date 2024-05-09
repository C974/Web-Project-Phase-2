import productsRepo from "@/app/repo/products-repo";

export async function GET() {
  const bestProducts = await productsRepo.bestSellingProducts();

  return Response.json(bestProducts);
}
