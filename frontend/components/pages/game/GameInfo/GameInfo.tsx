import { Stack, Text, TypographyStylesProvider } from "@mantine/core";
import { useGameInfoStyles } from "./GameInfo.styles";
import { useMediaQuery } from "@mantine/hooks";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { Game } from "../../../../types/api/game/game";
import { KeyedMutator } from "swr";
interface GameDataProps {
  postData: Game | undefined;
  loading?: boolean;
}
export function GameInfo({ postData, loading }: GameDataProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameInfoStyles();

  return (
    <Stack spacing={"xl"} className={classes.all}>
      <Text fz={smallScreen ? 28 : 32}>게임 정보</Text>
      <CardContainer className={classes.infoSection} bg={"white"}>
        <TypographyStylesProvider className={classes.infoTypo}>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: postData?.information?.description || "",
            }}
          />
        </TypographyStylesProvider>
      </CardContainer>
      <Text fz={smallScreen ? 28 : 32} className={classes.marginTop}>
        게임 사양
      </Text>
      <CardContainer className={classes.infoSection}>
        <TypographyStylesProvider className={classes.infoTypo}>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: postData?.information?.specification || "",
            }}
          />
        </TypographyStylesProvider>
      </CardContainer>
    </Stack>
  );
}
