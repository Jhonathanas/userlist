import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import FormUser from "./FormUser";

const Action = ({ row }: any) => {
  return (
    <div className="flex gap-2">
      {/* Dialog Edit */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6 rounded-xl dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Edit data user di bawah ini.</DialogDescription>
          </DialogHeader>
          <FormUser aksi="update" user={row.original} />
        </DialogContent>
      </Dialog>

      {/* Dialog Hapus */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Hapus
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6 rounded-xl dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah kamu yakin ingin menghapus user ini?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <DialogTrigger asChild>
              <Button variant="outline">Batal</Button>
            </DialogTrigger>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  const res = await fetch("/api/users", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: row.original.id }),
                  });

                  if (!res.ok) {
                    const error = await res.json();
                    alert("Gagal menghapus user: " + error.message);
                  } else {
                    alert("User berhasil dihapus");
                    window.location.reload(); // atau update state jika tanpa reload
                  }
                } catch (err) {
                  console.error(err);
                  alert("Terjadi kesalahan saat menghapus.");
                }
              }}
            >
              Ya, Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Action;
