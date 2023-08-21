import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Spoiler,
  Stack,
  Text,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBell,
  IconDotsVertical,
  IconPencil,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
  IconTrash,
} from "@tabler/icons-react";
import { useMediaQuery, useSetState } from "@mantine/hooks";
import { GameReview } from "../../../../../types/api/game/gameReview";
import { getRelativeTime } from "../../../../../utils/getRelativeTime";
import { useContext, useState } from "react";
import deleteGameReviewComment from "../../../../../utils/api/game/gameReview/deleteGameReviewComment";
import useAuth from "../../../../../hooks/useAuth";
import { showNotification } from "../../../../../utils/notifications";
import {
  DelGameReviewCommentDislike,
  DelGameReviewCommentLike,
  PostGameReviewCommentDislike,
  PostGameReviewCommentLike,
} from "../../../../../utils/api/game/gameReview/gameReviewCommentLike";
import { AssetReviewContext } from "../AssetReview/AssetReview";
import { AssetReviewMineContext } from "../AssetReviewMine/AssetReviewMine";
import { useAssetReviewReplyStyles } from "./AssetReviewReply.styles";
import { AssetTextWriter } from "../../AssetTextWriter/AssetTextWriter";

export interface AssetReviewReplyProps {
  assetId: string;
  reviewId: string;
  data: GameReview;
  isInReviewMine?: boolean;
}

export function AssetReviewReply({
  assetId: gameId,
  reviewId,
  data,
  isInReviewMine,
}: AssetReviewReplyProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useAssetReviewReplyStyles({ smallScreen });
  const theme = useMantineTheme();

  const { user, token } = useAuth();

  const { mutateAssetReviewComment } = useContext(AssetReviewContext);
  const { mutateAssetReviewMineComment } = useContext(AssetReviewMineContext);

  // 후기 좋아요 싫어요 관련 로직
  const handleLike = () => {
    if (data.like) {
      DelGameReviewCommentLike(gameId, reviewId, data.id, token).then(() => {
        mutateAssetReviewComment();
        if (isInReviewMine) {
          mutateAssetReviewMineComment();
        }
      });
    } else {
      PostGameReviewCommentLike(gameId, reviewId, data.id, token).then(() => {
        // 좋아요 싫어요 동시 선택이 안되도록
        if (data.dislike) {
          DelGameReviewCommentDislike(gameId, reviewId, data.id, token).then(() => {
            mutateAssetReviewComment();
            if (isInReviewMine) {
              mutateAssetReviewMineComment();
            }
          });
        } else {
          mutateAssetReviewComment();
          if (isInReviewMine) {
            mutateAssetReviewMineComment();
          }
        }
      });
    }
  };

  const handleDislike = () => {
    if (data.dislike) {
      DelGameReviewCommentDislike(gameId, reviewId, data.id, token).then(() => {
        mutateAssetReviewComment();
        if (isInReviewMine) {
          mutateAssetReviewMineComment();
        }
      });
    } else {
      PostGameReviewCommentDislike(gameId, reviewId, data.id, token).then(() => {
        // 좋아요 싫어요 동시 선택이 안되도록
        if (data.like) {
          DelGameReviewCommentLike(gameId, reviewId, data.id, token).then(() => {
            mutateAssetReviewComment();
            if (isInReviewMine) {
              mutateAssetReviewMineComment();
            }
          });
        } else {
          mutateAssetReviewComment();
          if (isInReviewMine) {
            mutateAssetReviewMineComment();
          }
        }
      });
    }
  };

  // 수정 관련 로직
  const [isEditing, setIsEditing] = useState(false);

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
              <Text fz={smallScreen ? 14 : 18}>{data.author.name}</Text>
              <Text fz={smallScreen ? 12 : 14} color={theme.colors.blue[4]}>
                {authorPlaytime(data.author.playtime)}
              </Text>
            </Stack>
          </Group>
          <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
            {getRelativeTime(data.createdAt)}
          </Text>
        </Group>
        {/* 후기 내용 */}
        {!isEditing && (
          <>
            <Stack className={classes.marginLeft} spacing={0}>
              <TypographyStylesProvider className={classes.reviewTypo}>
                <Spoiler
                  className={classes.spoiler}
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
            <Group className={classes.marginLeft} position="right" spacing={"xs"}>
              <Button
                className={cx(classes.button, smallScreen ? classes.buttonPadding : null)}
                size="xs"
                variant="outline"
                color="dark"
                onClick={handleLike}
              >
                <Group spacing={"xs"}>
                  {data.like ? (
                    <IconThumbUpFilled stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  ) : (
                    <IconThumbUp stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  )}
                  <Text>{data.likeCount}</Text>
                </Group>
              </Button>
              <Button
                className={cx(classes.button, smallScreen ? classes.buttonPadding : null)}
                size="xs"
                variant="outline"
                color="dark"
                onClick={handleDislike}
              >
                <Group spacing={"xs"}>
                  {data.dislike ? (
                    <IconThumbDownFilled stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  ) : (
                    <IconThumbDown stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  )}
                  <Text>{data.dislikeCount}</Text>
                </Group>
              </Button>
              <Menu shadow="md" width={120} position="bottom-end" offset={10}>
                <Menu.Target>
                  <UnstyledButton className={classes.dotButton}>
                    <IconDotsVertical stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {data.author.email === token && (
                    <>
                      <Menu.Item
                        icon={<IconPencil size={18} stroke={2} />}
                        className={classes.menuItem}
                        onClick={() => {
                          setIsEditing(true);
                        }}
                      >
                        수정하기
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        onClick={() => {
                          deleteGameReviewComment(gameId, reviewId, data.id, token).then(() => {
                            mutateAssetReviewComment();
                            if (data.author.email === token) {
                              mutateAssetReviewMineComment();
                            }
                            showNotification(
                              "댓글 삭제 완료!",
                              "댓글이 정상적으로 삭제되었습니다."
                            );
                          });
                        }}
                        icon={<IconTrash size={18} stroke={2} />}
                        className={classes.menuItem}
                      >
                        삭제하기
                      </Menu.Item>
                    </>
                  )}
                  {data.author.email !== token && (
                    <Menu.Item
                      icon={<IconBell size={18} stroke={2} />}
                      className={classes.menuItem}
                    >
                      신고하기
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
            </Group>
          </>
        )}
        {isEditing && (
          <Box className={classes.marginLeft}>
            <AssetTextWriter
              completePatch={() => setIsEditing(false)}
              placeholder={"도움이 되는 착한 후기를 남겨보세요."}
              gameId={gameId}
              reviewId={reviewId}
              commentId={data.id}
              content={data.content}
              isInReviewMine={true}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
