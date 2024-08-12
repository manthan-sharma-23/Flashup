import { useQuery } from "@tanstack/react-query";
import FlashCardModule from "../api/flashcard.module";

export const useGetFlashCardsByUser = () => {
  const {
    data: flashcards,
    isError: error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["flashcards/user", "get"],
    queryFn: () => new FlashCardModule().flashCard.get_flash_cards_by_user(),
  });

  return { flashcards, error, loading };
};
