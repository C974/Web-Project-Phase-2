import productsRepo from "@/app/repo/products-repo";

export async function GET(request, { params }) {
  const productName = params.id;
  const newProduct = await productsRepo.getSingelProduct(productName);
  return Response.json(newProduct);
}
export async function PUT(request, { params }) {
  console.log(request);
  const id = params.id;
  const body = await request.json();
  const updateProduct = await productsRepo.updateProduct(id, body);
  return Response.json(updateProduct);
}
