import UserForm from "@/components/users/UserForm";

export default function CreateUserPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tambah User Baru</h1>
      <UserForm />
    </div>
  );
}
