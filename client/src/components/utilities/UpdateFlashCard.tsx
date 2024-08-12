import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { FlashCardInput } from "@/core/lib/types/flashcard.types";
import { useState } from "react";
import { useGetTopicsByUser } from "@/core/hooks/useGetUserTopics.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colors } from "@/core/lib/constants/color";
import { twMerge } from "tailwind-merge";
import { PiPencilBold } from "react-icons/pi";
import { Flashcard } from "@/core/lib/types/global.types";
import { useUpdateFlashCard } from "@/core/hooks/useUpdateFlashCard.hook";
import { useDeleteFlashCard } from "@/core/hooks/useDeleteFlashCard";

const UpdateFlashCard = ({ flashCard }: { flashCard: Flashcard }) => {
  const { loading, update_flashcard } = useUpdateFlashCard();
  const [createFlashCardInput, setCreateFlashCardInput] =
    useState<Partial<FlashCardInput>>(flashCard);
  const { topics } = useGetTopicsByUser();
  const { delete_flashcard } = useDeleteFlashCard();

  const onCreateFlashCard = () => {
    if (
      createFlashCardInput.question &&
      createFlashCardInput.question.length > 2 &&
      createFlashCardInput.answer &&
      createFlashCardInput.answer.length > 2
    ) {
      const isTopic = createFlashCardInput.topicId!.length > 0;
      update_flashcard({
        flashCardId: flashCard.id,
        input: {
          question: createFlashCardInput.question,
          answer: createFlashCardInput.answer,
          topicId: createFlashCardInput.topicId,
          isTopic,
          color: createFlashCardInput.color!,
        },
      });
    } else {
      toast("Both question and answer must have more than 2 characters");
    }
  };

  return (
    <div>
      <div className="h-auto w-auto">
        <Dialog>
          <DialogTrigger>
            <PiPencilBold className="absolute z-10 top-0 right-0 mt-3 mr-3 rounded-full bg-white text-indigo-900 p-1 text-3xl cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update flash card</DialogTitle>
            </DialogHeader>

            <div className="w-full h-auto flex flex-col justify-start items-start mt-2 gap-4">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="name">Id</Label>
                <Input
                  disabled
                  onChange={(e) => {
                    setCreateFlashCardInput((v) => ({
                      ...v,
                      id: e.target.value,
                    }));
                  }}
                  value={createFlashCardInput.id}
                  type="text"
                  id="question"
                  placeholder="Flash card question"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="name">Question</Label>
                <Input
                  disabled={loading}
                  onChange={(e) => {
                    setCreateFlashCardInput((v) => ({
                      ...v,
                      question: e.target.value,
                    }));
                  }}
                  value={createFlashCardInput.question}
                  type="text"
                  id="question"
                  placeholder="Flash card question"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label
                  htmlFor="answer"
                  className="flex gap-2 items-center justify-start"
                >
                  <p>Answer</p>
                </Label>
                <Input
                  disabled={loading}
                  onChange={(e) => {
                    setCreateFlashCardInput((v) => ({
                      ...v,
                      answer: e.target.value,
                    }));
                  }}
                  value={createFlashCardInput.answer}
                  type="text"
                  id="description"
                  placeholder="Flash card answer"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label className="mb-1">Select Topic</Label>
                <div className="w-full h-auto flex justify-between">
                  <Select
                    disabled
                    onValueChange={(v) => {
                      setCreateFlashCardInput((value) => ({
                        ...value,
                        topicId: v,
                      }));
                    }}
                    value={createFlashCardInput.topicId || ""}
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Select Topic (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics &&
                        topics.map((topic) => {
                          return (
                            <SelectItem value={topic.id}>
                              {topic.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(v) => {
                      setCreateFlashCardInput((value) => ({
                        ...value,
                        color: v,
                      }));
                    }}
                    value={createFlashCardInput.color || ""}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem value={color.light}>
                          <div className="flex justify-start items-center gap-2">
                            <p
                              className={twMerge(
                                "rounded-full h-[15px] w-[15px]"
                              )}
                              style={{ backgroundColor: color.light }}
                            />
                            <p>{color.light}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="w-full h-auto flex justify-start items-center gap-3">
                <Button
                  disabled={loading}
                  onClick={onCreateFlashCard}
                  size={"sm"}
                >
                  Update flash card
                </Button>
                <Button
                  disabled={loading}
                  onClick={() =>
                    delete_flashcard({ flashCardId: flashCard.id })
                  }
                  size={"sm"}
                >
                  Delete flash card
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UpdateFlashCard;
