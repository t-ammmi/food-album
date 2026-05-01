"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import styles from "../Header/Header.module.scss";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") ?? "";
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (currentType) params.set("type", currentType);
    if (q) params.set("q", q);
    router.push(`/food?${params.toString()}`);
  };

  return (
    <div className={styles.searchBox}>
      <Search size={20} />
      <input
        type="text"
        placeholder="ごはんを探す"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
      />
    </div>
  );
}