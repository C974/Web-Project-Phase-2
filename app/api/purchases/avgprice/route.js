import purchasesRepo from "@/app/repo/purchases-repo";

export async function GET() {
  const data = await purchasesRepo.getAvgPurchasePrice();
  return Response.json(data);
}
