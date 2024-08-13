import { useMutation } from "@tanstack/react-query";
import FlashCardModule from "../api/flashcard.module";
import { toast } from "sonner";

export const useBookMarkFlashCard = () => {
  const {
    mutate: bookmark,
    isPending: loading,
    isError: error,
  } = useMutation({
    mutationFn: new FlashCardModule().flashCard.bookmark_flash_card,
    onSuccess: () => {
      toast.success("Flash Card bookmarked successfully");
    },
    onError: (err: { response: { data: { message: string } } }) => {
      toast.error(err.response.data.message);
    },
  });

  return { bookmark, loading, error };
};
