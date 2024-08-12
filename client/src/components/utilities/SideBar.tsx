import { UserAtom } from "@/core/store/atoms/user.atom";
import { useRecoilValue } from "recoil";
import { Separator } from "../ui/separator";

import { TbCardsFilled } from "react-icons/tb";
import { MdOutlineBookmarks, MdDashboard } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react-refresh/only-export-components
export const navlinks = [
  {
    icon: TbCardsFilled,
    label: "Explore",
    path: "/explore",
    color: "text-yellow-400",
  },
  {
    icon: MdDashboard,
    label: "Dashboard",
    path: "/dashboard",
    color: "text-pink-400",
  },
  {
    icon: MdOutlineBookmarks,
    label: "Bookmarks",
    path: "/bookmarks",
    color: "text-blue-400",
  },
  {
    icon: FaChartSimple,
    label: "Analysis",
    path: "/analysis",
    color: "text-green-400",
  },
];

const SideBar = () => {
  const user = useRecoilValue(UserAtom);
  const { pathname } = useLocation();

  return (
    <div className="h-full w-full flex flex-col justify-start items-center ">
      <p className=" h-[5%] w-full flex items-center justify-start px-3 font-medium text-xl">
        {user?.name}
      </p>
      <Separator />
      <div className="flex flex-col h-auto w-full justify-start items-center p-4 gap-2 text-[1rem]">
        {navlinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={twMerge(
              "w-full flex justify-start items-center gap-2 hover:bg-shade py-1 px-3 rounded-md",
              pathname === link.path && "bg-shade"
            )}
          >
            <link.icon className={twMerge("text-[1.1rem]", link.color)} />
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
