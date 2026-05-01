import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ foodId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { foodId } = await params;

  const res = await fetch(
    `https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/food/${foodId}`,
    {
      method: "DELETE",
      headers: {
        "X-MICROCMS-API-KEY": process.env.API_KEY!,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json({ error: errorText }, { status: res.status });
  }

  revalidatePath("/food", "page");
  return NextResponse.json({ success: true });
}