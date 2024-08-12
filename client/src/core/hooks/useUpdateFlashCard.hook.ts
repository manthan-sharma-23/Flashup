import { useSetRecoilState } from "recoil";
import { DASHBOARD_FLASHCARDS } from "../store/atoms/flashcards.atom";
import { useMutation } from "@tanstack/react-query";
import FlashCardModule from "../api/flashcard.module";
import { toast } from "sonner";

export const useUpdateFlashCard = () => {
  const setFlashCards = useSetRecoilState(DASHBOARD_FLASHCARDS);
  const {
    mutate: update_flashcard,
    
    isPending: loading,
    isError: error,
  } = useMutation({
    mutationFn: new FlashCardModule().flashCard.update_flash_card,
    onSuccess: (data) => {
      toast.success("Flash Card updated successfully");

      setFlashCards((cards) =>
        cards.map((card) => (card.id === data.id ? { ...card, ...data } : card))
      );
    },
    onError: (err: { response: { data: { message: string } } }) => {
      toast.error(err.response.data.message);
    },
  });

  return { update_flashcard, loading, error };
};
