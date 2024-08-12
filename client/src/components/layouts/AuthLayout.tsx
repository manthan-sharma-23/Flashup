import { Outlet } from "react-router-dom";

import { Toaster } from "sonner";

const AuthLayout = () => {
  return (
    <div className="realtive bg-gradient-to-r from-pink-500 via-red-500  to-purple-500  from-purple-500 via-indigo-500 to-blue-500  bg-[length:400%_400%] animate-gradientMove text-white h-screen w-screen flex justify-center items-center">
      <Outlet />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default AuthLayout;
