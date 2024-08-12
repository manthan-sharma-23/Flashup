import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateFlashCardButton = () => {
  return (
    <div className="h-auto w-auto">
      <Dialog>
        <DialogTrigger>
          <Button>Create Flash Card</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Flash Card</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateFlashCardButton;
