import { useGetUser } from "@/core/hooks/useGetUser.hook";
import { Progress } from "@/components/ui/progress";
import { Link, Outlet, useLocation } from "react-router-dom";
import SideBar from "../utilities/SideBar";
import { Toaster } from "sonner";
import Loading from "../ui/Loading";

const RootLayout = () => {
  const { loading, error } = useGetUser();

  const token = window.localStorage.getItem("token");

  if (error || !token) {
    return (
      <div className="text-black bg-white h-screen w-screen flex justify-center items-center">
        <a href={"/auth/signin"} className="text-purple-600 text-xl underline">
          You are not auhtorized please signin{" "}
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loading />
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
