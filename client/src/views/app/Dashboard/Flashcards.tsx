import Loading from "@/components/ui/Loading";
import CreateFlashCardButton from "@/components/utilities/CreateFlashCardButton";
import { useGetFlashCardsByUser } from "@/core/hooks/useGetFlashCards";

const Flashcards = () => {
  const { loading, flashcards } = useGetFlashCardsByUser();

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
          No Flash cards found, create some :)
        </p>
        <CreateFlashCardButton />
      </div>
    );
  }
  return <div>{JSON.stringify(flashcards)}</div>;
};

export default Flashcards;
