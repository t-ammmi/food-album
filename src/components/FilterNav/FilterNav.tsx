"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "../Header/Header.module.scss";

export default function FilterNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") ?? "";
  const currentQ = searchParams.get("q") ?? "";

  const updateType = (type: string) => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (currentQ) params.set("q", currentQ);
    router.push(`/food?${params.toString()}`);
  };

  return (
    <nav className={styles.filterNav}>
      {["", "外食", "自炊"].map((type) => (
        <button
          key={type}
          className={`${styles.filterButton} ${currentType === type ? styles.active : ""}`}
          onClick={() => updateType(type)}
        >
          {type || "すべて"}
        </button>
      ))}
    </nav>
  );
}