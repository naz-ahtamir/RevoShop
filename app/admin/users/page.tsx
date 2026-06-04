import { getUsers } from "@/lib/data";
import type { User } from "@/lib/types";

export const dynamic = "force-dynamic";

export default function AdminUsersPage() {
  const users = getUsers();

  return (
    <>
      <h1 className="mb-8 font-[family-name:var(--font-montserrat)] text-2xl font-extrabold uppercase text-[var(--black)]">
        Users
      </h1>
      <div className="overflow-hidden rounded-2xl border border-[var(--gray-200)] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--gray-50)] text-left text-xs uppercase text-[var(--black)]">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: User) => (
                <tr key={u.id} className="border-t border-[var(--gray-100)]">
                  <td className="px-4 py-3 font-semibold text-[var(--orange)]">{u.id}</td>
                  <td className="px-4 py-3 text-[var(--black)]">{u.name}</td>
                  <td className="px-4 py-3 text-[var(--black)]">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${u.role === "ADMIN" ? "badge-orange" : "badge-gray"}`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
