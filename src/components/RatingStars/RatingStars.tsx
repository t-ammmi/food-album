import { Star } from "lucide-react";
import styles from "./RatingStars.module.scss";

type Props = {
    rating: number;
};

export default function RatingStars({ rating }: Props) {
    return (
        // ratingの数だけ星を塗りつぶす
        <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={i <= rating ? styles.filled : styles.empty}
                />
            ))}
        </div>
    )
}
