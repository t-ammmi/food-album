import { getDetail,getFoods } from "@/libs/client";
import Link from "next/link"

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
    <>
        <p>{food.title}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${food.body}`,
          }}
        />
    </>
  )
}
