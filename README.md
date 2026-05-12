# ごはんアルバム

食べた料理の写真・感想・評価を記録するポートフォリオアプリです。

🔗 **デモURL**：https://food-album.vercel.app/food
<!-- 例：![トップページ](./public/screenshot.png) -->
<img width="1468" height="832" alt="スクリーンショット 2026-05-12 14 26 39" src="https://github.com/user-attachments/assets/3aedb311-48eb-493a-a3f8-744438d77e14" />

#### ログイン時の新規作成・編集・削除の動作

https://github.com/user-attachments/assets/768a1c91-a20f-44f3-9e1f-493266175f35

---

## 作成の背景

いつどこで食べたご飯か、またどんなレシピだったかを忘れないように自分用のアルバムアプリを作成しました。

---

## 機能一覧

- 📷 ごはんの写真・タイトル・評価・感想・レシピを記録
- 🍳 外食 / 自炊のフィルタリング
- 🔍 キーワード検索
- ✏️ 投稿の作成・編集・削除
- 🔒 Clerk による認証（ログイン時のみ投稿・編集・削除が可能）
- 🖼️ モーダルで詳細を確認（Intercepting Routes）

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | SCSS Modules |
| CMS | microCMS |
| 認証 | Clerk |
| デプロイ | Vercel |

---

## 技術的なこだわり

### Intercepting Routes によるモーダル
一覧画面でカードをクリックすると URL を変えずにモーダルで詳細を表示し、直URLでアクセスすると通常の詳細ページを表示します。Next.js の Intercepting Routes と Parallel Routes を組み合わせて実装しています。

### Server Actions でセキュアなAPI通信
投稿の作成・編集処理は Server Actions で実装しています。microCMS の API キーはすべてサーバーサイドで扱われ、クライアントに露出しません。

### ISR と no-store の使い分け
一覧ページは ISR（Incremental Static Regeneration）でキャッシュし高速配信しています。詳細ページは編集後に最新データを表示するため `cache: "no-store"` を指定しています。

### Route Handler で削除処理を分離
削除処理は Server Action ではなく Route Handler で実装しています。Server Action の `redirect()` はクライアントから呼ぶとエラーが発生するため、削除後のナビゲーションをクライアント側（`window.location.href`）で制御する設計にしました。

---

## 画面構成

| 画面 | パス | 説明 |
|---|---|---|
| 一覧 | `/food` | ごはん一覧。フィルター・検索対応 |
| 詳細（モーダル） | `/food/[foodId]` | 一覧から遷移するとモーダル表示 |
| 詳細（ページ） | `/food/[foodId]` | 直URLでアクセスすると全画面表示 |
| 新規作成 | `/food/new` | 要ログイン |
| 編集 | `/food/[foodId]/edit` | 要ログイン |

---

## セットアップ

### 必要な環境変数

`.env.local` を作成し、以下を設定してください。

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
SERVICE_DOMAIN=        # microCMS のサービスドメイン
API_KEY=               # microCMS の API キー
```

### 起動方法

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
