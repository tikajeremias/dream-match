import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/Button";
import Subtitle from "@/components/Subtitle";

export default function Home() {
  return (
    <div className="h-auto bg-neutral-50 gap-2.5 lg:gap-2 backdrop-blur-sm bg-opacity-20 px-6 py-6 lg:px-16 lg:py-12 rounded-md flex flex-col justify-center items-center">
      <AppLogo />
      <Subtitle text="Create your perfect match game"/>
      <Button href="/teams" label="Create" variant={"default"} />
    </div>
  );
}
