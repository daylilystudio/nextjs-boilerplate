# Next.js 模板

## 🛠️ 主要功能 (Features)

- **框架:** [Next.js](https://nextjs.org/) 16+ (App Router + Cache Components)
- **國際化 (i18n):** 使用 [`next-intl`](https://next-intl-docs.vercel.app/) 進行路由、翻譯和本地化處理。
- **身份驗證:** 使用 [`next-auth`](https://next-auth.js.org/) 進行 Google 登入。
- **ORM:** 使用 Prisma 操作 Postgres 資料庫 (可輕鬆整合 Vercel Postgres)。
- **SEO 優化:**
  - 自動生成 `sitemap.xml`。
  - 自動生成 `robots.txt`。
- **圖片優化:** 配置 Next.js Image 元件以使用外部圖片來源 (例如 Google 頭像)。
- **程式碼風格:** 搭配 ESLint, Prettier extensions 即可儲存時自動格式化。

&nbsp;  
&nbsp;

## 🚀 快速開始 (Getting Started)

### 1. 環境準備

- Node.js (建議版本 18.x 或更高)
- `npm`

### 2. 安裝

```bash
# 安裝依賴
npm ci
```

### 3. 環境變數設定

在專案根目錄下建立一個 `.env.local` 檔案，並填入以下變數：

```env
# 資料庫設定
PRISMA_DATABASE_URL=
DATABASE_URL=

# Google 登入
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Next auth 設定
# 使用 openssl rand -base64 32 指令產生 NEXTAUTH_SECRET
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Google 表單設定
GOOGLE_FORM_ID=
GOOGLE_FORM_NAME=
GOOGLE_FORM_EMAIL=
GOOGLE_FORM_MESSAGE=
```

### 4. generate prisma client

```bash
npx prisma generate
```

### 5. 啟動開發伺服器

```bash
npm run dev
```

打開瀏覽器並訪問 `http://localhost:3000`。

&nbsp;  
&nbsp;

## 📁 專案結構

```
/
├── src/
│   ├── app/                # Next.js App Router 頁面、路由和佈局
│   │   ├── api/            # API 路由
│   │   ├── [locale]/       # 多語系頁面
│   │   ├── robots.ts       # 生成 robots.txt
│   │   └── sitemap.ts      # 生成 sitemap.xml
│   ├── i18n/               # next-intl 設定
│   │   ├── navigation.ts   # 本地化導航 (Link, useRouter)
│   │   ├── request.ts      # 伺服器端 i18n 配置
│   │   └── routing.ts      # 路由和多國語言設定
│   ├── messages/           # 翻譯檔案 (JSON)
│   │   ├── en/
│   │   └── zh-TW/
│   ├── lib/                # auth 登入設定
│   └── middleware.ts       # Next.js 中介軟體 (處理 i18n 路由)
├── next.config.ts          # Next.js 主要設定檔
└── README.md
```

&nbsp;  
&nbsp;

## 📚 核心概念

### 國際化 (i18n)

本模板使用 `next-intl` 進行國際化。

- **支援語系:** 在 `src/i18n/routing.ts` 的 `locales` 陣列中定義，預設為 `['zh-TW', 'en']`。
- **新增翻譯:**
  1.  在 `src/messages/` 下為您的語言建立一個資料夾 (例如 `jp`)。
  2.  在該資料夾中建立 `.json` 檔案 (例如 `common.json`)。
  3.  在 `src/i18n/routing.ts` 中加入新的 locale。
- **使用翻譯:** 在元件中使用 `getTranslations`(server), `useTranslations`(client) 來獲取翻譯文本。

### 路由與連結 (Routing & Links)

所有路由相關功能請優先使用 `@/i18n/navigation` 提供的工具，以確保多語言功能正常運作。

- **頁面跳轉 (Router):**
  - **Client:** 請使用 `useProgressRouter` hook (取代 `useRouter`)，以確保在跳轉時顯示 Loading 條。
- **連結 (Link):**
  - **Server:** 使用Cache components時，目前此套件會有`Hydration Mismatch` 問題，故server端先使用 `next/link`，待next-intl 更新後再看看。
  - **Client:** 請使用 `import { Link } from '@/i18n/navigation'`。
- **重定向 (Redirect):**
  - **Client/Server:** 請使用 `import { redirect } from '@/i18n/navigation'`。它會自動處理語言前綴。
- **取得路徑 (Pathname):**
  - **Client Only:** 請使用 `import { usePathname } from '@/i18n/navigation'`。它會回傳**不含語言前綴**的路徑 (例如 `/en/about` 會回傳 `/about`)。

### 身份驗證 (Authentication)

- 身份驗證流程由 `next-auth` 處理，設定檔通常位於 `src/lib/auth.ts` 或 API 路由中。
- 本模板預設整合 **Google Provider**。您需要在 Google Cloud Console 中建立 OAuth 2.0 憑證，並將 Client ID 和 Client Secret 加入 `.env.local` 檔案。
- 使用者資料透過 Prisma Adapter 儲存於 Postgres 資料庫中。

### 資料庫 (Database)

- 使用 Prisma 作為 ORM，方便進行資料庫的操作、遷移和類型生成。
- 資料庫模型定義在 `prisma/schema.prisma` 檔案中。
- 如有修改 `schema.prisma` 後，執行 `npx prisma migrate dev --name "修改內容描述"` 建立資料庫遷移檔案並更新資料庫結構，並執行 `npx prisma generate` 來更新 Prisma Client。

### Modal

使用 `useModal` Hook 來控制 Modal 的開啟/關閉狀態：

```tsx
// 基本用法
const { isOpen, open, close, toggle } = useModal();

// 如果需要與 URL 同步（可分享連結），傳入 searchParamName
const { isOpen, open, close, toggle } = useModal('contact');
```

**範例：**

```tsx
function ContactModal() {
  const modal = useModal('contact'); // 傳入 'contact' 會同步 URL 參數
  return (
    <>
      <button onClick={modal.open}>聯絡我們</button>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        searchParamName="contact" // 需要與 useModal 參數一致
      >
        {/* Modal 內容 */}
      </Modal>
    </>
  );
}
```

當使用者訪問 `?modal=contact` 時，Modal 會自動開啟。

### 寄信表單

- 串接 Google 表單當資料庫，寄送後可在 Google 表單中查看。

&nbsp;  
&nbsp;

## 🚢 部署 (Deployment)

使用 Vercel 進行部署，連結專案後使用 `git push` 即可自動部署
