"use client";

import styles from "./DeleteButton.module.scss"
import { Trash2 } from "lucide-react";

export default function DeleteButton({ foodId }: { foodId: string }) {
  const handleDelete = async () => {
    if (!window.confirm("本当に削除しますか？")) return;
    const res = await fetch(`/api/food/${foodId}`, { method: "DELETE" });
    if (!res.ok) {
      alert("削除に失敗しました");
      return;
    }
    window.location.href = "/food";
  }

  return (
    <button onClick={handleDelete} className={styles.deleteButton}>
      <Trash2 size={16} />
      削除
    </button>
  )
}