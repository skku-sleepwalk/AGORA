import MainLayout from "../../components/pages/game/MainLayout/MainLayout";
import { SmallPosts } from "../../components/pages/game/SmallPost/SmallPosts";
import { MainTab } from "../../components/pages/game/MainTab/MainTab";
import { MainCarousel } from "../../components/pages/game/MainCarousel/MainCarousel";
import useGameList from "../../hooks/game/useGameList";
import { Stack } from "@mantine/core";
import useAllGame from "../../hooks/game/useAllGame";

export default function Main() {
  const genreName = [
    "디펜스",
    "비주얼노벨",
    "시뮬레이션",
    "액션",
    "어드벤처",
    "전략",
    "캐주얼",
    "퍼즐",
    "플랫포머",
    "RPG",
  ];

  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
    isEmpty: isEmpty,
  } = useAllGame({ search: "", genreNames: genreName });

  return (
    <MainLayout
      tapSection={<MainTab active="main" />}
      upSection={<MainCarousel type="main" data={postData} />}
    >
      <Stack spacing={0}>
        <SmallPosts
          information={{
            data: postData,
            isLoading: isPostLoading,
            setSize: setPostSize,
            mutate: mutatePost,
            isEmpty1: isEmpty,
          }}
          title={"Agora 베타테스트 스페셜"}
        ></SmallPosts>
      </Stack>
    </MainLayout>
  );
}
