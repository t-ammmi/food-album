"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import styles from "./ModalCloseButton.module.scss";

export default function ModalCloseButton() {
    const router = useRouter();

    return (
        <button className={styles.button} onClick={() => router.back()}>
            <X size={20} />
        </button>
    )
}