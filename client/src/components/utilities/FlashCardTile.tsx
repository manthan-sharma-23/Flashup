import { colors } from "@/core/lib/constants/color";
import { Flashcard } from "@/core/lib/types/global.types";
import UpdateFlashCard from "./UpdateFlashCard";

const FlashCardTile = ({ flashCard }: { flashCard: Flashcard }) => {
  const color = colors.find((color) => color.light === flashCard.color)!;

  return (
    <div
      className="relative flex justify-center items-center w-[12rem] h-[15rem] text-white text-wrap p-3 text-2xl font-poppins font-semibold rounded-md overflow-hidden"
      style={{ backgroundColor: color.light }}
    >
      <UpdateFlashCard flashCard={flashCard} />
      {flashCard.question}
    </div>
  );
};

export default FlashCardTile;
