"use client";

import { useRouter } from "next/navigation";
import styles from "./ModalOverlay.module.scss";

export default function ModalOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className={styles.overlay} onClick={() => router.back()}>
      {/* モーダル内のクリックは閉じない */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}