import { Avatar, Box, Group, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useGameReviewSectionStyles } from "./GameReviewSection.styles";
import { GameTextWriter } from "../GameTextWriter/GameTextWriter";
import { GameReview } from "./GameReview/GameReview";
import { GameReviewMine } from "./GameReviewMine/GameReviewMine";
import { useDetailGameReview } from "../../../../hooks/useGameReview";
import useAuth from "../../../../hooks/useAuth";
import { PlaytimesInUser } from "../../../../types/api/user";
import { useMyGameReview } from "../../../../hooks/useMyGameReview";

export interface GameReviewSectionProps {
  gameId: string;
}

// 리뷰 작성자의 플레이 타임 확인 관련
export function findPlaytimeById(playtimes: PlaytimesInUser[], id: string): number | null {
  if (playtimes === undefined) {
    return null;
  }

  for (const playtime of playtimes) {
    if (playtime.game.id === id) {
      return playtime.playtime;
    }
  }
  return null;
}

export function GameReviewSection({ gameId: id }: GameReviewSectionProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewSectionStyles({ smallScreen });
  const theme = useMantineTheme();

  const { user, token } = useAuth();

  // const canReview = user !== undefined ? findPlaytimeById(user.playtimes, id) !== null : false;
  const canReview = true;

  const { data: myReviewData, mutate: mutateGameReviewMine } = useMyGameReview(id);

  const {
    data: commentData,
    setSize: setCommentSize,
    isLast: isLastComment,
    isLoading: isCommentLoading,
    mutate: mutateComment,
  } = useDetailGameReview(id ? id : "");

  return (
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
                  mutate={mutateGameReviewMine}
                  placeholder={"도움이 되는 착한 후기를 남겨보세요."}
                  gameId={id ? id : ""}
                />
              ) : (
                // 작성한 후기 있음
                <GameReviewMine
                  mutateGameReviewMine={mutateGameReviewMine}
                  gameId={id}
                  data={myReviewData.data}
                />
              )}
            </Box>
          </Group>
          {/* 다른 사람이 작성한 후기 보여지는 파트 */}
          {commentData?.map((data) => {
            return data.data.data?.map((data) => (
              <GameReview
                content={data.content}
                gameId={id}
                id={data.id}
                like={data.likeCount}
                dislike={data.dislikeCount}
                // key={data.id}
                // post={data}
                // onSubmitComment={async (content, parentId) => {
                //   return onSubmitComment?.(content, parentId);
                // }}
              />
            ));
          })}
        </Stack>
      </CardContainer>
    </Stack>
  );
}
