import { getFoods } from "@/libs/client";
import FoodCard from "@/src/components/FoodCard/FoodCard";
import styles from "./page.module.scss";

export default async function FoodListPage() {
  const { contents } = await getFoods();

  return (
    <main className={styles.main}>
      <ul className={styles.foodList}>
        {contents.map((food) => (
          <li key={food.id}>
            <FoodCard food={food} />
          </li>
        ))}
      </ul>
    </main>
  );
}