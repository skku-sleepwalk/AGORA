import {
  Avatar,
  Divider,
  Group,
  Stack,
  Text,
  Image,
  useMantineTheme,
  TypographyStylesProvider,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useGameBoardStyles } from "./GameBoard.styles";
import { IconBookmark, IconHeart, IconMessages, IconShare } from "@tabler/icons-react";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";
import { GameBoardDetailViewer } from "../GameBoardDetailViewer/GameBoardDetailViewer";
import { GameBoard } from "../../../../../types/api/game/gameBoard";
import { extractImageSrc } from "../../../../../utils/api/ViewPhotos";

export interface GameBoardProps {
  post: GameBoard;
}

export function GameBoard({ post }: GameBoardProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameBoardStyles({ smallScreen });
  const theme = useMantineTheme();

  const thumbnailUrl = extractImageSrc(post.content)[0];
  const isImage = thumbnailUrl != "";

  return (
    <UnstyledButton onClick={() => {}}>
      <Divider />
      <Stack className={classes.stack} spacing={0}>
        {/* 글쓴이 소개 */}
        <Group position="apart">
          <Group spacing={"sm"}>
            <Avatar
              radius="xl"
              size={smallScreen ? 20 : 30}
              src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
            />
            <Text fz={smallScreen ? 12 : 14}>{post.author.name}</Text>
          </Group>
          <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[4]}>
            15일 전
          </Text>
        </Group>
        {/* 게시글 내용 */}
        <Group className={classes.group}>
          <Stack className={classes.boardStack} spacing={"xs"}>
            <Group spacing={"xs"}>
              <Text fz={smallScreen ? 14 : 18} fw={"bold"}>
                {post.title}
              </Text>
            </Group>
            <TypographyStylesProvider className={classes.newsTypo}>
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />
            </TypographyStylesProvider>
            <Group className={classes.footerGroup} spacing={"sm"}>
              <Group spacing={"0.3rem"}>
                <IconMessages stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                <Text fz={14}>{post.childCount}</Text>
              </Group>
              <Group spacing={"0.3rem"}>
                <IconHeart stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
                <Text fz={14}>{post.likeCount}</Text>
              </Group>
              <InvisibleButton>
                <IconShare stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
              </InvisibleButton>
              <InvisibleButton>
                <IconBookmark stroke={1.5} size={smallScreen ? "1rem" : "1.5rem"} />
              </InvisibleButton>
            </Group>
          </Stack>
          {isImage && (
            <Image
              fit="cover"
              radius={"lg"}
              width={smallScreen ? "6rem" : "8rem"}
              height={smallScreen ? "6rem" : "8rem"}
              src={thumbnailUrl}
            />
          )}
        </Group>
      </Stack>
    </UnstyledButton>
  );
}
