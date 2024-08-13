import { useQuery } from "@tanstack/react-query";
import FlashCardModule from "../api/flashcard.module";

export const useGetAllBookMarks = () => {
  const {
    data: bookmarks,
    isError: error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["flashcards/user/all", "get"],
    queryFn: () => new FlashCardModule().flashCard.get_all_bookmarks(),
  });

  return { bookmarks, error, loading };
};
