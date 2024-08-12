import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user.atom";
import { useEffect } from "react";
import UserModule from "../api/user.module";

export const useGetUser = () => {
  const {
    data: user,
    isError: error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["user", "get"],
    queryFn: () => new UserModule().user.get_user(),
  });

  const setUser = useSetRecoilState(UserAtom);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [loading, error]);

  return { user, error, loading };
};
