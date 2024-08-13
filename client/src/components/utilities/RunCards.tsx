import { Flashcard } from "@/core/lib/types/global.types";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { colors } from "@/core/lib/constants/color";
import { FaRegBookmark } from "react-icons/fa";
import { ReactNode, useState } from "react";
import "@/styles/flip.css";
import { useBookMarkFlashCard } from "@/core/hooks/useAddBookMark";

const RunCards = ({ cards, rc }: { cards: Flashcard[]; rc?: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{rc || <Button>Play Cards</Button>}</DialogTrigger>
      <DialogContent className="bg-transparent border-0 shadow-none">
        <Carousel className="">
          <CarouselContent>
            {cards.map((card) => (
              <Card card={card} />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};
const Card = ({ card }: { card: Flashcard }) => {
  const color = colors.find((color) => card.color === color.light)!;
  const [front, setFront] = useState(true);
  const { bookmark } = useBookMarkFlashCard();

  return (
    <CarouselItem className="h-[60vh] w-[5vw] perspective-1000">
      <div
        className={`flip-container ${front ? "" : "flip"}`}
        onClick={() => setFront(!front)}
      >
        <div
          className="flip-card cursor-pointer"
          style={{ backgroundColor: color.light }}
        >
          <div className="h-full w-full flex flex-wrap items-center justify-start p-5">
            <p className="text-5xl font-poppins font-semibold ">
              {card.question}
            </p>
            <p className=" absolute mb-7 ml-7 left-0 bottom-0">
              Created by: {card.User.name}
            </p>
            <FaRegBookmark
              onClick={() => {
                bookmark({ flashCardId: card.id });
              }}
              className="absolute bottom-0 right-0 mb-7 mr-7 text-2xl cursor-pointer"
            />
          </div>
        </div>
        <div
          className="flip-card flip-card-back cursor-pointer"
          style={{ backgroundColor: color.dark }}
        >
          <div className="h-full w-full flex flex-wrap items-center justify-start p-5">
            <p className="text-5xl font-poppins font-semibold text-white">
              {card.answer}
            </p>
            <p className="text-white absolute mb-7 ml-7 left-0 bottom-0">
              Created by: {card.User.name}
            </p>
            <FaRegBookmark
              onClick={() => {
                bookmark({ flashCardId: card.id });
              }}
              className="absolute bottom-0 right-0 mb-7 mr-7 text-2xl cursor-pointer text-white"
            />
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};
export default RunCards;
