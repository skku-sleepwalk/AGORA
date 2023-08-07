import { Avatar, Box, Group, Loader, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useGameReviewSectionStyles } from "./GameReviewSection.styles";
import { GameTextWriter } from "../GameTextWriter/GameTextWriter";
import { GameReview } from "./GameReview/GameReview";
import { GameReviewMine } from "./GameReviewMine/GameReviewMine";
import { useGameReviewList } from "../../../../hooks/useGameReview";
import useAuth from "../../../../hooks/useAuth";
import { useMyGameReview } from "../../../../hooks/useMyGameReview";
import { createContext } from "react";
import { PlaytimesInUser } from "../../../../types/api/user";
import { useUserPlaytimes } from "../../../../hooks/useUserPlaytimes";

export interface GameReviewSectionProps {
  gameId: string;
}

// 리뷰 작성자의 플레이 타임 확인 관련
export function authorPlaytime(playtime: number): string {
  if (playtime < 60) {
    return `${playtime}분 플레이`;
  }
  return `${playtime / 60}시간 플레이`;
}

// 유저의 플레이 타임 확인 관련
export function hasPlaytime(playtimes: PlaytimesInUser[], gameId: string): boolean {
  if (playtimes === undefined) {
    return false;
  }

  for (const playtime of playtimes) {
    if (playtime.game.id === gameId) {
      return true;
    }
  }
  return false;
}

// mutate 관련 context
export const GameReviewSectionContext = createContext({
  mutateGameReview: () => {},
  mutateGameReviewMine: () => {},
});

export function GameReviewSection({ gameId: id }: GameReviewSectionProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewSectionStyles({ smallScreen });
  const { user, token } = useAuth();

  const { data: me } = useUserPlaytimes();
  const canReview = me !== undefined ? hasPlaytime(me.data.playtimes, id) : false;

  const { data: myReviewData, mutate: mutateGameReviewMine } = useMyGameReview(id);

  const {
    data: gameReviewData,
    setSize: setGameReviewSize,
    isLoading: isGameReviewLoading,
    mutate: mutateGameReview,
  } = useGameReviewList({ gameId: id });

  return (
    <GameReviewSectionContext.Provider value={{ mutateGameReview, mutateGameReviewMine }}>
      <Stack spacing={"xl"} className={classes.all}>
        <Text fz={smallScreen ? 28 : 32}>후기</Text>
        {/* 후기 컨테이너 */}
        <CardContainer className={classes.reviewSection} bg={"white"}>
          <Stack spacing={"lg"}>
            {/* 후기 작성 파트 */}
            <Group className={classes.myReviewGroup}>
              <Avatar
                radius="xl"
                size={smallScreen ? 30 : 46}
                src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
              />
              <Box className={classes.reviewEditorBox}>
                {/* 후기 작성 에디터 파트 혹은 자신이 작성한 후기 보여지는 파트 */}
                {!canReview ? (
                  // 후기 작성 불가
                  <TextInput
                    className={classes.reviewNo}
                    placeholder="게임을 플레이하고 솔직한 후기를 남겨보세요."
                    disabled
                  />
                ) : !myReviewData ? (
                  // myReviewData가 undefined인 경우 제외
                  <></>
                ) : myReviewData.data === null ? (
                  // 후기 작성 가능 && 작성한 후기 없음
                  <GameTextWriter
                    placeholder={"도움이 되는 착한 후기를 남겨보세요."}
                    gameId={id ? id : ""}
                  />
                ) : (
                  // 작성한 후기 있음
                  <GameReviewMine gameId={id} data={myReviewData.data} />
                )}
              </Box>
            </Group>
            {/* 다른 사람이 작성한 후기 보여지는 파트 */}
            {gameReviewData?.map((data) => {
              return data.data.data?.map((data) => <GameReview gameId={id} data={data} />);
            })}
            {isGameReviewLoading && (
              <Box className={classes.loader}>
                <Loader variant="dots" />
              </Box>
            )}
          </Stack>
        </CardContainer>
      </Stack>
    </GameReviewSectionContext.Provider>
  );
}
