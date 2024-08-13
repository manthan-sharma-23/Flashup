import { colors } from "@/core/lib/constants/color";
import { Topic } from "@/core/lib/types/global.types";
import { twMerge } from "tailwind-merge";
import RunCards from "./RunCards";

const TopicTile = ({ topic }: { topic: Topic }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={twMerge(
        ` text-white flex flex-col items-start justify-end font-poppins h-[15rem]  w-[12rem] m-3 cursor-pointer rounded-xl p-3 overflow-hidden border-4 `
      )}
      style={{
        backgroundColor: randomColor.light,
        border: `3px solid ${randomColor.dark}`,
      }}
    >
      <p className="text-3xl font-semibold">{topic.name}</p>
      <p className="text-white/85 font-medium">{topic.description}</p>
      <p className="text-white/85 font-medium">
        {topic.flashcards.length} cards
      </p>
      <RunCards cards={topic.flashcards} rc={<Play />}></RunCards>
    </div>
  );
};

export const Play = () => {
  return <div className="mt-3 font-semibold underline text-xl">Play</div>;
};

export default TopicTile;
