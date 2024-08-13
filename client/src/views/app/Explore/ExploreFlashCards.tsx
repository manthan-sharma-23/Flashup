import Loading from "@/components/ui/Loading";
import FlashCardTile from "@/components/utilities/FlashCardTile";
import RunCards from "@/components/utilities/RunCards";
import { useGetAllFlashCards } from "@/core/hooks/useGetAllFlashCards";

const ExploreFlashCards = () => {
  const { flashcards, loading } = useGetAllFlashCards();

  if (loading) {
    return (
      <div className="h-full w-full border">
        <Loading color="secondary" />
      </div>
    );
  }

  if (flashcards && flashcards.length === 0) {
    return (
      <div className="h-full w-full flex-col gap-2 flex justify-center items-center">
        <p className="font-poppins text-black/60 text-xl">
          No Flash Cards found, create some :)
        </p>
      </div>
    );
  }
  return (
    <div className="">
      <div>
        <RunCards cards={flashcards} />
      </div>
      <div className="overflow-y-scroll mt-4 flex justify-start items-start flex-wrap gap-3 h-[75vh]">
        {flashcards.map((card) => (
          <FlashCardTile flashCard={card} />
        ))}
      </div>
    </div>
  );
};

export default ExploreFlashCards;
