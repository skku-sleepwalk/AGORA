import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useGameReviewStyles } from "./GameReview.styles";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import {
  IconMessages,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useSetState } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

export function GameReview() {
  const { classes, cx } = useGameReviewStyles();
  const theme = useMantineTheme();

  // 후기 내용 더보기 작동 관련
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

  return (
    <Box>
      <Divider />
      <Stack className={classes.stack} spacing={"lg"}>
        {/* 유저 소개 및 작성 날짜 */}
        <Group position="apart" align="flex-start">
          <Group align="flex-end">
            <Avatar
              radius="xl"
              size={46}
              src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
            />
            <Stack spacing={"0.2rem"}>
              <Text fz={18}>내가 세상에서 제일 귀엽고 이뻐!!</Text>
              <Text fz={14} color={theme.colors.blue[4]}>
                15일 동안 30시간 플레이
              </Text>
            </Stack>
          </Group>
          <Text fz={14} color={theme.colors.gray[4]}>
            15일 전
          </Text>
        </Group>
        {/* 후기 내용 */}
        <Box className={classes.marginLeft} pos={"relative"}>
          {isOverflowed && !viewMore && (
            <UnstyledButton
              className={classes.viewMoreButton}
              fz={16}
              c={theme.colors.gray[4]}
              onClick={() => setViewMore(true)}
            >
              더보기
            </UnstyledButton>
          )}
          <TypographyStylesProvider
            ref={overflowRef}
            className={cx(classes.reviewTypo, !viewMore && classes.limitHeight)}
          >
            <div dangerouslySetInnerHTML={{ __html: MOCKUP_CONTENT }} />
          </TypographyStylesProvider>
        </Box>
        {/* 후기 하단 버튿들 */}
        <Group className={classes.marginLeft} position="apart">
          <Button
            className={classes.button}
            size="xs"
            variant="outline"
            color="dark"
            leftIcon={<IconMessages stroke={1.5} />}
          >
            답글
          </Button>
          <Group>
            <Button
              className={classes.button}
              size="xs"
              variant="outline"
              color="dark"
              onClick={handleGoodState}
            >
              <Group spacing={"xs"}>
                {goodBadstate.good ? (
                  <IconThumbUpFilled stroke={1.5} />
                ) : (
                  <IconThumbUp stroke={1.5} />
                )}
                1
              </Group>
            </Button>
            <Button
              className={classes.button}
              size="xs"
              variant="outline"
              color="dark"
              onClick={handleBadState}
            >
              <Group spacing={"xs"}>
                {goodBadstate.bad ? (
                  <IconThumbDownFilled stroke={1.5} />
                ) : (
                  <IconThumbDown stroke={1.5} />
                )}
                1
              </Group>
            </Button>
          </Group>
        </Group>
        {/* 후기 답변들 */}
      </Stack>
    </Box>
  );
}
