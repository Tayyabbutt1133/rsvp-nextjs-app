import { Button } from "@/components/ui/button";
import RsvpForm from "./_components/RsvpForm";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className="flex justify-end px-10 py-4">
        <Link href={'/login'}>
        <Button className={'cursor-pointer'}>
          Admin Login
          </Button>
          </Link>
    </div>
      <RsvpForm/>
    </>
  );
}
