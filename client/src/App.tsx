import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AuthLayout from "@/components/layouts/AuthLayout";
import Signup from "@/views/auth/Signup";
import Signin from "@/views/auth/Signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./components/layouts/RootLayout";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <div className="h-screen w-screen">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="/auth/signin" element={<Signin />} />
                <Route path="/auth/signup" element={<Signup />} />
              </Route>
              <Route path="/" element={<RootLayout />}></Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
};

export default App;
