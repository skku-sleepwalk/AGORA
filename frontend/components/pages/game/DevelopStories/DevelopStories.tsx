import { Children, useState } from "react";

import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { extractThumbnailUrl } from "../../../../utils/api/ViewPhotos";
import Stories from "./Stories";
export interface DevelopStoriesProps {
  children: React.ReactNode;
  TitleProp: string;
}
export function DevelopStories({ children, TitleProp }: DevelopStoriesProps) {
  const [Title, setTitle] = useState(TitleProp);
  console.log(TitleProp);
  return (
    <div style={{ marginTop: "5rem" }}>
      <Text
        style={{ marginLeft: "40px", marginTop: "20px", marginBottom: "30px" }}
        size={25}
        weight={"bold"}
      >
        {Title}
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
