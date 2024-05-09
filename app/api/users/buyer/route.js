import usersRepo from "@/app/repo/users-repo";

export async function GET() {
  const newUser = await usersRepo.getBuyers();
  return Response.json(newUser);
}
