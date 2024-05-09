import purchasesRepo from "@/app/repo/purchases-repo";

export async function GET() {
  const newUser = await purchasesRepo.getTotalPurchasePrice();
  return Response.json(newUser);
}
