import Loading from "@/components/ui/Loading";
import CreateTopicButton from "@/components/utilities/CreateTopicButton";
import DashboardTopicCard from "@/components/utilities/DashboardTopicCard";
import { useGetTopicsByUser } from "@/core/hooks/useGetUserTopics.hook";

const Topics = () => {
  const { topics, loading } = useGetTopicsByUser();

  if (loading) {
    return (
      <div className="h-full w-full border">
        <Loading color="secondary" />
      </div>
    );
  }

  if (topics && topics.length === 0) {
    return (
      <div className="h-full w-full flex-col gap-2 flex justify-center items-center">
        <p className="font-poppins text-black/60 text-xl">
          No Topics found, create some :)
        </p>
        <CreateTopicButton />
      </div>
    );
  }
  return (
    <div className="h-full w-full flex justify-start items-start flex-wrap gap-2">
      {topics &&
        topics.map((topic) => (
          <DashboardTopicCard key={topic.id} topic={topic} />
        ))}
    </div>
  );
};

export default Topics;
