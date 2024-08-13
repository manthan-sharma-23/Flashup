import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { DASHBOARD_TOPICS } from "../store/atoms/topics.atom";
import TopicModule from "../api/topic.module";

export const useGetAllTopics = () => {
  const [topics, setTopics] = useRecoilState(DASHBOARD_TOPICS);
  const {
    data,
    isError: error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["topics/user/all", "get"],
    queryFn: () => new TopicModule().topic.get_all_topics(),
  });

  useEffect(() => {
    if (data) setTopics(data);
  }, [data, loading, error, setTopics]);

  return { topics, error, loading };
};
