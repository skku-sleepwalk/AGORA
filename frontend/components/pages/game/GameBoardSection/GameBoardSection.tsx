import {
  Avatar,
  Center,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useGameBoardSectionStyles } from "./GameBoardSection.styles";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconPencil, IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { CustomNativeSelect } from "../../../common/CustomNativeSelect/CustomNativeSelect";
import { GameBoard } from "./GameBoard/GameBoard";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { GameBoardWriter } from "./GameBoardWriter/GameBoardWriter";
import useGameBoardList from "../../../../hooks/game/useGameBoardList";
import { GAME_BOARD_CATEGORIES } from "../../../../constants/category";
import { useRouter } from "next/router";
import { GameBoardDetailViewer } from "./GameBoardDetailViewer/GameBoardDetailViewer";
import useAuth from "../../../../hooks/useAuth";

export interface GameBoardSectionProps {
  gameName: string;
  developerName: string;
  developerId: string;
  gameId: string;
}

export function GameBoardSection({
  gameName,
  developerName,
  developerId,
  gameId,
}: GameBoardSectionProps) {
  const smallScreen = useMediaQuery("(max-width: 765px)");
  const { classes, cx } = useGameBoardSectionStyles({ smallScreen });
  const theme = useMantineTheme();

  const [sectionValue, setSectionValue] = useState("전체 보기");
  const [lineUpValue, setLineUpValue] = useState("최신순");

  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState("");
  const {
    data: postData,
    isLoading: isPostLoading,
    setSize: setPostSize,
    mutate: mutatePost,
    isLast,
    isEmpty,
  } = useGameBoardList(
    sectionValue === "전체 보기" ? GAME_BOARD_CATEGORIES : [sectionValue],
    gameId,
    {
      search: search,
      boardType: "parent",
    }
  );

  const router = useRouter();
  const boardId = router.query.board?.toString();
  const { user, openSignInModal } = useAuth();

  return (
    <>
      <Modal
        className={classes.modal}
        opened={opened}
        onClose={close}
        size="auto"
        radius={"lg"}
        centered
        title={
          <Group className={classes.modalTitle}>
            <Avatar
              radius="xl"
              size={smallScreen ? 30 : 46}
              src={"https://avatars.githubusercontent.com/u/52057157?v=4"}
            />
            <Stack spacing={"0.4rem"}>
              <Text fz={smallScreen ? 14 : 18}>{user?.name}</Text>
              <Text fz={smallScreen ? 12 : 14} color={theme.colors.gray[5]}>
                {user?.description}
              </Text>
            </Stack>
          </Group>
        }
      >
        <GameBoardWriter
          opened
          close={() => {
            close();
            mutatePost();
          }}
          gameId={gameId}
          developerId={developerId}
        />
      </Modal>
      {!boardId ? (
        <Stack spacing={"xl"} className={classes.all}>
          <Text fz={smallScreen ? 28 : 32}>게시판</Text>
          {/* 게시판 컨테이너 */}
          <CardContainer className={classes.boardSection} bg={"white"}>
            <Stack className={classes.stack}>
              {/* 게임 타이틀 */}
              <Stack spacing={"0.3rem"}>
                <Title order={smallScreen ? 2 : 1}>{gameName}</Title>
                <Text fz={smallScreen ? 14 : 18} fw={"bold"} color={theme.colors.gray[5]}>
                  {developerName}
                </Text>
              </Stack>
              {/* 정렬 설정 */}
              <Group className={classes.selectGroup} position="apart">
                <CustomNativeSelect
                  data={["전체 보기", ...GAME_BOARD_CATEGORIES]}
                  position="start"
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
                  value={search}
                  onChange={(event) => {
                    setSearch(event.currentTarget.value);
                  }}
                />
                <InvisibleButton
                  className={classes.writeButton}
                  onClick={user ? open : openSignInModal}
                >
                  <Group spacing={"0.2rem"}>
                    <IconPencil size={smallScreen ? "1rem" : "1.4rem"} stroke={1.5} color="white" />
                    <Text fz={smallScreen ? 12 : 14} fw={"normal"} color="white">
                      글쓰기
                    </Text>
                  </Group>
                </InvisibleButton>
              </Group>
              {/* 게시글 파트 */}
              {isEmpty ? (
                <Center mt={"1rem"}>
                  <Text color={theme.colors.gray[4]}>작성된 게시글이 없습니다.</Text>
                </Center>
              ) : (
                postData?.map((data) => {
                  return data.data.data.map((post) => {
                    return <GameBoard key={post.id} post={post} gameId={gameId} />;
                  });
                })
              )}
              {!isLast && (
                <InvisibleButton
                  onClick={() => {
                    setPostSize((prev) => prev + 1);
                  }}
                >
                  <Text fz={16} color={theme.colors.gray[5]}>
                    게시글 더 보기
                  </Text>
                </InvisibleButton>
              )}
            </Stack>
          </CardContainer>
        </Stack>
      ) : (
        <GameBoardDetailViewer boardId={boardId} gameId={gameId} />
      )}
    </>
  );
}
