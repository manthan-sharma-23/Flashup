import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AuthLayout from "@/components/layouts/AuthLayout";
import Signup from "@/views/auth/Signup";
import Signin from "@/views/auth/Signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./components/layouts/RootLayout";
import Dashboard from "./views/app/Dashboard/Dashboard";
import Explore from "./views/app/Explore/Explore";
import TopicPage from "./views/app/Topic/TopicPage";

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
              <Route path="/" element={<RootLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/topic/:topicId"
                  element={<TopicPage isAdmin={true} />}
                />
                <Route path="/explore" element={<Explore />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
};

export default App;
