import { useQuery } from "@tanstack/react-query";
import TopicModule from "../api/topic.module";

export const useGetTopicFlashCards = ({ topicId }: { topicId: string }) => {
  const {
    data: topic,
    isLoading: loading,
    isError: error,
  } = useQuery({
    queryFn: () => new TopicModule().topic.get_topic_flash_cards({ topicId }),
    queryKey: ["topic,", "cards", "user", "db"],
  });

  return { topic, loading, error };
};
