import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({
  color = "primary",
  size = 35,
}: {
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  size?: number;
}) => {
  return (
    <div className="h-full w-full flex justify-center items-center p-4">
      <CircularProgress color={color} size={size} />
    </div>
  );
};

export default Loading;
