import {
  Center,
  Collapse,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import CommentFrame from "../CommentFrame/CommentFrame";
import InvisibleButton from "../../../../../../common/InvisibleButton/InvisibleButton";
import { IconChevronDown, IconChevronUp, IconHeart, IconHeartFilled, IconMessage } from "@tabler/icons-react";
import { useCommentStyles } from "./Comment.styles";
import CommentEditor from "../CommentEditor/CommentEditor";
import { MOCKUP_USER } from "../../../../../../../mockups/user";
import { useDisclosure } from "@mantine/hooks";
import { Board } from "../../../../../../../types/api/boards";
import useBoardList from "../../../../../../../hooks/useBoardList";
import { showNotification } from "../../../../../../../utils/notifications";
import { createContext, useContext } from "react";
import { CommunityContext } from "../../../../../../../pages/community";
import { CheckIsliking, onLikeClick } from "../../../../../../../utils/api/onLikeClick";

export interface CommentProps {
  post: Board;
  onSubmitComment?: (content: string, parentId: string) => Promise<any>;
}

function Comment({ post, onSubmitComment }: CommentProps) {
  const theme = useMantineTheme();
  const { classes } = useCommentStyles();
  const [editorOpen, { toggle: toggleEditor }] = useDisclosure(false);
  const [commentOpen, { toggle: toggleComment }] = useDisclosure(false);
  const { data, setSize, size, isEmpty, mutate: mutate, isLast, isLoading } = useBoardList(
    post.categoryTypes.map((category) => category.name),
    {
      parentId: post.id,
    }
  );

  // boards/likedUsers에 현재 user-id가 들어있는 지 확인
  const isliking = CheckIsliking({likedUsers: post.likedUsers, userEmail: "04smailing@naver.com"});
  
  const { mutatePost } = useContext(CommunityContext);

  return (
    <CommentFrame user={post.writer} withoutLeftBorder={!commentOpen}>
      <Stack spacing={0}>
        <Stack spacing={10} className={classes.comment}>
          <TypographyStylesProvider>
            <div className={classes.content} dangerouslySetInnerHTML={{ __html: post.content }} />
          </TypographyStylesProvider>
          <Group spacing={8}>
            <Group spacing={5}>
              <InvisibleButton onClick={() => {
                onLikeClick({boardId: post.id, token: "04smailing@naver.com"})
                  .then(() => {
                    mutate();
                    mutatePost();
                  })
                  .catch((error) => {
                    // 오류 처리
                  }); 
                }}>
                {isliking && <IconHeartFilled size={22} color={theme.colors.gray[6]} />}
                {!isliking && <IconHeart size={22} color={theme.colors.gray[6]} />}
              </InvisibleButton>
              <Text color={theme.colors.gray[6]} size="xs">
                {post.like}
              </Text>
            </Group>
            <InvisibleButton onClick={toggleEditor}>
              <Group spacing={5}>
                <IconMessage size={22} color={theme.colors.gray[6]} />
                <Text color={theme.colors.gray[6]} size="xs">
                  답하기
                </Text>
              </Group>
            </InvisibleButton>
          </Group>
        </Stack>
        <Divider
          className={classes.divider}
          labelPosition="right"
          label={
            <InvisibleButton onClick={toggleComment}>
              <Group spacing={5} align="center">
                <Text color={theme.colors.gray[6]} size="sm">
                  {commentOpen ? "답글 접기" : "답글 보기"}
                </Text>
                {commentOpen ? (
                  <IconChevronUp size={16} color={theme.colors.gray[6]} />
                ) : (
                  <IconChevronDown size={16} color={theme.colors.gray[6]} />
                )}
              </Group>
            </InvisibleButton>
          }
        />
        <Collapse in={editorOpen}>
          <CommentEditor
            user={MOCKUP_USER}
            onSubmit={async (content) => {
              return onSubmitComment?.(content, post.id).then(() => {
                mutate();
                mutatePost();
                console.log(mutatePost);
                showNotification("답글 등록 완료", "답글이 성공적으로 등록되었습니다.");
                commentOpen? null : toggleComment();
              });
            }}
          />
        </Collapse>
      </Stack>
      <Collapse in={commentOpen}>
        <Stack spacing={0}>
          {isEmpty ? (
            <Text
              size="sm"
              color={theme.colors.gray[6]}
              align="center"
              className={classes.noComment}
            >
              등록된 답글이 없습니다.
            </Text>
          ) : (
            data?.map((data) => {
              return data.data.map((data) => (
                <Comment
                  key={data.id}
                  post={data}
                  onSubmitComment={async (content, parentId) => {
                    return onSubmitComment?.(content, parentId);
                  }}
                />
              ));
            })
          )}
          {!isLast &&
            !isEmpty &&
            (isLoading ? (
              <Center className={classes.moreButton}>
                <Loader size="sm" />
              </Center>
            ) : (
              <InvisibleButton
                onClick={() => {
                  setSize((prev) => prev + 1);
                }}
                className={classes.moreButton}
              >
                <Text color="gray" size="sm">
                  답글 더보기
                </Text>
              </InvisibleButton>
            ))}
        </Stack>
      </Collapse>
    </CommentFrame>
  );
}

export default Comment;
