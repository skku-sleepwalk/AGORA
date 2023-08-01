import {
  Button,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useGameBoardSectionStyles } from "./GameBoardSection.styles";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useMediaQuery } from "@mantine/hooks";
import { IconPencil, IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { CustomNativeSelect } from "../../../common/CustomNativeSelect/CustomNativeSelect";
import { GameBoard } from "./GameBoard/GameBoard";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";

export function GameBoardSection() {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameBoardSectionStyles({ smallScreen });
  const theme = useMantineTheme();

  const [sectionValue, setSectionValue] = useState("전체 보기");
  const [lineUpValue, setLineUpValue] = useState("최신순");

  return (
    <Stack spacing={"xl"} className={classes.all}>
      <Text fz={smallScreen ? 28 : 32}>게시판</Text>
      {/* 게시판 컨테이너 */}
      <CardContainer className={classes.boardSection} bg={"white"}>
        <Stack className={classes.stack}>
          {/* 게임 타이틀 */}
          <Stack spacing={"0.3rem"}>
            <Title order={smallScreen ? 2 : 1}>Stardew Valley</Title>
            <Text fz={smallScreen ? 14 : 18} fw={"bold"} color={theme.colors.gray[5]}>
              Concerned Ape
            </Text>
          </Stack>
          {/* 정렬 설정 */}
          <Group className={classes.selectGroup} position="apart">
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
          {/* 검색 및 글쓰기 버튼 파트 */}
          <Group>
            <TextInput
              className={classes.Search}
              icon={<IconSearch size="1rem" color="black" />}
              rightSection={
                <InvisibleButton>
                  <IconX onClick={() => {}} size={"1rem"} stroke={"0.15rem"} color="#bdc3cd" />
                </InvisibleButton>
              }
              placeholder="원하는 글을 검색해보세요."
            />
            <UnstyledButton className={classes.writeButton}>
              <Group spacing={"0.2rem"}>
                <IconPencil size={smallScreen ? "1rem" : "1.4rem"} stroke={1.5} color="white" />
                <Text fz={smallScreen ? 12 : 14} fw={"normal"} color="white">
                  글쓰기
                </Text>
              </Group>
            </UnstyledButton>
          </Group>
          {/* 게시글 파트 */}
          <GameBoard />
          <GameBoard />
          <GameBoard />
        </Stack>
      </CardContainer>
    </Stack>
  );
}
