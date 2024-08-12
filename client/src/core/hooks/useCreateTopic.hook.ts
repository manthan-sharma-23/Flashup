import { useMutation } from "@tanstack/react-query";
import TopicModule from "../api/topic.module";
import { toast } from "sonner";
import { useSetRecoilState } from "recoil";
import { DASHBOARD_TOPICS } from "../store/atoms/topics.atom";

export const useCreateTopic = () => {
  const setTopics = useSetRecoilState(DASHBOARD_TOPICS);
  const {
    mutate: create_topic,
    isPending: loading,
    isError: error,
  } = useMutation({
    mutationFn: new TopicModule().topic.create_topic,
    onSuccess: (data) => {
      toast.success("Topic created successfully");
      setTopics((v) => [data, ...v]);
    },
    onError: (err: { response: { data: { message: string } } }) => {
      toast.error(err.response.data.message);
    },
  });

  return { create_topic, loading, error };
};
