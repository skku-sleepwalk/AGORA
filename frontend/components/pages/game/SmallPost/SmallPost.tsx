import CardContainer from "../../../common/CardContainer/CardContainer";
import { Avatar, Group, Image } from "@mantine/core";
import { Text } from "@mantine/core";
import { useState } from "react";
import { CSSProperties } from "react";
import { Game } from "../../../../types/api/game/game";
import Link from "next/link";
export interface PostViewerProps {
  post: Game;
  thumbnailUrl?: string;
}
export default function ({ post, thumbnailUrl }: PostViewerProps) {
  // 그냥 아무거나 집어넣기
  //but 나중에도 description은 비워둬야함

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const sizeStyle = {
    transform: isHovered ? "scale(1.1)" : "scale(1)", // 원하는 크기로 조절
    transition: "transform 0.3s ease",
    height: "20rem",
    width: "16rem",
    padding: "0px",
    overflow: "hidden",
  };
  const margins = {
    marginLeft: "1rem",
    marginTop: "0.5rem",
  };
  const containerStyle: CSSProperties = {
    position: "relative", // 이미지와 반투명 창을 겹치기 위해 컨테이너를 relative로 설정합니다.
    width: "320px", // 이미지의 가로 크기에 맞게 조절합니다.
    height: "100rem", // 고정된 높이
    overflow: "hidden", // 내용이 넘칠 경우 잘라냅니다.
  };
  const overlayStyle: CSSProperties = {
    position: "absolute", // 텍스트와 반투명 창을 absolute로 설정하여 떠오르게 만듭니다.
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 배경 색상
    color: "white", // 텍스트 색상
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1, // 초기에는 반투명 창을 숨깁니다.
    transition: "opacity 0.3s ease",
  };
  const overlayStyle2: CSSProperties = {
    position: "absolute", // 텍스트와 반투명 창을 absolute로 설정하여 떠오르게 만듭니다.
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "10rem",
    width: "16rem",
    // 반투명한 배경 색상
    color: "white", // 텍스트 색상
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1, // 초기에는 반투명 창을 숨깁니다.
    transition: "opacity 0.3s ease",
  };
  const namesArray = post.genres?.map((item) => item.name);
  const newarray = namesArray?.join(", ");
  console.log(post.store?.cost);

  return (
    <Link href={`/game/${post.id}`} style={{ textDecoration: "none", color: "black" }}>
      <CardContainer style={sizeStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        <Text size="xs" color="gray" style={margins}>
          {newarray}
        </Text>
        {/* 여기 맵이든 뭐든 해야할듯 */}
        <Text font-weight="bold" size={20} style={margins}>
          {post.title}
        </Text>
        <Group position="apart" style={margins}>
          <Group spacing={7}>
            <Avatar
              src="https://avatars.githubusercontent.com/u/52057157?v=4"
              radius="xl"
              size={20}
            />
            <Text size="xs">{post.store.developer}</Text>
          </Group>
          <Group spacing={0}>
            <Group spacing={4} style={{ marginRight: "1rem" }}>
              <Image width={"0.8rem"} height={"0.65rem"} src="/images/HeartFilled.svg" />
              <Text size={"xs"}>{post.likeCount}</Text>
            </Group>
          </Group>
        </Group>
        <Group>
          {post.store.cost?.isSale ? (
            <Text
              style={{ marginLeft: "190px" }}
              align="right"
              td="line-through"
              c="gray"
              size={"md"}
            >
              \{post.store?.cost?.defaultPrice}
            </Text>
          ) : null}
        </Group>
        <div style={{ marginRight: "1rem" }}>
          {post.store.cost?.isFree ? (
            <Text align="right" size={"lg"}>
              FREE
            </Text>
          ) : post.store.cost?.isSale ? (
            <Group style={{ paddingLeft: "124px" }}>
              <Text style={{ backgroundColor: "#F1A2A2" }}>-{post.store.cost.salePercentage}%</Text>
              <Text size={"lg"}>\{post.store?.cost?.saledPrice}</Text>
            </Group>
          ) : (
            <Text align="right" size={"lg"}>
              \{post.store?.cost?.defaultPrice}
            </Text>
          )}
        </div>
        <div style={containerStyle}>
          <img src={post.shortImgUrl} height={"400rem"} />
          {/* hover 시에 반투명 창과 텍스트를 떠오르게 표시합니다. */}
          {isHovered && (
            <div>
              <div style={overlayStyle}></div>
              <div style={overlayStyle2}>
                <p>{post.shortContent}</p>
                {/* 추가적인 텍스트 또는 아이콘 등을 넣을 수 있습니다. */}
              </div>
            </div>
          )}
        </div>
      </CardContainer>
    </Link>
  );
}
