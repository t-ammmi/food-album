import Link from "next/link";
import { getFoods } from "@/libs/client";

export default async function StaticPage() {
    const { contents }  = await getFoods();
  
    if (!contents) {
      return <h1>No Contents</h1>;
    }
  
    return (
      <>
        <div>
            <ul>
                {contents.map((food) => (
                <li key={food.id}>
                    <Link href={`/food/${food.id}`}>{food.title}</Link>
                </li>
                ))}
            </ul>
        </div>
      </>
  );
}
