"use server";
import { revalidatePath } from "next/cache";

export async function createFood(formData: FormData) {
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const rating = Number(formData.get("rating"));
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;
  const review = formData.get("review") as string;
  const recipe = formData.get("recipe") as string;
  const tags = formData.getAll("tags") as string[];
  const photo = formData.get("photo") as File | null;

  // 画像アップロード
  let photoField: string | undefined;
  if (photo && photo.size > 0) {
    const imageFormData = new FormData();
    imageFormData.append("file", photo);

    const uploadRes = await fetch(
      `https://${process.env.SERVICE_DOMAIN}.microcms-management.io/api/v1/media`,
      {
        method: "POST",
        headers: {
          "X-MICROCMS-API-KEY": process.env.API_KEY!,
        },
        body: imageFormData,
      }
    );

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      throw new Error(`画像のアップロードに失敗しました: ${uploadRes.status} ${errorText}`);
    }

    const { url } = await uploadRes.json();
    photoField = url;
  }

  const body: Record<string, unknown> = { title, type: [type], rating, date };
  if (location) body.location = location;
  if (review) body.review = review;
  if (recipe && type === "自炊") {
    body.recipe = recipe
      .split("\n")
      .map((line) => `<p>${line || "<br>"}</p>`)
      .join("");
  }
  if (tags.length > 0) body.tags = tags.map(tag => ({ fieldId: "tagList", tag }));
  if (photoField) body.photo = photoField;

  const res = await fetch(
    `https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/food`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MICROCMS-API-KEY": process.env.API_KEY!,
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`ごはんの登録に失敗しました: ${res.status} ${errorText}`);
  }

  revalidatePath("/food", "page");
}