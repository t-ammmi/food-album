import Image from "next/image";
import Link from "next/link";
import type { Food } from "@/src/types/food";
import styles from "./FoodCard.module.scss";
import { formatDate } from "@/src/libs/formatDate";

type Props = {
    food: Food;
}

export default function FoodCard({ food }: Props) {
    console.log(food);
    return(
        <Link href={`/food/${food.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <span className={styles.badge}>{food.type}</span>
                <Image
                    src={food.photo.url}
                    alt={food.title}
                    fill
                    className={styles.image}
                />
            </div>
            <div className={styles.info}>
                <span className={styles.date}>{formatDate(food.date)}</span>
                <span className={styles.rating}>{food.rating}★</span>
                <h2 className={styles.title}>{food.title}</h2>
            </div>
        </Link>
    )
}