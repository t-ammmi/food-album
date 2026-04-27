import { getDetail } from "@/libs/client";
import FoodForm from "@/src/components/FoodForm/FoodForm";

export default async function EditFoodPage({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = await params;
  const food = await getDetail(foodId);
  return <FoodForm mode="edit" defaultValues={food} />;
}
