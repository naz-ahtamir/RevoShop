import bcrypt from "bcryptjs";
import { writeFileSync } from "fs";
import { join } from "path";

const users = [
  {
    id: "1",
    email: "admin@revoshop.co.id",
    password: "admin123",
    name: "Admin RevoShop",
    role: "ADMIN" as const,
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Demo User",
    role: "USER" as const,
  },
];

async function main() {
  const hashed = await Promise.all(
    users.map(async (u) => ({
      id: u.id,
      email: u.email,
      passwordHash: await bcrypt.hash(u.password, 10),
      name: u.name,
      role: u.role,
    }))
  );
  const path = join(process.cwd(), "data", "users.json");
  writeFileSync(path, JSON.stringify(hashed, null, 2));
  console.log("Wrote", path);
}

main();
