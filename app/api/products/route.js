import productsRepo from "@/app/repo/products-repo";

export async function GET() {
  const newProduct = await productsRepo.getProducts();
  return Response.json(newProduct);
}

export async function POST(request) {
  const product = await request.json();
  const newProduct = await productsRepo.addProduct(product);

  return Response.json(newProduct);
}
