import {
  Avatar,
  Box,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useGameReviewSectionStyles } from "./GameReviewSection.styles";
import { GameTextWriter } from "../GameTextWriter/GameTextWriter";
import { GameReview } from "./GameReview/GameReview";
import { GameReviewMine } from "./GameReviewMine/GameReviewMine";
import { useDetailGameReview } from "../../../../hooks/useGameReview";
export interface idid {
  id: string | undefined;
}
export function GameReviewSection({ id }: idid) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewSectionStyles({ smallScreen });
  const theme = useMantineTheme();

  const canReview = true;
  const hasReview = false;
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
              {/* 후기 작성 에디터 파트 */}
              {canReview && !hasReview && (
                <GameTextWriter
                  placeholder={"도움이 되는 착한 후기를 남겨보세요."}
                  id={id ? id : ""}
                />
              )}
              {!canReview && (
                <TextInput
                  className={classes.reviewNo}
                  placeholder="게임을 플레이하고 솔직한 후기를 남겨보세요."
                  disabled
                />
              )}
              {/* 자신이 작성한 후기를 보여주는 파트 */}
              {canReview && hasReview && <GameReviewMine />}
            </Box>
          </Group>
          {/* 다른 사람이 작성한 후기 보여지는 파트 */}
          {commentData?.map((data) => {
            console.log("리뷰:", data);
            return data.data.data?.map((data) => (
              <GameReview
                content={data.content}
                gameId={id}
                id={data.id}
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
