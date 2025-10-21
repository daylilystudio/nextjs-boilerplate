import LangSwitcher from "@/components/LangSwitcher";
import { getTranslations } from 'next-intl/server';
import Auth from "@/components/Auth";
import { getAuthsMe } from "@/apis/auths";
import Image from "next/image";
import { getSheets } from "@/apis/sheets";

export default async function OnePage() {
  const t = await getTranslations();
  const profile =  await getAuthsMe('userProfile')
  const attributes = profile?.included[0]?.attributes || {};
  console.log('User Attributes:', attributes);

  const sheetId = '18JivT389qLCz8uB2GCRMneC_bYm-CvO0zbO0NtU6M7s';
  const data = await getSheets(sheetId, ['intro']) || {};
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <h2 className="font-bold opacity-40">Amplify {t('common.signin')} :</h2>
        {attributes && <p className="flex gap-3 items-center justify-center">
          {attributes?.avatar_path && <Image className="rounded-full" width={24} height={24} src={attributes?.avatar_path} alt={attributes?.nickname} />}
          {t('home.greet')} {attributes?.nickname} 
        </p>}
        <Auth path="one"/>
        <hr className="w-full border-top border-white my-2"/>
        <h2 className="font-bold opacity-40">Google Sheets Data :</h2>
        {<p>{data?.intro[0]?.highlight_title || ''}</p>}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <LangSwitcher />
      </footer>
    </div>
  );
}
