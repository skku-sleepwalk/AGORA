import { useState } from "react";

import { Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { extractThumbnailUrl } from "../../../../utils/api/ViewPhotos";
import Stories from "./Stories";

export function DevelopStories() {
  const [Title, setTitle] = useState("개발일지 몰아보기");

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
        <Stories></Stories>
      </div>
    </div>
  );
}
