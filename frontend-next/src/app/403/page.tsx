export default function ForbiddenPage() {
    return (
      <div className="flex h-screen items-center justify-center flex-col text-center">
        <h1 className="text-4xl font-bold text-red-600">403 - Akses Ditolak</h1>
        <p className="text-gray-500 mt-2">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    );
  }
  