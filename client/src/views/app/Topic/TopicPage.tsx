import Loading from "@/components/ui/Loading";
import { useGetTopicFlashCards } from "@/core/hooks/useGetTopicFlashCards";
import { useParams } from "react-router-dom";
import FlashCardTile from "@/components/utilities/FlashCardTile";
import CreateFlashCardButton from "@/components/utilities/CreateFlashCardButton";
import RunCards from "@/components/utilities/RunCards";
import { useRecoilValue } from "recoil";
import { DASHBOARD_FLASHCARDS } from "@/core/store/atoms/flashcards.atom";

const TopicPage = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const { topicId } = useParams();
  const { topic, loading } = useGetTopicFlashCards({ topicId: topicId! });
  const flashcards = useRecoilValue(DASHBOARD_FLASHCARDS);

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
        <div className="flex gap-2 items-center justify-center">
          <RunCards cards={topic.flashcards} />
          {isAdmin && <CreateFlashCardButton />}
        </div>
      </div>
      <p className="mt-4">{topic.flashcards.length} Flashcards</p>
      <div className="mt-4 w-full flex flex-wrap justify-start items-start gap-2">
        {flashcards &&
          flashcards.map((fc) => {
            return <FlashCardTile key={fc.id} flashCard={fc} />;
          })}
      </div>
    </div>
  );
};

export default TopicPage;
