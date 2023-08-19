import { Group, Loader, Stack } from "@mantine/core";
import { MainSearchBar } from "../../components/pages/asset/MainSearchBar/MainSearchBar";
import { MainLayout } from "../../components/pages/asset/MainLayout/MainLayout";
import { useWindowScroll } from "@mantine/hooks";
import { MovingUpButton } from "../../components/common/MovingUpButton/MovingUpButton";
import { MainSearchRecord } from "../../components/pages/asset/MainSearchRecord/MainSearchRecord";
import { MainTab } from "../../components/pages/asset/MainTab/MainTab";
import { MainAssetSection } from "../../components/pages/asset/MainAssetSection/MainAssetSection";
import { useRouter } from "next/router";
import { MainAssetSearchSection } from "../../components/pages/asset/MainAssetSection/MainAssetSearchSection/MainAssetSearchSection";
import { useState } from "react";
import useAssetList from "../../hooks/useAssetList";
import { MainAsset } from "../../components/pages/asset/MainAssetSection/MainAsset/MainAsset";
import { Carousel } from "@mantine/carousel";

function Asset() {
  const router = useRouter();
  const search = router.query.search;

  const [category, setCategory] = useState("");

  const [scroll, scrollTo] = useWindowScroll();

  const {
    data: assetData,
    isLoading: isAssetLoading,
    setSize: setAssetSize,
    mutate: mutateAsset,
    isEmpty,
  } = useAssetList(category, {
    search: search ? search.toString() : undefined,
  });

  return (
    <MainLayout
      searchSection={
        <MainSearchBar
          onSubmit={(searchKeyword) => {
            if (searchKeyword === "") {
              router.replace("/asset");
            } else {
              router.push(`?search=${searchKeyword}`);
            }
          }}
          MovingUp={() => {
            window.scrollTo(0, 0);
          }}
        />
      }
      searchRecordSection={<MainSearchRecord />}
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
            </>
          </MainAssetSection>
        </Stack>
      )}
    </MainLayout>
  );
}

export default Asset;
