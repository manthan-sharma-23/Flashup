import { useQuery } from "@tanstack/react-query";
import Server from "../api/api";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user.atom";
import { useEffect } from "react";

export const useGetUser = () => {
  const {
    data: user,
    isError: error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["user", "get"],
    queryFn: () => new Server().user.get_user(),
  });

  const setUser = useSetRecoilState(UserAtom);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [loading, error]);

  return { user, error, loading };
};
