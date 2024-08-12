import { useSetRecoilState } from "recoil";
import { DASHBOARD_FLASHCARDS } from "../store/atoms/flashcards.atom";
import { useMutation } from "@tanstack/react-query";
import FlashCardModule from "../api/flashcard.module";
import { toast } from "sonner";

export const useCreateFlashCard = () => {
  const setFlashCards = useSetRecoilState(DASHBOARD_FLASHCARDS);
  const {
    mutate: create_flashcard,
    isPending: loading,
    isError: error,
  } = useMutation({
    mutationFn: new FlashCardModule().flashCard.create_flash_card,
    onSuccess: (data) => {
      toast.success("Flash Card created successfully");
      setFlashCards((v) => [data, ...v]);
    },
    onError: (err: { response: { data: { message: string } } }) => {
      toast.error(err.response.data.message);
    },
  });

  return { create_flashcard, loading, error };
};
