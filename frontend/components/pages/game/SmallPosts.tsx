import { useState } from "react";
import SmallPost from "./SmallPost";
import { Text } from "@mantine/core";
export function SmallPosts() {
  const [Title, setTitle] = useState("납량의 날 특집");
  return (
    <div>
      <Text
        style={{ marginLeft: "40px", marginTop: "20px", marginBottom: "30px" }}
        size={25}
        weight={"bold"}
      >
        {Title}
      </Text>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "300px", marginLeft: "30px" }}>
          <SmallPost></SmallPost>
        </div>
        <div style={{ width: "300px", marginLeft: "30px" }}>
          <SmallPost></SmallPost>
        </div>
        <div style={{ width: "300px", marginLeft: "30px" }}>
          <SmallPost></SmallPost>
        </div>
        <div style={{ width: "300px", marginLeft: "30px" }}>
          <SmallPost></SmallPost>
        </div>
        <div style={{ width: "300px", marginLeft: "30px" }}>
          <SmallPost></SmallPost>
        </div>
      </div>
    </div>
  );
}
