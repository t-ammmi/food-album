import { getDetail,getFoods } from "@/libs/client";
import RatingStars from "@/src/components/RatingStars/RatingStars";

export async function generateStaticParams(){
  const { contents } = await getFoods();

  const paths = contents.map((food)=>{
    return {
      foodId: food.id,
    };
  });
  return [...paths];
}

export default async function StaticDetailPage({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = await params;
  const food = await getDetail(foodId);

  return(
    <main>
      <p>{food.type}</p>
      <h1>{food.title}</h1>
      <p>{food.date}</p>
      <RatingStars rating={food.rating} />
      {food.location && <p>{food.location}</p>}
      {food.review && <p>{food.review}</p>}
      {food.recipe && (
        <div dangerouslySetInnerHTML={{ __html: food.recipe }} />
      )}
    </main>
  )
}
