import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Group,
  Loader,
  Menu,
  Spoiler,
  Stack,
  Text,
  TextInput,
  TypographyStylesProvider,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
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
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { getRelativeTime } from "../../../../../utils/getRelativeTime";
import useAuth from "../../../../../hooks/useAuth";
import { createContext, useContext, useState } from "react";
import { showNotification } from "../../../../../utils/notifications";
import { useAssetReviewMineStyles } from "./AssetReviewMine.styles";
import { AssetReviewSectionContext } from "../AssetReviewSection";
import { AssetTextWriter } from "../../AssetTextWriter/AssetTextWriter";
import { AssetReview } from "../../../../../types/api/asset";
import {
  DelAssetReviewDislike,
  DelAssetReviewLike,
  PostAssetReviewDislike,
  PostAssetReviewLike,
} from "../../../../../utils/api/asset/assetReview/AssetReviewLike";
import { useAssetReviewList } from "../../../../../hooks/useAssetReview";
import deleteAssetReview from "../../../../../utils/api/asset/assetReview/deleteAssetReview";
import { AssetReviewReply } from "../AssetReviewReply/AssetReviewReply";

export interface AssetReviewMineProps {
  assetId: string;
  data: AssetReview;
}

// mutate 관련 context
export const AssetReviewMineContext = createContext({
  mutateAssetReviewMineComment: () => {},
});

export function AssetReviewMine({ assetId, data }: AssetReviewMineProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useAssetReviewMineStyles({ smallScreen });
  const theme = useMantineTheme();

  const { user, token } = useAuth();

  const {
    data: assetReviewMineCommentData,
    setSize: setAssetReviewMineCommentSize,
    isLoading: isAssetReviewMineCommentLoading,
    mutate: mutateAssetReviewMineComment,
  } = useAssetReviewList({ assetId: assetId, reviewId: data.id });

  const { mutateAssetReview, mutateAssetReviewMine } = useContext(AssetReviewSectionContext);

  // 후기 좋아요 싫어요 관련 로직
  const handleLike = () => {
    if (data.like) {
      DelAssetReviewLike(assetId, data.id, token).then(() => {
        mutateAssetReviewMine();
        mutateAssetReview();
      });
    } else {
      PostAssetReviewLike(assetId, data.id, token).then(() => {
        // 좋아요 싫어요 동시 선택이 안되도록
        if (data.dislike) {
          DelAssetReviewDislike(assetId, data.id, token).then(() => {
            mutateAssetReviewMine();
            mutateAssetReview();
          });
        } else {
          mutateAssetReviewMine();
          mutateAssetReview();
        }
      });
    }
  };

  const handleDislike = () => {
    if (data.dislike) {
      DelAssetReviewDislike(assetId, data.id, token).then(() => {
        mutateAssetReviewMine();
        mutateAssetReview();
      });
    } else {
      PostAssetReviewDislike(assetId, data.id, token).then(() => {
        // 좋아요 싫어요 동시 선택이 안되도록
        if (data.like) {
          DelAssetReviewLike(assetId, data.id, token).then(() => {
            mutateAssetReviewMine();
            mutateAssetReview();
          });
        } else {
          mutateAssetReviewMine();
          mutateAssetReview();
        }
      });
    }
  };

  // 수정 관련 로직
  const [isEditing, setIsEditing] = useState(false);

  // 답글 관련
  const [opened, { toggle }] = useDisclosure(false);

  const canReview = !!user;

  return (
    <AssetReviewMineContext.Provider
      value={{ mutateAssetReviewMineComment: mutateAssetReviewMineComment }}
    >
      {!isEditing && (
        <Stack className={classes.stack} spacing={"lg"}>
          {/* 작성 날짜 */}
          <Group position="apart">
            <Text fz={smallScreen ? 14 : 18} fw={"bold"} color={theme.colors.blue[6]}>
              내가 작성한 후기
            </Text>
            <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
              {getRelativeTime(data.createdAt)}
            </Text>
          </Group>
          {/* 후기 내용 */}
          <Stack spacing={0}>
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
                    icon={<IconTrash size={18} stroke={2} />}
                    className={classes.menuItem}
                    onClick={() => {
                      deleteAssetReview(assetId, data.id, token).then(() => {
                        mutateAssetReviewMine();
                        mutateAssetReview();
                        showNotification("후기 삭제 완료!", "후기가 정상적으로 삭제되었습니다.");
                      });
                    }}
                  >
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
                {/* 후기 답글 작성 에디터 파트 */}
                {canReview && (
                  <AssetTextWriter
                    placeholder={"후기에 답글을 달아보세요."}
                    assetId={assetId}
                    reviewId={data.id}
                    isInReviewMine={true}
                  />
                )}
                {!canReview && (
                  <TextInput
                    className={classes.reviewNo}
                    placeholder="로그인 후 답글을 달아보세요."
                    disabled
                  />
                )}
              </Box>
            </Group>
            {assetReviewMineCommentData?.map((comment) => {
              return comment.data.data.map((comment) => (
                <AssetReviewReply
                  assetId={assetId}
                  reviewId={data.id}
                  data={comment}
                  isInReviewMine={true}
                />
              ));
            })}
            {isAssetReviewMineCommentLoading && (
              <Box className={classes.loader}>
                <Loader variant="dots" />
              </Box>
            )}
          </Collapse>
        </Stack>
      )}
      {isEditing && (
        <AssetTextWriter
          completePatch={() => setIsEditing(false)}
          placeholder={"도움이 되는 착한 후기를 남겨보세요."}
          assetId={assetId}
          content={data.content}
        />
      )}
    </AssetReviewMineContext.Provider>
  );
}
