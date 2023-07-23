import {
  Group,
  Avatar,
  Text,
  Stack,
  Divider,
  Button,
  Badge,
  Center,
  Box,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useGameInfoStyles } from "./GameInfo.styles";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useState } from "react";
import { GameTagModal } from "../GameTagModal/GameTagModal";

export function GameInfo() {
  const { classes, cx } = useGameInfoStyles();
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleIsLiking = () => {
    setIsLiking((prev) => !prev);
  };
  const handleIsFollowing = () => {
    setIsFollowing((prev) => !prev);
  };

  // 태그
  const data = [
    "농장 시뮬레이션",
    "생활 시뮬레이션",
    "픽셀 그래픽",
    "힐링",
    "끊을 줄 모르는",
    "최고인",
    "잊을 수 없는",
  ];
  const tags = data.map((item) => <Box className={classes.tag}>{item}</Box>);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="태그 추가" centered>
        {/* Modal content */}
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
              Stardew Valley
            </Text>
          </Group>
          <Group spacing={"xs"}>
            <InvisibleButton onClick={handleIsLiking}>
              {isLiking ? (
                // <Image width={"2rem"} height={"2rem"} src="../../../public/HeartFilled.png" />
                <IconHeartFilled size={"2rem"} stroke={1} />
              ) : (
                <IconHeart size={"2rem"} stroke={1} />
              )}
            </InvisibleButton>
            <Text fz={16}>(1679)</Text>
          </Group>
        </Group>
        <Group position="apart" className={cx(classes.alignTop, classes.marginBottom)}>
          <Stack spacing={"xs"}>
            <Group spacing={"2rem"}>
              <Text className={classes.grayText} fw={"bold"}>
                개발사
              </Text>
              <Text
                className={classes.blueText}
                fw={"bold"}
                component="a"
                href="https://mantine.dev"
              >
                Concerned Ape
              </Text>
            </Group>
            <Group spacing={"2rem"}>
              <Text className={classes.grayText} fw={"bold"}>
                배급사
              </Text>
              <Text
                className={classes.blueText}
                fw={"bold"}
                component="a"
                href="https://mantine.dev"
              >
                Concerned Ape
              </Text>
            </Group>
          </Stack>
          <InvisibleButton onClick={handleIsFollowing}>
            {isFollowing ? (
              <Badge
                className={classes.followBadge}
                color="gray"
                size="lg"
                radius="xl"
                leftSection={
                  <Avatar
                    size={24}
                    radius={"lg"}
                    src="https://avatars.githubusercontent.com/u/55127132?v=4"
                  />
                }
              >
                팔로잉
              </Badge>
            ) : (
              <Badge
                className={classes.followBadge}
                size="lg"
                radius="xl"
                leftSection={
                  <Avatar
                    size={24}
                    radius={"lg"}
                    src="https://avatars.githubusercontent.com/u/55127132?v=4"
                  />
                }
              >
                팔로우
              </Badge>
            )}
          </InvisibleButton>
        </Group>
        <Divider />
        <Group spacing={"2rem"} className={classes.marginTop}>
          <Text className={classes.grayText} fw={"bold"}>
            장르
          </Text>
          <Group spacing={"0.5rem"} className={classes.blueText}>
            <Text fw={"bold"} component="a" href="https://mantine.dev">
              인디,
            </Text>
            <Text fw={"bold"} component="a" href="https://mantine.dev">
              RPG,
            </Text>
            <Text fw={"bold"} component="a" href="https://mantine.dev">
              시뮬레이션
            </Text>
          </Group>
        </Group>
        <Group spacing={"2rem"}>
          <Text className={classes.grayText} fw={"bold"}>
            이용 등급
          </Text>
          <Text className={classes.blueText} fw={"bold"} component="a" href="https://mantine.dev">
            12세 이용가
          </Text>
        </Group>
        <Text className={cx(classes.grayText, classes.marginBottom)} fw={"bold"}>
          출시일: 2016년 2월 17일
        </Text>
        <Divider />
        <Text className={cx(classes.marginLeft, classes.marginTop)} fw={"bold"}>
          이 게임의 인기 태그 :
        </Text>
        <Group spacing={0}>
          <Box className={classes.tagBox}>
            {tags}
            <Button className={classes.addButton} onClick={open}>
              +
            </Button>
          </Box>
        </Group>
        {true && (
          <Group className={classes.marginLeft} position="apart">
            <Button className={classes.sellButton}>
              <Stack spacing={"xs"}>
                <Group position="center" spacing={"xs"} className={classes.alignBottom}>
                  {true && (
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
        )}
        {false && (
          <Button className={cx(classes.marginLeft, classes.sellButton)} w={"100%"}>
            <Stack>
              <Center>
                <Text fz={28}>게임 시작</Text>
              </Center>
              <Center>
                <Text fz={12} fw={"normal"}>
                  마지막 플레이 2분 전
                </Text>
              </Center>
            </Stack>
          </Button>
        )}
      </Stack>
    </>
  );
}
