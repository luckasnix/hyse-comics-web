import { createFileRoute, Outlet } from "@tanstack/react-router";

const ComicsRoute = () => {
  return <Outlet />;
};

export const Route = createFileRoute("/comics/$comicId")({
  component: ComicsRoute,
});
