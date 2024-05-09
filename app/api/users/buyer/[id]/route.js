import usersRepo from "@/app/repo/users-repo";

export async function GET(request, { params }) {
  const userEmail = params.id;
  const user = await usersRepo.getBuyerUser(userEmail);
  return Response.json(user, { status: 200 });
}

export async function PUT(request, { params }) {
  const email = params.id;
  const body = await request.json();
  const updateBuyer = await usersRepo.updateBuyerUser(email, body);
  return Response.json(updateBuyer);
}
