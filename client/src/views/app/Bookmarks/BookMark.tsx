import Loading from "@/components/ui/Loading";
import FlashCardTile from "@/components/utilities/FlashCardTile";
import RunCards from "@/components/utilities/RunCards";
import { useGetAllBookMarks } from "@/core/hooks/useGetAllBookMarks";
import { Flashcard } from "@/core/lib/types/global.types";
import { useEffect, useState } from "react";

const BookMark = () => {
  const { bookmarks, loading } = useGetAllBookMarks();
  const [fc, setfc] = useState<Flashcard[]>([]);

  useEffect(() => {
    if (bookmarks) {
      setfc(bookmarks.map((bookmark) => bookmark.flashCard as Flashcard));
    }
  }, [bookmarks, loading]);

  if (loading) {
    return (
      <div className="h-full w-full p-4 flex  justify-start items-start">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-4 flex flex-col justify-start items-start">
      <p className="font-medium text-3xl font-poppins">Bookmarks</p>
      {bookmarks?.length === 0 ? (
        <p>No Current Bookmarks added</p>
      ) : (
        <div className="h-full w-full pt-6">
          <RunCards cards={fc} />
          <div className="w-full h-[80vh] overflow-y-scroll flex flex-wrap items-start justify-start mt-4 gap-3">
            {fc.map((card) => (
              <FlashCardTile flashCard={card} isAdmin={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookMark;
