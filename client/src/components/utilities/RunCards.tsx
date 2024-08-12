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
import { useState } from "react";
import "@/styles/flip.css";

const RunCards = ({ cards }: { cards: Flashcard[] }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Play Cards</Button>
      </DialogTrigger>
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
            <FaRegBookmark className="absolute bottom-0 right-0 mb-7 mr-7 text-2xl cursor-pointer" />
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
            <FaRegBookmark className="absolute bottom-0 right-0 mb-7 mr-7 text-2xl cursor-pointer text-white" />
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};
export default RunCards;
