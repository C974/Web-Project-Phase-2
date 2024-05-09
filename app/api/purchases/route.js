import purchasesRepo from "@/app/repo/purchases-repo";

export async function GET() {
  const allPurchase = await purchasesRepo.getPurchases();
  return Response.json(allPurchase);
}

export async function POST(request) {
  const purchase = await request.json();
  const newPurchase = await purchasesRepo.addPurchase(purchase);

  return Response.json(newPurchase);
}
