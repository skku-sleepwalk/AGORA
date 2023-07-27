import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
  TextInput,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useGameReviewMineStyles } from "./GameReviewMine.styles";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import {
  IconDotsVertical,
  IconMessages,
  IconPencil,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure, useMediaQuery, useSetState } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { GameReviewReply } from "../GameReviewReply/GameReviewReply";
import { GameReviewEditor } from "../GameReviewEditor/GameReviewEditor";

export function GameReviewMine() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewMineStyles({ smallScreen });
  const theme = useMantineTheme();

  // 자세히 보기 관련 로직
  const overflowRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState<boolean | null>(null);
  const checkOverflow = () => {
    if (!overflowRef.current) {
      return null;
    }
    return overflowRef.current.scrollHeight > overflowRef.current.clientHeight;
  };
  useEffect(() => {
    setIsOverflowed(checkOverflow());
  }, []);
  const [viewMore, setViewMore] = useState<boolean>(false);

  // 후기 좋아요 싫어요 관련 로직
  const [goodBadstate, setGoodBadState] = useSetState({ good: false, bad: false });
  const handleGoodState = () => {
    setGoodBadState({ good: !goodBadstate.good });
    if (!goodBadstate.good && goodBadstate.bad) {
      setGoodBadState({ bad: !goodBadstate.bad });
    }
  };
  const handleBadState = () => {
    setGoodBadState({ bad: !goodBadstate.bad });
    if (goodBadstate.good && !goodBadstate.bad) {
      setGoodBadState({ good: !goodBadstate.good });
    }
  };

  // 답글 관련
  const [opened, { toggle }] = useDisclosure(false);
  const canReview = true;

  return (
    <Box>
      <Stack className={classes.stack} spacing={"lg"}>
        {/* 작성 날짜 */}
        <Group position="apart">
          <Text fz={smallScreen ? 14 : 18} fw={"bold"} color={theme.colors.blue[6]}>
            내가 작성한 후기
          </Text>
          <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
            15일 전
          </Text>
        </Group>
        {/* 후기 내용 */}
        <Stack spacing={0}>
          <TypographyStylesProvider
            className={cx(classes.reviewTypo, !viewMore && classes.limitHeight)}
            ref={overflowRef}
          >
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html: MOCKUP_CONTENT,
              }}
            />
          </TypographyStylesProvider>
          {isOverflowed && !viewMore && (
            <UnstyledButton
              className={classes.viewMoreButton}
              fz={smallScreen ? 14 : 16}
              c={theme.colors.gray[4]}
              onClick={() => setViewMore(true)}
            >
              자세히 보기
            </UnstyledButton>
          )}
        </Stack>
        {/* 후기 하단 버튿들 */}
        <Group position="apart">
          <Button
            className={classes.button}
            size="xs"
            variant="outline"
            color="dark"
            leftIcon={<IconMessages stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />}
            onClick={toggle}
          >
            답글
          </Button>
          <Group spacing={"xs"}>
            <Button
              className={cx(classes.button, smallScreen ? classes.buttonPadding : null)}
              size="xs"
              variant="outline"
              color="dark"
              onClick={handleGoodState}
            >
              <Group spacing={"xs"}>
                {goodBadstate.good ? (
                  <IconThumbUpFilled stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                ) : (
                  <IconThumbUp stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                )}
                2
              </Group>
            </Button>
            <Button
              className={cx(classes.button, smallScreen ? classes.buttonPadding : null)}
              size="xs"
              variant="outline"
              color="dark"
              onClick={handleBadState}
            >
              <Group spacing={"xs"}>
                {goodBadstate.bad ? (
                  <IconThumbDownFilled stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                ) : (
                  <IconThumbDown stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                )}
                1
              </Group>
            </Button>
            <Menu shadow="md" width={120} position="bottom-end" offset={10}>
              <Menu.Target>
                <UnstyledButton>
                  <IconDotsVertical stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconPencil size={18} stroke={2} />} className={classes.menuItem}>
                  수정하기
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item icon={<IconTrash size={18} stroke={2} />} className={classes.menuItem}>
                  삭제하기
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
        {/* 후기 답글 */}
        <Collapse in={opened}>
          {/* 후기 답글 작성 파트 */}
          <Divider />
          <Group className={classes.myReviewGroup}>
            <Avatar
              radius="xl"
              size={smallScreen ? 30 : 46}
              src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
            />
            <Box className={classes.reviewEditorBox}>
              {/* 후기 작성 에디터 파트 */}
              {canReview && <GameReviewEditor placeholder={"후기에 답글을 달아보세요."} />}
              {!canReview && (
                <TextInput
                  className={classes.reviewNo}
                  placeholder="게임을 플레이하고 후기에 답글을 달아보세요."
                  disabled
                />
              )}
            </Box>
          </Group>
          <GameReviewReply opened={opened} />
          <GameReviewReply opened={opened} />
          <GameReviewReply opened={opened} />
        </Collapse>
      </Stack>
    </Box>
  );
}
