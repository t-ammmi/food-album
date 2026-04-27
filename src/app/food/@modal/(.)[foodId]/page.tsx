import Image from "next/image";
import { BookOpen, Pencil, Trash2 } from "lucide-react";
import { getDetail } from "@/libs/client";
import RatingStars from "@/src/components/RatingStars/RatingStars";
import ModalCloseButton from "@/src/components/ModalCloseButton/ModalCloseButton";
import { formatDate } from "@/src/libs/formatDate";
import styles from "./page.module.scss";
import ModalOverlay from "@/src/components/ModalOverlay/ModalOverlay";

export default async function FoodModal({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = await params;
  if (foodId === "new") return null;
  const food = await getDetail(foodId);

  return (
    <ModalOverlay>
      <div className={styles.closeButton}>
        <ModalCloseButton />
      </div>
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
          <span>{food.location ?? "ー"}</span>
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
            <div
              className={styles.recipeContent}
              dangerouslySetInnerHTML={{ __html: food.recipe }}
            />
          </div>
        )}
        <hr className={styles.divider} />
        {/* フッター */}
        <div className={styles.footer}>
          <div className={styles.tags}>
            {food.tags?.map((tag) => (
              <span key={tag.tag} className={styles.tag}>#{tag.tag}</span>
            ))}
          </div>
          <div className={styles.actions}>
            <a href={`/food/${food.id}/edit`} className={styles.editButton}>
              <Pencil size={14} />
              編集
            </a>
            <button className={styles.deleteButton}>
              <Trash2 size={14} />
              削除
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}