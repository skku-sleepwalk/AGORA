import { createContext, useRef, useState } from "react";
import { AssetCarousel } from "../../components/pages/asset/AssetCarousel/AssetCarousel";
import AssetLayout from "../../components/pages/asset/AssetLayout/AssetLayout";
import { AssetSummary } from "../../components/pages/asset/AssetSummary/AssetSummary";
import { AssetTab } from "../../components/pages/asset/AssetTab/AssetTab";
import { AssetInfo } from "../../components/pages/asset/AssetInfo/AssetInfo";
import { AssetRightSide } from "../../components/pages/asset/AssetRightSide/AssetRightSide";
import { AssetReviewSection } from "../../components/pages/asset/AssetReviewSection/AssetReviewSection";

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

  return (
    <AssetTabClickContext.Provider value={{ ontabClick, ontabClickFast }}>
      <AssetLayout
        photoSection={<AssetCarousel />}
        summarySection={
          <AssetSummary
            asset={{
              id: "string",
              cost: {
                isFree: false,
                defaultPrice: 3000,
                isSale: true,
                salePercentage: 10,
                saledPrice: 2700,
                saleStartAt: "2023-08-16T07:55:44.356Z",
                saleEndAt: "2023-08-16T07:55:44.356Z",
              },
              title: "포탈",
              description: "포탈 설명",
              author: "발브",
              downloadUrl: "https://portal.com",
              createdAt: "2023-08-16T07:55:44.356Z",
              updatedAt: "2023-08-16T07:55:44.356Z",
              deletedAt: "2023-08-16T07:55:44.356Z",
              likeCount: 3,
              like: true,
            }}
          />
        }
        anchorSection={<div ref={tabRef}></div>}
        tabSection={<AssetTab activeTab={activeTab} setActiveTab={setActiveTab} />}
        rightSection={<AssetRightSide />}
      >
        {activeTab === "info" && <AssetInfo />}
        {activeTab === "review" && <AssetReviewSection />}
      </AssetLayout>
    </AssetTabClickContext.Provider>
  );
}

export default AssetDetail;
