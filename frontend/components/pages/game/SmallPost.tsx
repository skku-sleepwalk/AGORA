import CardContainer from "../../common/CardContainer/CardContainer";
import UserInfoSmall from "../../common/UserInfoSmall/UserInfoSmall";
import { Group } from "@mantine/core";
import { Text } from "@mantine/core";
import { User } from "../../../types/api/user";
import { Rating } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";

export default function () {
  const hardcodedUser: User = {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    token: 12345,
    rating: 4.5,
    createdAt: "2023-07-19T12:34:56Z",
    updatedAt: "2023-07-19T13:45:22Z",
    deletedAt: null,
    description: "",
  };
  const [value, setValue] = useState(3.5);
  // 그냥 아무거나 집어넣기
  //but 나중에도 description은 비워둬야함
  const [price, setPrice] = useState(9000);

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
  };

  return (
    <CardContainer style={sizeStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <Text size="xs" color="gray">
        어드벤쳐, 인디,RPG
      </Text>

      <Text font-weight="bold" size={20}>
        사그레스
      </Text>

      <Group spacing={63} align="flex-start">
        <UserInfoSmall user={hardcodedUser} />
        <Group spacing={0}>
          <Group spacing={5}>
            <IconHeart size={15} stroke={1.3} />
            <Text size={"xs"}>(1010)</Text>
          </Group>
        </Group>
      </Group>
      <div>
        <Text align="right" size={"lg"}>
          \{price}
        </Text>
      </div>

      <div style={{ marginTop: "200px" }}>1</div>
    </CardContainer>
  );
}
