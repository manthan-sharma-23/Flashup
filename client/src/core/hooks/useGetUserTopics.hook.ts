import { useQuery } from "@tanstack/react-query";
import TopicModule from "../api/topic.module";

export const useGetTopicsByUser = () => {
  const {
    data: topics,
    isError: error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["topics/user", "get"],
    queryFn: () => new TopicModule().topic.get_topics(),
  });

  return { topics, error, loading };
};
