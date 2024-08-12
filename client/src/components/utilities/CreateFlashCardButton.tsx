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
import { useCreateFlashCard } from "@/core/hooks/useCreateFlashCard.hook";
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

const CreateFlashCardButton = () => {
  const { loading, create_flashcard } = useCreateFlashCard();
  const [createFlashCardInput, setCreateFlashCardInput] = useState<
    Partial<FlashCardInput>
  >({});
  const { topics } = useGetTopicsByUser();

  const onCreateFlashCard = () => {
    if (
      createFlashCardInput.question &&
      createFlashCardInput.question.length > 2 &&
      createFlashCardInput.answer &&
      createFlashCardInput.answer.length > 2
    ) {
      const isTopic = createFlashCardInput.topicId!.length > 0;
      create_flashcard({
        question: createFlashCardInput.question,
        answer: createFlashCardInput.answer,
        topicId: createFlashCardInput.topicId,
        isTopic,
        color: createFlashCardInput.color!,
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
            <Button>Create flash card</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create flash card</DialogTitle>
            </DialogHeader>

            <div className="w-full h-auto flex flex-col justify-start items-start mt-2 gap-4">
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
                  type="text"
                  id="description"
                  placeholder="Flash card answer"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label className="mb-1">Select Topic</Label>
                <div className="w-full h-auto flex justify-between">
                  <Select
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
              <div className="w-full h-auto flex justify-start">
                <Button
                  disabled={loading}
                  onClick={onCreateFlashCard}
                  size={"sm"}
                >
                  Create flash card
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateFlashCardButton;
