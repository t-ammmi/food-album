import { Utensils, Search, Plus } from "lucide-react"
import styles from "./Header.module.scss"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs";

export default async function Header() {
    // ユーザーのログイン状態を取得
    const { userId } = await auth();
    const isLoggedIn = !!userId;

    return (
        <header className={styles.header}>
            <div className={styles.headerTop}>
                <Link href="/food" className={styles.logo}>
                    <Utensils size={20} />
                    ごはんアルバム
                </Link>
                <div className={styles.searchBox}>
                    <Search size={20} />
                    <input type="text" placeholder="ごはんを探す" />
                </div>
                <div className={styles.authArea}>
                    {isLoggedIn ? (
                        <>
                            <a href="/food/new" className={styles.recordButton}>
                                <Plus size={20} />
                                記録する
                            </a>
                            <UserButton />
                        </>
                    ) : (
                        <Link href="/sign-in" className={styles.recordButton}>
                            <Plus size={20} />
                            ログイン
                        </Link>
                    )}
                </div>
            </div>
            <nav className={styles.filterNav}>
                <button className={`${styles.filterButton} ${styles.active}`}>すべて</button>
                <button className={styles.filterButton}>自炊</button>
                <button className={styles.filterButton}>外食</button>
            </nav>
        </header>
    )
}