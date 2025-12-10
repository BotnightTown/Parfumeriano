'use client'

import Carousel from "@/components/Carousel/Carousel";
import List from "@/components/List/List";
import NewsBanner from "@/components/NewsBanner";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="w-full min-h-full h-max px-0 md:px-10 lg:px-20 flex flex-col md:gap-10">
      <Carousel />
      <List title={t.salesOnThisWeek} brand="all" onlySale={true}/>
      <List title={t.new} isNew={true}/>
      {/* <div className="w-full h-max px-7 md:px-0 flex flex-col md:flex-row gap-3">
        <NewsBanner />
        <NewsBanner />
      </div> */}
      <List title={t.femaleAroma} gender="Woman"/>
      <List title={t.maleAroma} gender="Man"/>
    </main>
  );
}
