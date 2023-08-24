import { Stack, Text, TypographyStylesProvider } from "@mantine/core";
import { useAssetInfoStyles } from "./AssetInfo.styles";
import { useMediaQuery } from "@mantine/hooks";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { Asset } from "../../../../types/api/asset";

interface AssetInfoProps {
  asset: Asset;
}
export function AssetInfo({ asset }: AssetInfoProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useAssetInfoStyles();

  return (
    <Stack spacing={"xl"} className={classes.all}>
      <Text fz={smallScreen ? 28 : 32}>에셋 설명</Text>
      <CardContainer className={classes.infoSection} bg={"white"}>
        <TypographyStylesProvider className={classes.infoTypo}>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: asset?.description,
            }}
          />
        </TypographyStylesProvider>
      </CardContainer>
    </Stack>
  );
}
