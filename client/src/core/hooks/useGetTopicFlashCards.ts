import { useQuery } from "@tanstack/react-query";
import TopicModule from "../api/topic.module";
import { useRecoilState } from "recoil";
import { DASHBOARD_FLASHCARDS } from "../store/atoms/flashcards.atom";
import { useEffect } from "react";

export const useGetTopicFlashCards = ({ topicId }: { topicId: string }) => {
  const [flashCards, setFlashCards] = useRecoilState(DASHBOARD_FLASHCARDS);

  const {
    data: topic,
    isLoading: loading,
    isError: error,
  } = useQuery({
    queryFn: () => new TopicModule().topic.get_topic_flash_cards({ topicId }),
    queryKey: ["topic", topicId],
    retryOnMount: true,
  });

  useEffect(() => {
    if (topic?.flashcards) {
      setFlashCards(topic.flashcards);
    }
  }, [topic, setFlashCards]);
  return { flashCards, topic, loading, error };
};
