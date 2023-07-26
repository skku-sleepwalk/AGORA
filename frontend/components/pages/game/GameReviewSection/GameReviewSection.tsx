import { Avatar, Box, Collapse, Group, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useGameReviewSectionStyles } from "./GameReviewSection.styles";
import { GameReviewEditor } from "./GameReviewEditor/GameReviewEditor";
import { GameReview } from "./GameReview/GameReview";

export function GameReviewSection() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewSectionStyles({ smallScreen });
  const [opened, handlers] = useDisclosure(false);

  const canEdit = true;
  const hasReview = false;

  return (
    <Stack spacing={"xl"}>
      <Text fz={32}>후기</Text>
      <CardContainer className={classes.reviewSection}>
        <Stack spacing={"lg"} w={"100%"}>
          {/* 후기 작성 파트 */}
          <Group spacing={"lg"} align="flex-start" className={classes.marginLeftRight}>
            <Avatar
              radius="xl"
              size={smallScreen ? 30 : 46}
              src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
            />
            <Stack spacing={0} className={classes.reviewStack}>
              {/* 후기 작성 안내 파트 */}
              {!hasReview && (
                <Collapse in={!opened} w={"100%"}>
                  {canEdit && (
                    <TextInput
                      className={classes.reviewInput}
                      placeholder="모두에게 도움이 되는 착한 후기를 남겨보세요."
                      onFocus={() => {
                        handlers.open();
                      }}
                    />
                  )}
                  {!canEdit && (
                    <TextInput
                      className={classes.reviewInput}
                      placeholder="이 게임을 플레이하고 솔직한 후기를 남겨보세요."
                      disabled
                    />
                  )}
                </Collapse>
              )}
              {/* 후기 작성 에디터 */}
              <Collapse in={opened} w={"100%"}>
                <GameReviewEditor onCancelClick={handlers.close}></GameReviewEditor>
              </Collapse>
              {/* 자신이 작성한 후기를 보여주는 파트 */}
            </Stack>
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
