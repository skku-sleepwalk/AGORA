import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Group,
  Spoiler,
  Stack,
  Text,
  TextInput,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useGameReviewStyles } from "./GameReview.styles";
import {
  IconMessages,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useDisclosure, useMediaQuery, useSetState } from "@mantine/hooks";
import { GameReviewReply } from "../GameReviewReply/GameReviewReply";
import { GameTextWriter } from "../../GameTextWriter/GameTextWriter";
import {
  ReviewLike,
  ReviewLikeDel,
  ReviewDislikeDel,
  ReviewDislike,
  useReviewComment,
} from "../../../../../hooks/useGameReview";
import useAuth from "../../../../../hooks/useAuth";

export function GameReview(data: {
  content: string;
  id: string;
  like: number;
  dislike: number;
  gameId: string;
}) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameReviewStyles({ smallScreen });
  const theme = useMantineTheme();

  const { token } = useAuth();

  const {
    data: commentData,
    setSize: setCommentSize,
    isLast: isLastComment,
    isLoading: isCommentLoading,
    mutate: mutateComment,
  } = useReviewComment(data.gameId, data.id);

  // 후기 좋아요 싫어요 관련 로직
  const [goodBadstate, setGoodBadState] = useSetState({ good: false, bad: false });
  const handleGoodState = () => {
    if (goodBadstate.good) {
      ReviewLikeDel(data.gameId, data.id, token);
    } else {
      ReviewLike(data.gameId, data.id, token);
    }

    setGoodBadState({ good: !goodBadstate.good });
    if (!goodBadstate.good && goodBadstate.bad) {
      setGoodBadState({ bad: !goodBadstate.bad });
    }
  };
  const handleBadState = () => {
    if (goodBadstate.bad) {
      ReviewDislikeDel(data.gameId, data.id, token);
    } else {
      ReviewDislike(data.gameId, data.id, token);
    }

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
          <TypographyStylesProvider className={classes.reviewTypo}>
            <Spoiler
              maxHeight={smallScreen ? 4.1 * 16 : 5.9 * 16}
              showLabel="자세히 보기"
              hideLabel="숨기기"
            >
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
              />
            </Spoiler>
          </TypographyStylesProvider>
        </Stack>
        {/* 후기 하단 버튿들 */}
        <Group className={classes.marginLeft} position="apart">
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
                {data.like + ""}
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
                {data.dislike + ""}
              </Group>
            </Button>
          </Group>
        </Group>
        {/* 후기 답글 */}
        <Collapse in={opened} className={classes.marginLeft}>
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
              {canReview && (
                <GameTextWriter
                  placeholder={"후기에 답글을 달아보세요."}
                  id={data.gameId}
                  commentid={data.id}
                />
              )}
              {!canReview && (
                <TextInput
                  className={classes.reviewNo}
                  placeholder="게임을 플레이하고 후기에 답글을 달아보세요."
                  disabled
                />
              )}
            </Box>
          </Group>
          {commentData?.map((data) => {
            return data.data.data.map((data) => (
              <GameReviewReply
                opened={opened}
                content={data.content}
                // key={data.id}
                // post={data}
                // onSubmitComment={async (content, parentId) => {
                //   return onSubmitComment?.(content, parentId);
                // }}
              />
            ));
          })}
          {/* <GameReviewReply opened={opened} />
          <GameReviewReply opened={opened} />
          <GameReviewReply opened={opened} /> */}
        </Collapse>
      </Stack>
    </Box>
  );
}
