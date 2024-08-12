import { useSetRecoilState } from "recoil";
import { DASHBOARD_FLASHCARDS } from "../store/atoms/flashcards.atom";
import { useMutation } from "@tanstack/react-query";
import FlashCardModule from "../api/flashcard.module";
import { toast } from "sonner";

export const useDeleteFlashCard = () => {
  const setFlashCards = useSetRecoilState(DASHBOARD_FLASHCARDS);
  const {
    mutate: delete_flashcard,
    isPending: loading,
    isError: error,
  } = useMutation({
    mutationFn: new FlashCardModule().flashCard.delete_flash_card,
    onSuccess: (data) => {
      setFlashCards((cards) => cards.filter((card) => card.id !== data.id));
      toast.success("Flash Card deleted successfully");
    },
    onError: (err: { response: { data: { message: string } } }) => {
      toast.error(err.response.data.message);
    },
  });

  return { delete_flashcard, loading, error };
};
