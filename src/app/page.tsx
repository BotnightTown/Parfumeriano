import Carousel from "@/components/Carousel/Carousel";
import List from "@/components/List/List";
import NewsBanner from "@/components/NewsBanner";

export default function Home() {
  return (
    <main className="w-full min-h-full h-max px-0 md:px-10 lg:px-20 flex flex-col md:gap-10">
      <Carousel />
      <List title="Акції на цьому тижні"/>
      <List title="Новинки"/>
      <div className="w-full h-max px-7 md:px-0 flex flex-col md:flex-row gap-3">
        <NewsBanner />
        <NewsBanner />
      </div>
      <List title="Популярні аромати"/>
    </main>
  );
}
