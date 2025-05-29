import { ListUser } from "@/components/ListUser";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="h-screen lg:px-96">
      <Navbar />
      <ListUser />
    </div>
  );
}
