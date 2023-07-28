import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useGameReviewReplyStyles } from "./GameReviewReply.styles";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import {
  IconDotsVertical,
  IconPencil,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
  IconTrash,
} from "@tabler/icons-react";
import { useMediaQuery, useSetState } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

export interface GameReviewReplyProps {
  opened: boolean;
}

export function GameReviewReply({ opened }: GameReviewReplyProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewReplyStyles({ smallScreen });
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
    // setIsOverflowed(checkOverflow())가 clientHeight가 0일 때 계산하지 않도록
    const timer = setTimeout(() => {
      setIsOverflowed(checkOverflow());
    }, 1); // 1 밀리초의 딜레이를 줌

    return () => {
      clearTimeout(timer); // 컴포넌트가 unmount될 때 타이머를 클리어
    };
  }, [opened]);
  const [viewMore, setViewMore] = useState<boolean>(false);

  // 답글 좋아요 싫어요 관련 로직
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

  return (
    <Box>
      <Divider />
      <Stack className={classes.stack} spacing={"lg"}>
        {/* 유저 소개 및 작성 날짜 */}
        <Group position="apart" align="flex-start">
          <Group align="flex-end">
            <Avatar
              radius="xl"
              size={smallScreen ? 30 : 46}
              src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
            />
            <Stack spacing={"0.2rem"}>
              <Text fz={smallScreen ? 14 : 18}>내가 세상에서 제일 귀엽고 이뻐!!</Text>
              <Text fz={smallScreen ? 12 : 14} color={theme.colors.blue[4]}>
                15일 동안 30시간 플레이
              </Text>
            </Stack>
          </Group>
          <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
            15일 전
          </Text>
        </Group>
        {/* 후기 내용 */}
        <Stack className={classes.marginLeft} spacing={0}>
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
        <Group className={classes.marginLeft} position="right" spacing={"xs"}>
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
      </Stack>
    </Box>
  );
}
