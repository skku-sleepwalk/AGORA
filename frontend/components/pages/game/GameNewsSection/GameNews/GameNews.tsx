import {
  Box,
  Group,
  Stack,
  Text,
  Image,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import CardContainer from "../../../../common/CardContainer/CardContainer";
import { useGameNewsStyles } from "./GameNews.styles";
import {
  IconBookmark,
  IconHeart,
  IconMessages,
  IconPhotoOff,
  IconShare,
} from "@tabler/icons-react";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import { useMediaQuery } from "@mantine/hooks";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";
import { GameBoard } from "../../../../../types/api/game/gameBoard";
import { getRelativeTime } from "../../../../../utils/getRelativeTime";
import { extractImageSrc } from "../../../../../utils/api/ViewPhotos";

export interface GameNewsProps {
  post: GameBoard;
}

export function GameNews({ post }: GameNewsProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameNewsStyles({ smallScreen });
  const theme = useMantineTheme();

  const thumbnailUrl = extractImageSrc(post.content)[0];
  const isImage = thumbnailUrl != "";

  return (
    <CardContainer className={classes.gameNewsSection} bg={"white"}>
      <Group className={classes.group}>
        {isImage && (
          <Image
            fit="cover"
            radius={"lg"}
            width={smallScreen ? "6rem" : "8rem"}
            height={smallScreen ? "6rem" : "8rem"}
            src={thumbnailUrl}
          />
        )}
        {!isImage && (
          <Box className={classes.noImage}>
            <IconPhotoOff color="gray" />
          </Box>
        )}
        <Stack className={classes.stack} spacing={"xs"}>
          <Group position="apart" align="flex-start" spacing={"xs"}>
            <Text fz={smallScreen ? 14 : 18} fw={"bold"}>
              {post.title}
            </Text>
            <Text fz={smallScreen ? 12 : 14} c={theme.colors.gray[4]}>
              {getRelativeTime(post.createdAt)}
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
          <Group spacing={"sm"}>
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
        </Stack>
      </Group>
    </CardContainer>
  );
}
