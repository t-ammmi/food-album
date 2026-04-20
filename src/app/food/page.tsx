import Link from "next/link";
import { getFoods } from "@/libs/client";

export default async function FoodListPage() {
  const { contents } = await getFoods();

  return (
    <main>
      <h1>ご飯アルバム</h1>
      <ul>
        {contents.map((food) => (
          <li key={food.id}>
            <Link href={`/food/${food.id}`}>
              <p>{food.title}</p>
              <p>{food.type}</p>
              <p>{food.date}</p>
              <p>{food.rating}星</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}