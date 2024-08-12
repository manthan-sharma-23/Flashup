import Loading from "@/components/ui/Loading";
import { useGetTopicFlashCards } from "@/core/hooks/useGetTopicFlashCards";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TopicPage = () => {
  const { topicId } = useParams();
  const { topic, loading } = useGetTopicFlashCards({ topicId: topicId! });

  if (!topic) return <div>No Topic found</div>;

  if (loading) {
    return (
      <div className="h-full w-full border">
        <Loading color="secondary" />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col justify-start items-start p-4 px-8">
      <div className="flex justify-between items-center h-auto w-full">
        <div>
          <p className="font-poppins text-4xl font-semibold">{topic.name}</p>
          {topic.description && (
            <p className="text-lg text-black/65 tracking-wide">
              {topic.description}
            </p>
          )}
        </div>
        <Button>Run</Button>
      </div>
      <p className="mt-4">{topic.flashcards.length} Flashcards</p>
      <div>{}</div>
    </div>
  );
};

export default TopicPage;
