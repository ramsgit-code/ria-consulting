"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeletePostButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const remove = async () => {
    if (!confirm("¿Eliminar este articulo?")) return;
    setLoading(true);
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={remove}
      disabled={loading}
      className="text-red-400 hover:underline text-xs"
    >
      {loading ? "..." : "Eliminar"}
    </button>
  );
}
