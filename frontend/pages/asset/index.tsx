import { Box, Stack } from "@mantine/core";
import { MainSearchBar } from "../../components/pages/asset/MainSearchBar/MainSearchBar";
import { MainLayout } from "../../components/pages/asset/MainLayout/MainLayout";
import { useWindowScroll } from "@mantine/hooks";
import { MovingUpButton } from "../../components/common/MovingUpButton/MovingUpButton";
import { MainSearchRecord } from "../../components/pages/asset/MainSearchRecord/MainSearchRecord";
import { MainTab } from "../../components/pages/asset/MainTab/MainTab";
import { MainAssetSection } from "../../components/pages/asset/MainAssetSection/MainAssetSection";

function Asset() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <MainLayout
      searchSection={<MainSearchBar MovingUp={() => scrollTo({ y: 0 })} />}
      searchRecordSection={<MainSearchRecord />}
      tabSection={<MainTab MovingUp={() => scrollTo({ y: 4 * 16 })} scrollY={scroll.y} />}
      movingUpButtonSection={
        <MovingUpButton MovingUp={() => scrollTo({ y: 0 })} scrollY={scroll.y} />
      }
    >
      <Stack spacing={"4rem"}>
        <MainAssetSection title="유료 인기" />
        <MainAssetSection title="무료 인기" />
      </Stack>
    </MainLayout>
  );
}

export default Asset;
