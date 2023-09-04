import {
  Group,
  Avatar,
  Text,
  Stack,
  Divider,
  Button,
  Badge,
  Image,
  Center,
  Box,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useGameSummaryStyles } from "./GameSummary.styles";
import { IconHeart } from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useContext, useEffect, useRef, useState } from "react";
import { GameTagModal } from "../GameTagModal/GameTagModal";
import { Game } from "../../../../types/api/game/game";
import useAuth from "../../../../hooks/useAuth";
import { DelGameLike, PostGameLike } from "../../../../utils/api/game/game/gameLike";
import { GameContext } from "../../../../pages/game/[id]";
import { useUserPlaytimes } from "../../../../hooks/game/useUserPlaytimes";
import { hasPlaytime } from "../GameReviewSection/GameReviewSection";
import { GamePlayModal } from "./GamePlayModal/GamePlayModal";

interface GameSummaryProps {
  postData: Game;
}

export function GameSummary({ postData }: GameSummaryProps) {
  const { classes, cx } = useGameSummaryStyles();
  const { user, token, openSignInModal } = useAuth();

  const [tagModalOpened, { open: tagModalOpen, close: tagModalClose }] = useDisclosure(false);
  const [playModalOpened, { open: playModalOpen, close: playModalClose }] = useDisclosure(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const { mutatePost } = useContext(GameContext);

  // 좋아요 관련
  const handleIsLiking = () => {
    if (postData.like) {
      DelGameLike(postData.id, token).then(() => {
        mutatePost();
      });
    } else {
      PostGameLike(postData.id, token).then(() => {
        mutatePost();
      });
    }
  };

  // 팔로우 관련
  const handleIsFollowing = () => {
    setIsFollowing((prev) => !prev);
  };

  // 출시일 관련
  const createstring = postData.createdAt;
  let [year, month, day] = createstring?.split("-") || [null, null, null];
  const formattedString = `${year}년 ${month}월 ${day?.slice(0, 2)}일`;

  // 태그
  const { data: me } = useUserPlaytimes();
  const canReview = me !== undefined ? hasPlaytime(me.data.playtimes, postData.id) : false;
  const tags = postData.popularTags.map((item) => <Box className={classes.tag}>{item.name}</Box>);

  const overflowRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState<boolean | null>(null);
  const checkOverflow = () => {
    if (!overflowRef.current) {
      return null;
    }
    return overflowRef.current.scrollHeight > overflowRef.current.clientHeight;
  };
  useEffect(() => {
    setIsOverflowed(checkOverflow());
  }, []);

  return (
    <>
      <Modal
        className={classes.modal}
        opened={tagModalOpened}
        onClose={tagModalClose}
        title="태그 추가"
        centered
      >
        <GameTagModal onClose={tagModalClose} gameId={postData.id} />
      </Modal>
      <Modal opened={playModalOpened} onClose={playModalClose} withCloseButton={false} centered>
        <GamePlayModal postData={postData} onCloseClick={playModalClose} />
      </Modal>
      <Stack spacing={"1rem"} className={classes.stack}>
        <Group position="apart">
          <Group>
            <Avatar
              size={"3.75rem"}
              radius={"md"}
              src={
                "https://play-lh.googleusercontent.com/He92papZcOmkgTi1sLHXQQb02aoyRtJ8ml96njM_cSAcpHhILvxMjhLix4mYEIKXPq4=s96-rw"
              }
            />
            <Text fw={"bold"} fz={20}>
              {postData.store?.title}
            </Text>
          </Group>
          <Group spacing={"xs"}>
            <InvisibleButton onClick={handleIsLiking}>
              {postData.like ? (
                <Image
                  className={classes.heartFilled}
                  width={"1.6rem"}
                  height={"1.5rem"}
                  src={"/images/HeartFilled.svg"}
                />
              ) : (
                <IconHeart size={"2rem"} stroke={1} />
              )}
            </InvisibleButton>
            <Text fz={16}>({postData.likeCount})</Text>
          </Group>
        </Group>
        <Group className={cx(classes.alignTop, classes.marginBottom)}>
          <Stack spacing={"xs"} w={"100%"}>
            <Group position="apart">
              <Group spacing={"2rem"}>
                <Text className={classes.grayText} fw={"bold"}>
                  개발사
                </Text>
                <Text className={classes.blueText} fw={"bold"} component="a" href="#">
                  {postData.store?.developer}
                </Text>
              </Group>
              <InvisibleButton onClick={handleIsFollowing}>
                <Badge
                  className={classes.followBadge}
                  color={isFollowing ? "gray" : "teal"}
                  size="lg"
                  radius="md"
                  leftSection={
                    <Avatar
                      size={24}
                      radius={"lg"}
                      src="https://avatars.githubusercontent.com/u/52057157?v=4"
                    />
                  }
                >
                  {isFollowing ? "팔로잉" : "팔로우"}
                </Badge>
              </InvisibleButton>
            </Group>
            <Group spacing={"2rem"}>
              <Text className={classes.grayText} fw={"bold"}>
                배급사
              </Text>
              <Text className={classes.blueText} fw={"bold"} component="a" href="#">
                {postData.store?.distributor}
              </Text>
            </Group>
          </Stack>
        </Group>
        <Divider />
        <Group spacing={"2rem"} className={classes.marginTop}>
          <Text className={classes.grayText} fw={"bold"}>
            장르
          </Text>
          <Group spacing={"0.5rem"} className={classes.blueText}>
            {postData.genres?.map((data) => {
              return (
                <Text fw={"bold"} component="a" href="/game/allGame">
                  {data.name}
                </Text>
              );
            })}
          </Group>
        </Group>
        <Group spacing={"2rem"}>
          <Text className={classes.grayText} fw={"bold"}>
            이용 등급
          </Text>
          <Text className={classes.blueText} fw={"bold"} component="a" href="#">
            12세 이용가
          </Text>
        </Group>
        <Text className={cx(classes.grayText, classes.marginBottom)} fw={"bold"}>
          출시일: {formattedString}
        </Text>
        <Divider />
        <Text className={cx(classes.marginLeft, classes.marginTop)} fw={"bold"}>
          이 게임의 인기 태그 :
        </Text>
        <Box className={classes.tagGroup}>
          <Box className={classes.tagBox} ref={overflowRef}>
            {tags}
            {canReview && (
              <Button
                className={cx(classes.addButton, isOverflowed ? classes.addButton_A : null)}
                onClick={tagModalOpen}
              >
                +
              </Button>
            )}
          </Box>
        </Box>
        {/* {!postData.isPlayable && (
          <Group className={classes.marginLeft} position="apart">
            <Button className={classes.sellButton}>
              <Stack spacing={"xs"}>
                <Group position="center" spacing={"xs"} className={classes.alignBottom}>
                  {postData.store.cost?.isSale && (
                    <Text fz={12} fw={"normal"} td="line-through">
                      ￦ 16,000
                    </Text>
                  )}
                  <Text fz={28}>￦ 13,000</Text>
                </Group>
                <Center>
                  <Text fz={12} fw={"normal"}>
                    장바구니에 담기
                  </Text>
                </Center>
              </Stack>
            </Button>
            <Button className={classes.passButton} variant="outline" color="dark">
              <Stack spacing={"xs"}>
                <Center>
                  <Text fz={28}>패스</Text>
                </Center>
                <Text fz={12} c={"gray"}>
                  무료로 플레이
                </Text>
              </Stack>
            </Button>
          </Group>
        )} */}
        <Group className={classes.marginLeft} position="apart">
          {/* <Button className={cx(classes.sellButton)} onClick={onDownloadClick}>
            <Stack spacing={"sm"}>
              <Center>
                <Text fz={28}>게임 다운로드</Text>
              </Center>
            </Stack>
          </Button> */}
          <Button
            className={cx(classes.sellButton)}
            onClick={
              user
                ? playModalOpen
                : () => {
                    openSignInModal();
                  }
            }
          >
            <Stack spacing={"sm"}>
              <Center>
                <Text fz={28}>게임 시작</Text>
              </Center>
              {/* <Center>
                <Text fz={12} fw={"normal"}>
                  마지막 플레이 2분 전
                </Text>
              </Center> */}
            </Stack>
          </Button>
        </Group>
      </Stack>
    </>
  );
}
