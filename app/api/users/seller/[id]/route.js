import usersRepo from "@/app/repo/users-repo";

export async function GET(request, { params }) {
  const userEmail = params.id;
  const user = await usersRepo.getSellerUser(userEmail);
  return Response.json(user, { status: 200 });
}

export async function PUT(request, { params }) {
  const email = params.id;
  const body = await request.json();
  const updateSeller = await usersRepo.updateSellerUser(email, body);
  return Response.json(updateSeller);
}
