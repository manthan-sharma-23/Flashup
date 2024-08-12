import { useQuery } from "@tanstack/react-query";
import FlashCardModule from "../api/flashcard.module";
import { useRecoilState } from "recoil";
import { DASHBOARD_FLASHCARDS } from "../store/atoms/flashcards.atom";
import { useEffect } from "react";

export const useGetFlashCardsByUser = () => {
  const [flashcards, setFlashCards] = useRecoilState(DASHBOARD_FLASHCARDS);
  const {
    data,
    isError: error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["flashcards/user", "get"],
    queryFn: () => new FlashCardModule().flashCard.get_flash_cards_by_user(),
  });

  useEffect(() => {
    if (data) setFlashCards(data);
  }, [data, loading, error, setFlashCards]);

  return { flashcards, error, loading };
};
