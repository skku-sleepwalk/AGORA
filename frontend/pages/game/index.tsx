import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { SmallPosts } from "../../components/pages/game/SmallPost/SmallPosts";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import useGameStoreList from "../../hooks/useGameStoreList";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useEffect } from "react";

export const StoreContext = createContext({
  mutatePost: () => {},
});

export default function Main() {
  const router = useRouter();

  const name = "FPS";
  // router.query.name
  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
    isEmpty,
  } = useGameStoreList({
    name: name ? name : undefined,
    // name.toString()
    //여기 tostring 에러 가능성 있음
  });
  useEffect(() => {
    setPostSize(1);
  }, []);

  return (
    <MainLayout tapSection={<MainTab />} upSection={<MainCarousel isMain={true} />}>
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
// let data = new Array();
// {postData?.map((data) => {
//   return data.data.map((data) => (
//     <PostViewer key={data.id} post={data} thumbnailUrl={extractThumbnailUrl(data)} />
//   ));
// })}
