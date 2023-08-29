import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { SmallPosts } from "../../components/pages/game/SmallPost/SmallPosts";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import useGameList from "../../hooks/game/useGameList";
import { Stack } from "@mantine/core";

export default function Main() {
  const genreName = ["전략", "디펜스"];

  const {
    data: postData1,
    isLoading: isPostLoading1,
    setSize: setPostSize1,
    mutate: mutatePost1,
    isEmpty: isEmpty1,
  } = useGameList({
    genreName: genreName ? genreName[0] : undefined,
  });

  const {
    data: postData2,
    isLoading: isPostLoading2,
    setSize: setPostSize2,
    mutate: mutatePost2,
    isEmpty: isEmpty2,
  } = useGameList({
    genreName: genreName ? genreName[1] : undefined,
  });

  return (
    <MainLayout tapSection={<MainTab active="main" />} upSection={<MainCarousel isMain={true} />}>
      <Stack spacing={0}>
        <SmallPosts
          information={{
            data: postData1,
            isLoading: isPostLoading1,
            setSize: setPostSize1,
            mutate: mutatePost1,
            isEmpty1,
          }}
          title={genreName[0]}
        ></SmallPosts>
        <SmallPosts
          information={{
            data: postData2,
            isLoading: isPostLoading2,
            setSize: setPostSize2,
            mutate: mutatePost2,
            isEmpty2,
          }}
          title={genreName[1]}
        ></SmallPosts>
      </Stack>
    </MainLayout>
  );
}
