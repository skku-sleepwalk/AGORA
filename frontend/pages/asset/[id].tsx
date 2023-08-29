import { createContext, useRef, useState } from "react";
import { AssetCarousel } from "../../components/pages/asset/AssetCarousel/AssetCarousel";
import AssetLayout from "../../components/pages/asset/AssetLayout/AssetLayout";
import { AssetSummary } from "../../components/pages/asset/AssetSummary/AssetSummary";
import { AssetTab } from "../../components/pages/asset/AssetTab/AssetTab";
import { AssetInfo } from "../../components/pages/asset/AssetInfo/AssetInfo";
import { AssetRightSide } from "../../components/pages/asset/AssetRightSide/AssetRightSide";
import { AssetReviewSection } from "../../components/pages/asset/AssetReviewSection/AssetReviewSection";
import { useRouter } from "next/router";
import useAsset from "../../hooks/useAsset";

export const AssetContext = createContext({
  mutateAsset: () => {},
});

export const AssetTabClickContext = createContext({
  ontabClick: () => {},
  ontabClickFast: () => {},
});

function AssetDetail() {
  const tabRef = useRef<HTMLDivElement>(null);
  const ontabClick = () => {
    tabRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const ontabClickFast = () => {
    tabRef.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
  };
  const [activeTab, setActiveTab] = useState<string | null>("info");
  const router = useRouter();
  const assetId = router.query.id ? router.query.id.toString() : undefined;
  const { data: assetData, mutate: mutateAsset } = useAsset(assetId);

  return (
    <AssetContext.Provider value={{ mutateAsset }}>
      <AssetTabClickContext.Provider value={{ ontabClick, ontabClickFast }}>
        {assetData && (
          <AssetLayout
            photoSection={<AssetCarousel imgUrls={assetData.data.imgUrls} />}
            summarySection={<AssetSummary asset={assetData.data} />}
            anchorSection={<div ref={tabRef}></div>}
            tabSection={<AssetTab activeTab={activeTab} setActiveTab={setActiveTab} />}
            rightSection={<AssetRightSide asset={assetData.data} />}
          >
            {activeTab === "info" && <AssetInfo asset={assetData.data} />}
            {activeTab === "review" && <AssetReviewSection assetId={assetData.data.id} />}
          </AssetLayout>
        )}
      </AssetTabClickContext.Provider>
    </AssetContext.Provider>
  );
}

export default AssetDetail;
