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
import { IconHeart, IconMessages, IconPhotoOff, IconShare } from "@tabler/icons-react";
import { MOCKUP_CONTENT } from "../../../../../mockups/post";
import { useMediaQuery } from "@mantine/hooks";
import InvisibleButton from "../../../../common/InvisibleButton/InvisibleButton";

export function GameNews() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameNewsStyles({ smallScreen });
  const theme = useMantineTheme();

  const isImage = true;

  return (
    <CardContainer className={classes.gameNewsSection}>
      <Group className={classes.group}>
        {isImage && (
          <Image
            fit="cover"
            radius={"lg"}
            width={smallScreen ? "6rem" : "8rem"}
            height={smallScreen ? "6rem" : "8rem"}
            src={"https://cdn.class101.net/images/171f6948-4553-4cd4-9fcd-98f9dd61c547/1200x630"}
          />
        )}
        {!isImage && (
          <Box className={classes.noImage}>
            <IconPhotoOff color="gray" />
          </Box>
        )}
        <Stack className={classes.stack} spacing={"xs"}>
          <Group position="apart" align="flex-start" spacing={"xs"}>
            <Text fz={smallScreen ? 14 : 18}>내가 세계에서 제일 귀엽고 이쁨 ^^</Text>
            <Text fz={smallScreen ? 12 : 14} c={theme.colors.gray[4]}>
              23/7/27
            </Text>
          </Group>
          <TypographyStylesProvider className={classes.newsTypo}>
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html: MOCKUP_CONTENT,
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
          </Group>
        </Stack>
      </Group>
    </CardContainer>
  );
}
