import purchasesRepo from "@/app/repo/purchases-repo";

export async function GET() {
  const newUser = await purchasesRepo.getBuyersCityWithCount();
  return Response.json(newUser);
}
