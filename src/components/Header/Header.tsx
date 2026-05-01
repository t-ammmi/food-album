import { Utensils, Plus } from "lucide-react"
import styles from "./Header.module.scss"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs";
import FilterNav from "../FilterNav/FilterNav";
import SearchBox from "../SearchBox/SearchBox";

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
                    <SearchBox />
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
            <FilterNav />
        </header>
    )
}