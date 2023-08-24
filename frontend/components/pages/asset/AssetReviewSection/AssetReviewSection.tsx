import { Avatar, Box, Group, Loader, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import CardContainer from "../../../common/CardContainer/CardContainer";
import useAuth from "../../../../hooks/useAuth";
import { createContext } from "react";
import { useAssetReviewList } from "../../../../hooks/useAssetReview";
import { useMyAssetReview } from "../../../../hooks/useMyAssetReview";
import { useAssetReviewSectionStyles } from "./AssetReviewSection.styles";
import { AssetTextWriter } from "../AssetTextWriter/AssetTextWriter";
import { AssetReview } from "./AssetReview/AssetReview";
import { AssetReviewMine } from "./AssetReviewMine/AssetReviewMine";

export interface AssetReviewSectionProps {
  assetId: string;
}

export const AssetReviewSectionContext = createContext({
  mutateAssetReview: () => {},
  mutateAssetReviewMine: () => {},
});

export function AssetReviewSection({ assetId: id }: AssetReviewSectionProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useAssetReviewSectionStyles({ smallScreen });
  const { user, token } = useAuth();

  const canReview = true;

  const { data: myReviewData, mutate: mutateAssetReviewMine } = useMyAssetReview(id);

  const {
    data: assetReviewData,
    setSize: setAssetReviewSize,
    isLoading: isAssetReviewLoading,
    mutate: mutateAssetReview,
  } = useAssetReviewList({ assetId: id });

  return (
    <AssetReviewSectionContext.Provider
      value={{ mutateAssetReview: mutateAssetReview, mutateAssetReviewMine: mutateAssetReviewMine }}
    >
      <Stack spacing={"xl"} className={classes.all}>
        <Text fz={smallScreen ? 28 : 32}>후기</Text>
        {/* 후기 컨테이너 */}
        <CardContainer className={classes.reviewSection} bg={"white"}>
          <Stack spacing={"lg"}>
            {/* 후기 작성 파트 */}
            <Group className={classes.myReviewGroup}>
              <Avatar
                radius="xl"
                size={smallScreen ? 30 : 46}
                src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
              />
              <Box className={classes.reviewEditorBox}>
                {/* 후기 작성 에디터 파트 혹은 자신이 작성한 후기 보여지는 파트 */}
                {!canReview ? (
                  // 후기 작성 불가
                  <TextInput
                    className={classes.reviewNo}
                    placeholder="게임을 플레이하고 솔직한 후기를 남겨보세요."
                    disabled
                  />
                ) : !myReviewData ? (
                  // myReviewData가 undefined인 경우 제외
                  <></>
                ) : myReviewData.data === null ? (
                  // 후기 작성 가능 && 작성한 후기 없음
                  <AssetTextWriter
                    placeholder={"도움이 되는 착한 후기를 남겨보세요."}
                    assetId={id ? id : ""}
                  />
                ) : (
                  // 작성한 후기 있음
                  <AssetReviewMine assetId={id} data={myReviewData.data} />
                )}
              </Box>
            </Group>
            {/* 다른 사람이 작성한 후기 보여지는 파트 */}
            {assetReviewData?.map((data) => {
              return data.data.data?.map((data) =>
                data.author.email !== token ? <AssetReview assetId={id} data={data} /> : null
              );
            })}
            {isAssetReviewLoading && (
              <Box className={classes.loader}>
                <Loader variant="dots" />
              </Box>
            )}
          </Stack>
        </CardContainer>
      </Stack>
    </AssetReviewSectionContext.Provider>
  );
}
