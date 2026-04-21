import { Utensils, Search, Plus } from "lucide-react"
import styles from "./Header.module.scss"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerTop}>
                <p className={styles.logo}>
                    <Utensils size={20} />
                    ごはんアルバム
                </p>
                <div className={styles.searchBox}>
                    <Search size={20} />
                    <input type="text" placeholder="ごはんを探す" />
                </div>
                <button className={styles.recordButton}>
                    <Plus size={20} />
                    記録する
                </button>
            </div>
            <nav className={styles.filterNav}>
                <button className={`${styles.filterButton} ${styles.active}`}>すべて</button>
                <button className={styles.filterButton}>自炊</button>
                <button className={styles.filterButton}>外食</button>
            </nav>
        </header>
    )
}