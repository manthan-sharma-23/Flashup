import { useGetUser } from "@/core/hooks/useGetUser.hook";
import { Progress } from "@/components/ui/progress";
import { Outlet } from "react-router-dom";
import SideBar from "../utilities/SideBar";
import { Toaster } from "sonner";

const RootLayout = () => {
  const { loading } = useGetUser();

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center p-[30%] ">
        <Progress value={35} />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white text-black overflow-hidden flex justify-center items-center">
      <nav className="h-full w-[20%] border">
        <SideBar />
      </nav>
      <section className="h-full w-[80%]">
        <Outlet />
      </section>
      <Toaster />
    </div>
  );
};

export default RootLayout;
