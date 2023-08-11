import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { SmallPosts } from "../../components/pages/game/SmallPost/SmallPosts";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import useGameList from "../../hooks/game/useGameList";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useEffect } from "react";

export const StoreContext = createContext({
  mutatePost: () => {},
});

export default function Main() {
  const router = useRouter();

  const genreName = "퍼즐";

  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
    isEmpty,
  } = useGameList({
    genreName: genreName ? genreName : undefined,
    // name.toString()
    //여기 tostring 에러 가능성 있음
  });
  useEffect(() => {
    setPostSize(1);
  }, []);

  return (
    <MainLayout tapSection={<MainTab active="main" />} upSection={<MainCarousel isMain={true} />}>
      <StoreContext.Provider
        value={{
          mutatePost,
        }}
      >
        <SmallPosts
          information={{
            data: postData,
            isLoading: isPostLoading,
            setSize: setPostSize,
            mutate: mutatePost,
            isEmpty,
          }}
        ></SmallPosts>
      </StoreContext.Provider>
    </MainLayout>
  );
}
