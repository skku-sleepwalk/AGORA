import { Center, Group, Loader, Stack, Text, useMantineTheme } from "@mantine/core";
import { MainSearchBar } from "../../components/pages/asset/MainSearchBar/MainSearchBar";
import { MainLayout } from "../../components/pages/asset/MainLayout/MainLayout";
import { useWindowScroll } from "@mantine/hooks";
import { MovingUpButton } from "../../components/common/MovingUpButton/MovingUpButton";
import { MainSearchHistory } from "../../components/pages/asset/MainSearchHistory/MainSearchHistory";
import { MainTab } from "../../components/pages/asset/MainTab/MainTab";
import { MainAssetSection } from "../../components/pages/asset/MainAssetSection/MainAssetSection";
import { useRouter } from "next/router";
import { MainAssetSearchSection } from "../../components/pages/asset/MainAssetSection/MainAssetSearchSection/MainAssetSearchSection";
import { createContext, useEffect, useState } from "react";
import useAssetList from "../../hooks/useAssetList";
import { MainAsset } from "../../components/pages/asset/MainAssetSection/MainAsset/MainAsset";
import { Carousel } from "@mantine/carousel";
import { useAssetSearchHistory } from "../../hooks/useAssetSearchHistory";

export const AssetContext = createContext({
  mutateSearchHistory: () => {},
});

function Asset() {
  const theme = useMantineTheme();
  const router = useRouter();
  const search = router.query.search;

  const [category, setCategory] = useState("");

  // asset 목록을 가져옴
  const {
    data: assetData,
    isLoading: isAssetLoading,
    setSize: setAssetSize,
    mutate: mutateAsset,
    isEmpty,
  } = useAssetList(category, {
    search: search ? search.toString() : undefined,
  });

  // 검색 기록을 가져옴
  const {
    data: historyData,
    isLoading: isHistoryLoading,
    mutate: mutateSearchHistory,
  } = useAssetSearchHistory();

  const [scroll, scrollTo] = useWindowScroll();
  const [scrollThreshold, setScrollThreshold] = useState(0);

  useEffect(() => {
    if (scroll.y >= scrollThreshold) {
      setAssetSize((prev) => prev + 1);
      setScrollThreshold((prev) => prev + 1000);
      // console.log("scroll");
    }
  }, [scroll.y]);

  return (
    <AssetContext.Provider value={{ mutateSearchHistory }}>
      <MainLayout
        searchSection={
          <MainSearchBar
            onSubmit={(searchKeyword) => {
              if (searchKeyword === "") {
                router.replace("/asset");
              } else {
                router.push(`?search=${searchKeyword}`);
              }
              mutateSearchHistory();
            }}
            MovingUp={() => {
              window.scrollTo(0, 0);
            }}
          />
        }
        searchRecordSection={
          <MainSearchHistory data={historyData?.data} isLoading={isHistoryLoading} />
        }
        tabSection={
          <MainTab
            onTabChange={(category) => setCategory(category)}
            MovingUp={() => {
              window.scrollTo(0, 0);
            }}
            scrollY={scroll.y}
          />
        }
        movingUpButtonSection={
          <MovingUpButton MovingUp={() => scrollTo({ y: 0 })} scrollY={scroll.y} />
        }
      >
        {search ? (
          <Stack spacing={"2rem"}>
            <MainAssetSearchSection searchKeyword={typeof search === "string" ? search : search[0]}>
              <>
                {assetData?.map((data) => {
                  return data.data.data.map((data) => <MainAsset assetData={data} />);
                })}
                {isEmpty && (
                  <Center w={"100%"} h={"5rem"}>
                    <Text c={theme.colors.gray[6]}>검색 결과가 없습니다.</Text>
                  </Center>
                )}
              </>
            </MainAssetSearchSection>
            {isAssetLoading && (
              <Group position="center">
                <Loader color="teal" variant="dots" />
              </Group>
            )}
          </Stack>
        ) : (
          <Stack spacing={"4rem"}>
            <MainAssetSection title="신규 에셋">
              <>
                {assetData?.map((data) => {
                  return data.data.data.map((data) => (
                    <Carousel.Slide>
                      <MainAsset assetData={data} />
                    </Carousel.Slide>
                  ));
                })}
                {isAssetLoading && (
                  <Center w={"10rem"} h={"16.9rem"}>
                    <Loader color="teal" variant="dots" />
                  </Center>
                )}
              </>
            </MainAssetSection>
          </Stack>
        )}
      </MainLayout>
    </AssetContext.Provider>
  );
}

export default Asset;
