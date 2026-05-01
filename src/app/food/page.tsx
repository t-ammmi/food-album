import { getFoods } from "@/libs/client";
import FoodCard from "@/src/components/FoodCard/FoodCard";
import styles from "./page.module.scss";

export default async function FoodListPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const { type, q } = await searchParams;
  const { contents } = await getFoods({ type, q });

  return (
    <main className={styles.main}>
      {contents.length === 0 ? (
        <p className={styles.empty}>ごはんが見つかりませんでした。</p>
      ) : (
        <ul className={styles.foodList}>
          {contents.map((food) => (
            <li key={food.id}>
              <FoodCard food={food} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}