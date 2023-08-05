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
import { GetMyGameReview } from "../../../../utils/api/game/getMyGameReview";

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

  const canReview = user !== undefined;
  // const hasReview = user !== undefined ? findPlaytimeById(user.playtimes, id) !== null : false;
  const hasReview = true;
  // console.log(user?.playtimes);

  // 자신이 작성한 후기 관련
  const gameReviewMine = (() => {
    if (token !== undefined) {
      const myReviewData = GetMyGameReview({ gameId: id, userEmail: token });
      if (myReviewData !== undefined) {
        return <GameReviewMine gameId={id} userEmail={token} data={myReviewData} />;
      }
    }
    return <></>;
  })();

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
                <TextInput
                  className={classes.reviewNo}
                  placeholder="게임을 플레이하고 솔직한 후기를 남겨보세요."
                  disabled
                />
              ) : !hasReview ? (
                <GameTextWriter
                  placeholder={"도움이 되는 착한 후기를 남겨보세요."}
                  id={id ? id : ""}
                />
              ) : (
                gameReviewMine
              )}
            </Box>
          </Group>
          {/* 다른 사람이 작성한 후기 보여지는 파트 */}
          {commentData?.map((data) => {
            // console.log("리뷰:", data.data.data[0].likeCount);
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

          {/* <GameReview content="적당한 예시 리뷰" id="" gameId={id} />
          <GameReview content="적당한 예시 리뷰" id="" gameId={id} />
          <GameReview content="적당한 예시 리뷰" id="" gameId={id} /> */}
        </Stack>
      </CardContainer>
    </Stack>
  );
}
