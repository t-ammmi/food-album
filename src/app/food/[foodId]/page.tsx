import { getDetail,getFoods } from "@/libs/client";
import RatingStars from "@/src/components/RatingStars/RatingStars";
import Image from "next/image";
import { BookOpen, Pencil } from "lucide-react";
import { formatDate } from "@/src/libs/formatDate";
import styles from "./page.module.scss";
import DeleteButton from "@/src/components/DeleteButton/DeleteButton";
import { auth } from "@clerk/nextjs/server";

export async function generateStaticParams(){
  const { contents } = await getFoods();

  return contents.map((food)=>{
    return {
      foodId: food.id,
    };
  });
}

export default async function StaticDetailPage({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = await params;
  const food = await getDetail(foodId);
  const { userId } = await auth();
  const isLoggedIn = !!userId;

  return(
    <div className={styles.layout}>
      {/* 左：写真 */}
      <div className={styles.imageArea}>
        <Image
          src={food.photo.url}
          alt={food.title}
          fill
          className={styles.image}
        />
      </div>
      {/* 右：詳細 */}
      <div className={styles.detail}>
        {/* ヘッダー */}
        <div className={styles.detailHeader}>
          <div className={styles.headerRow}>
            <span className={styles.badge}>{food.type}</span>
            <span className={styles.date}>{formatDate(food.date)}</span>
          </div>
          <h1 className={styles.title}>{food.title}</h1>
        </div>
        <hr className={styles.divider} />
        {/* 場所・評価 */}
        <div className={styles.infoRow}>
          <span className={styles.label}>場所</span>
          <span>{food.location ?? " - "}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>評価</span>
          <RatingStars rating={food.rating} />
        </div>
        {/* 感想 */}
        {food.review && <p className={styles.review}>{food.review}</p>}
        {/* レシピ */}
        {food.recipe && (
          <div className={styles.recipe}>
            <hr className={styles.divider} />
            <p className={styles.recipeTitle}>
              <BookOpen size={16} />
              レシピ
            </p>
            <div className={styles.recipeContent} dangerouslySetInnerHTML={{ __html: food.recipe }} />
          </div>
        )}
        <hr className={styles.divider} />
        {/* フッター */}
        <div className={styles.footer}>
          <div className={styles.tags}>
            {food.tags?.map((tag) => (
              <span key={tag.tag} className={styles.tag}># {tag.tag}</span>
            ))}
          </div>
          <div className={styles.actions}>
            {isLoggedIn && (
              <>
                <a href={`/food/${food.id}/edit`} className={styles.editButton}>
                  <Pencil size={16} />
                  編集
                </a>
                <DeleteButton foodId={food.id} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
