import {
  Avatar,
  Box,
  Group,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import { useGameBoardDetailViewerStyles } from "./GameBoardDetailViewer.styles";
import { useMediaQuery } from "@mantine/hooks";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import {
  IconBookmark,
  IconChevronLeft,
  IconHeart,
  IconMessages,
  IconShare,
} from "@tabler/icons-react";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";
import { GameTextWriter } from "../../GameTextWriter/GameTextWriter";

export function GameBoardDetailViewer() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameBoardDetailViewerStyles({ smallScreen });
  const theme = useMantineTheme();

  return (
    <CardContainer className={classes.boardDetailViewer}>
      <Stack>
        {/* 이전으로 이동 버튼 */}
        <UnstyledButton>
          <Group spacing={"0.2rem"}>
            <IconChevronLeft color={theme.colors.gray[5]} />
            <Text color={theme.colors.gray[5]}>Stardew Valley</Text>
          </Group>
        </UnstyledButton>
        {/* 게시글 정보 */}
        <Group>
          <Avatar
            radius="xl"
            size={smallScreen ? 30 : 46}
            src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
          />
          <Stack className={classes.userStack} spacing={"0.4rem"}>
            <Group position="apart">
              <Text fz={smallScreen ? 14 : 18}>내가 세상에서 제일 귀엽고 이뻐!!</Text>
              <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
                15일 전
              </Text>
            </Group>
            <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[5]}>
              What's your ETA?
            </Text>
          </Stack>
        </Group>
        {/* 게시글 내용 */}
        <Stack className={classes.marginLeft} spacing={"xs"}>
          <Title order={3}>내가 세상에서 제일 귀엽고 이쁜 이유 100가지</Title>
          <TypographyStylesProvider>
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html: MOCKUP_CONTENT,
              }}
            />
          </TypographyStylesProvider>
        </Stack>
        {/* 게시글 푸터 */}
        <Group className={classes.footerGroup} spacing={"sm"}>
          <Group spacing={"0.3rem"}>
            <IconMessages stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
            <Text fz={14}>1</Text>
          </Group>
          <Group spacing={"0.3rem"}>
            <IconHeart stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
            <Text fz={14}>2</Text>
          </Group>
          <InvisibleButton>
            <IconShare stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
          </InvisibleButton>
          <InvisibleButton>
            <IconBookmark stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
          </InvisibleButton>
        </Group>
        {/* 게시글 댓글 파트 */}
        <Box className={classes.marginLeft}>
          <GameTextWriter placeholder={"이 게시글에 댓글을 남겨보세요."} />
        </Box>
      </Stack>
    </CardContainer>
  );
}
