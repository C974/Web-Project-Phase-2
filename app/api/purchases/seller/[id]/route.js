import purchasesRepo from "@/app/repo/purchases-repo";

export async function GET(request, { params }) {
  const userEmail = params.id;
  const purchase = await purchasesRepo.getPurchasesBySeller(userEmail);
  return Response.json(purchase, { status: 200 });
}
