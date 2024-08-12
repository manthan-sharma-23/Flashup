import { filterDashboard } from "@/core/lib/types/user.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Topics from "./Topics";
import Flashcards from "./Flashcards";
import { twMerge } from "tailwind-merge";
import CreateFlashCardButton from "@/components/utilities/CreateFlashCardButton";
import CreateTopicButton from "@/components/utilities/CreateTopicButton";

const Dashboard = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const filter = params.get("filter") as filterDashboard;
  return (
    <div className="h-full w-full p-3 flex flex-col justify-center gap-3 items-center">
      <div className="w-full h-auto flex items-center justify-between pr-5">
        <div className="text-3xl font-poppins w-full flex items-end justify-start gap-3">
          <p className="font-medium mr-4">Dashboard</p>
          <p
            onClick={() => {
              const params = new URLSearchParams({ filter: "topics" });
              navigate(`/dashboard?${params}`);
            }}
            className={twMerge(
              "text-lg text-dark cursor-pointer hover:text-pink-500 mr-2",
              filter !== "flashcards" && "text-pink-500"
            )}
          >
            Topics
          </p>
          <p
            onClick={() => {
              const params = new URLSearchParams({ filter: "flashcards" });
              navigate(`/dashboard?${params}`);
            }}
            className={twMerge(
              "text-lg text-dark cursor-pointer hover:text-yellow-400",
              filter === "flashcards" && "text-yellow-400"
            )}
          >
            FlashCards
          </p>
        </div>
        <div>
          {filter === "flashcards" ? (
            <CreateFlashCardButton />
          ) : (
            <CreateTopicButton />
          )}
        </div>
      </div>
      <div className="h-[90vh] w-full">
        {filter === "flashcards" ? <Flashcards /> : <Topics />}
      </div>
    </div>
  );
};

export default Dashboard;
