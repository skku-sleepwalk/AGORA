import { Button, Group, NativeSelect, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { useGameBoardSectionStyles } from "./GameBoardSection.styles";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useMediaQuery } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { CustomNativeSelect } from "../../../common/CustomNativeSelect/CustomNativeSelect";

export function GameBoardSection() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameBoardSectionStyles();
  const theme = useMantineTheme();

  const [sectionValue, setSectionValue] = useState("전체 보기");
  const [lineUpValue, setLineUpValue] = useState("");

  return (
    <Stack spacing={"xl"}>
      <Text fz={smallScreen ? 28 : 32}>게시판</Text>
      {/* 게시판 컨테이너 */}
      <CardContainer className={classes.boardSection} bg={"white"}>
        <Stack spacing={"xl"}>
          {/* 게임 타이틀 & 글쓰기 버튼 */}
          <Group align="flex-start" position="apart">
            <Stack spacing={"0.3rem"}>
              <Title order={smallScreen ? 2 : 1}>Stardew Valley</Title>
              <Text fz={smallScreen ? 14 : 18} fw={"bold"} color={theme.colors.gray[5]}>
                Concerned Ape
              </Text>
            </Stack>
            <Button className={classes.writeButton}>
              <Group spacing={"0.2rem"}>
                <IconPencil size={smallScreen ? "0.9rem" : "1.4rem"} stroke={1.5} />
                <Text fz={smallScreen ? 12 : 16} fw={"normal"} color="white">
                  글쓰기
                </Text>
              </Group>
            </Button>
          </Group>
          {/* 정렬 설정 */}
          <Group position="apart">
            <CustomNativeSelect
              data={["전체 보기", "공지사항", "업데이트", "개발일지", "리뷰", "공략", "뻘글"]}
              defaultValue={sectionValue}
              onChange={(value) => {
                setSectionValue(value);
              }}
            />
            <CustomNativeSelect
              data={["최신순", "조회순", "인기순", "댓글순"]}
              defaultValue={lineUpValue}
              onChange={(value) => {
                setLineUpValue(value);
              }}
            />
          </Group>
        </Stack>
      </CardContainer>
    </Stack>
  );
}
