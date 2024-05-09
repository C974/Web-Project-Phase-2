import usersRepo from "@/app/repo/users-repo";

export async function GET() {
  const newUser = await usersRepo.getUsers();
  return Response.json(newUser);
}

export async function POST(request) {
  const user = await request.json();
  const newUser = await usersRepo.addUser(user);

  return Response.json(newUser);
}
