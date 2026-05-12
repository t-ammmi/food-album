"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, MapPin, BookOpen, ChevronLeft } from "lucide-react";
import styles from "./FoodForm.module.scss";
import type { FoodType, Food } from "@/src/types/food";
import { createFood } from "@/src/actions/createFood";
import { updateFood } from "@/src/actions/updateFood";

type Props = {
  mode: "create" | "edit";
  defaultValues?: Food;
};

export default function FoodForm({ mode, defaultValues }: Props) {
  const router = useRouter();
  // 自炊 or 外食
  const [type, setType] = useState<FoodType>(defaultValues?.type[0] ?? "自炊");
  // 評価（1〜5）
  const [rating, setRating] = useState(defaultValues?.rating ?? 5);
  // タグの入力管理
  const [tags, setTags] = useState<string[]>(defaultValues?.tags?.map((t) => t.tag) ?? []);
  const [tagInput, setTagInput] = useState("");
  const [tagInputVisible, setTagInputVisible] = useState(false);
  // バリデーションエラー
  const [error, setError] = useState<{ [key: string]: string }>({});
  // ローディング
  const [isLoading, setIsLoading] = useState(false);

  // タグ追加
  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
    setTagInputVisible(false);
  }

  // タグ削除
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  }

  // 写真プレビュー
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValues?.photo?.url ?? null);
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // バリデーション
    const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;
    const date = (e.currentTarget.elements.namedItem("date") as HTMLInputElement).value;

    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "料理名を入力してください";
    if (!date) newErrors.date = "日付を入力してください";
    if (!previewUrl) newErrors.photo = "写真を追加してください";
    // 種別・評価はデフォルト値があるので常に有効
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setError({});
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("type", type);
    formData.set("rating", String(rating));
    tags.forEach(tag => formData.append("tags", tag));
    if (mode === "edit" && defaultValues) {
      // 編集の場合はupdateFoodを呼び出す
      await updateFood(defaultValues.id, formData);
      window.location.href = `/food/${defaultValues.id}`;
    } else {
      // 新規作成の場合はcreateFoodを呼び出す
      await createFood(formData);
      window.location.href = "/food";
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {/* ヘッダー */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => router.push("/food")}>
          <ChevronLeft size={16} />
          戻る
        </button>
        <h1 className={styles.title}>
          {mode === "create" ? "新しいごはん" : "ごはんを編集"}
        </h1>
        <button className={styles.saveButton} type="submit" disabled={isLoading}>
          {isLoading ? "保存中..." : "保存"}
        </button>
      </div>
      <hr className={styles.divider} />
      {/* フォーム内容 */}
      <div className={styles.body}>
        {/* 写真 */}
        <div className={styles.section}>
          <div className={styles.imageUpload}>
            {previewUrl ? (
              <Image src={previewUrl} alt="プレビュー" fill className={styles.previewImage} />
            ) : (
              <>
                <Camera size={32} className={styles.cameraIcon} />
                <span>写真を追加</span>
              </>
            )}
            <input type="file" name="photo" accept="image/*" className={styles.fileInput} onChange={handlePhotoChange} />
          </div>
          {error.photo && <p className={styles.error}>{error.photo}</p>}
        </div>
        {/* 料理名 */}
        <div className={styles.section}>
          <label className={styles.label}>料理名</label>
          <input type="text" name="title" defaultValue={defaultValues?.title} className={styles.titleInput} />
          {error.title && <p className={styles.error}>{error.title}</p>}
        </div>
        {/* 種別 */}
        <div className={styles.section}>
          <label className={styles.label}>種別</label>
          <div className={styles.typeButtons}>
            <button
            type="button"
            className={`${styles.typeButton} ${type === "自炊" ? styles.active : ""}`}
            onClick={() => setType("自炊")}>
              自炊
            </button>
            <button
              type="button"
              className={`${styles.typeButton} ${type === "外食" ? styles.active : ""}`}
              onClick={() => setType("外食")}>
              外食
            </button>
          </div>
        </div>
        {/* 日付 */}
        <div className={styles.section}>
          <label className={styles.label}>日付</label>
          <input type="date" name="date" defaultValue={defaultValues?.date?.slice(0, 10)} className={styles.Input} />
          {error.date && <p className={styles.error}>{error.date}</p>}
        </div>
        {/* 場所 */}
        <div className={styles.section}>
          <label className={styles.label}>場所</label>
          <div className={styles.inputWithIcon}>
            <MapPin size={16} />
            <input type="text" name="location" defaultValue={defaultValues?.location} className={styles.Input} />
          </div>
        </div>
        {/* 評価 */}
        <div className={styles.section}>
          <label className={styles.label}>評価</label>
          <div className={styles.ratingInput}>
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                className={`${styles.starButton} ${i <= rating ? styles.active : ""}`}
                onClick={() => setRating(i)}>
                ★
              </button>
            ))}
          </div>
        </div>
        {/* 感想 */}
        <div className={styles.section}>
          <label className={styles.label}>感想・思い出</label>
          <textarea name="review" defaultValue={defaultValues?.review} className={styles.textarea}></textarea>
        </div>
        {/* レシピ */}
        {type === "自炊" && (
          <div className={styles.section}>
            <label className={styles.label}>
              <BookOpen size={14} />
              レシピ
            </label>
            <textarea name="recipe" defaultValue={defaultValues?.recipe?.replace(/<\/p>/g, "\n").replace(/<p>/g, "").replace(/<br>/g, "").trim()} className={styles.textarea}></textarea>
          </div>
        )}
        {/* タグ */}
        <div className={styles.section}>
          <label className={styles.label}>タグ</label>
          <div className={styles.tagList}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
                <button
                  type="button"
                  className={styles.removeTagButton}
                  onClick={() => removeTag(tag)}>
                  ×
                </button>
              </span>
            ))}
            {tagInputVisible ? (
              <input
                type="text"
                className={styles.tagInput}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); addTag();}
                  if (e.key === "Escape") setTagInputVisible(false);
                }}
                onBlur={addTag}
                autoFocus
                placeholder="タグ名"
              />
            ) : (
              <button
                type="button"
                className={styles.tagAddButton}
                onClick={() => setTagInputVisible(true)}
              >
                + タグを追加
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}