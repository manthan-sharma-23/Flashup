import Loading from "@/components/ui/Loading";
import TopicTile from "@/components/utilities/TopicTile";
import { useGetAllTopics } from "@/core/hooks/useGetAllTopics";

const ExploreTopics = () => {
  const { topics, loading } = useGetAllTopics();

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
      </div>
    );
  }
  return (
    <div className="overflow-y-scroll flex flex-wrap h-full w-full justify-start items-start gap-2">
      {topics.map((topic) => (
        <TopicTile topic={topic} />
      ))}
    </div>
  );
};

export default ExploreTopics;
