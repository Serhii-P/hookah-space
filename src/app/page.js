import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
export default function Home() {
  return (
    <>
      <div className="h-10 w-full bg-stone-900 hidden lg:block"></div>
      <Hero />
      <HomeMenu />
    </>
  );
}
