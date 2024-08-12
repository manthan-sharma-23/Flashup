import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCreateTopic } from "@/core/hooks/useCreateTopic.hook";
import { useState } from "react";
import { TopicInput } from "@/core/lib/types/topic.type";
import { toast } from "sonner";

const CreateTopicButton = () => {
  const { loading, create_topic } = useCreateTopic();
  const [createTopicInput, setCreateTopicInput] = useState<Partial<TopicInput>>(
    {}
  );

  const onCreateTopic = () => {
    if (createTopicInput.name && createTopicInput.name.length > 2) {
      create_topic({
        name: createTopicInput.name,
        description: createTopicInput.description,
      });
    } else {
      toast.error("Topic name must be atleast 2 characters");
    }
  };

  return (
    <div>
      <div className="h-auto w-auto">
        <Dialog>
          <DialogTrigger>
            <Button>Create Topic</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Topic</DialogTitle>
            </DialogHeader>

            <div className="w-full h-auto flex flex-col justify-start items-start mt-2 gap-4">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="name">Topic name</Label>
                <Input
                  disabled={loading}
                  onChange={(e) => {
                    setCreateTopicInput((v) => ({
                      ...v,
                      name: e.target.value,
                    }));
                  }}
                  type="text"
                  id="name"
                  placeholder="Topic name"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label
                  htmlFor="description"
                  className="flex gap-2 items-center justify-start"
                >
                  <p>Topic description</p>
                  <p className="text-black/60 text-sm">(optional)</p>
                </Label>
                <Input
                  disabled={loading}
                  onChange={(e) => {
                    setCreateTopicInput((v) => ({
                      ...v,
                      description: e.target.value,
                    }));
                  }}
                  type="text"
                  id="description"
                  placeholder="Topic description"
                />
              </div>
              <div className="w-full h-auto flex justify-start">
                <Button disabled={loading} onClick={onCreateTopic} size={"sm"}>
                  Create Topic
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateTopicButton;
