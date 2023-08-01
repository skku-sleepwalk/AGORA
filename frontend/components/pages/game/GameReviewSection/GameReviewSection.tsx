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
import { GameReviewEditor } from "./GameReviewEditor/GameReviewEditor";
import { GameReview } from "./GameReview/GameReview";
import { GameReviewMine } from "./GameReviewMine/GameReviewMine";

export function GameReviewSection() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewSectionStyles({ smallScreen });
  const theme = useMantineTheme();

  const canReview = true;
  const hasReview = true;

  return (
    <Stack spacing={"xl"}>
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
                <GameReviewEditor placeholder={"도움이 되는 착한 후기를 남겨보세요."} />
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
          <GameReview />
          <GameReview />
          <GameReview />
        </Stack>
      </CardContainer>
    </Stack>
  );
}
