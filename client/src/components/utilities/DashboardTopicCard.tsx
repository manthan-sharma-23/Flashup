import { colors } from "@/core/lib/constants/color";
import { Topic } from "@/core/lib/types/global.types";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const DashboardTopicCard = ({ topic }: { topic: Topic }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/dashboard/topic/${topic.id}`);
      }}
      className={twMerge(
        ` text-white flex flex-col items-start justify-end font-poppins h-[15rem]  w-[12rem] m-3 hover:scale-105 duration-150 cursor-pointer rounded-xl p-3 overflow-hidden border-4 `
      )}
      style={{
        backgroundColor: randomColor.light,
        border: `3px solid ${randomColor.dark}`,
      }}
    >
      <p className="text-3xl font-semibold">{topic.name}</p>
      <p className="text-white/70">{topic.description}</p>
    </div>
  );
};

export default DashboardTopicCard;
