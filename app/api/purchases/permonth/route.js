import purchasesRepo from "@/app/repo/purchases-repo";

export async function GET() {
  const data = await purchasesRepo.getPurchasePerMonth();
  return Response.json(data);
}
