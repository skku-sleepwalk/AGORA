import CardContainer from "../../../common/CardContainer/CardContainer";
import { Box, Button, Center, Group, Image, Stack, Text, useMantineTheme } from "@mantine/core";
import { useGameRightSideStyles } from "./GameRightSide.styles";
import { useSetState } from "@mantine/hooks";
import { Game } from "../../../../types/api/game/game";

interface GameDataProps {
  postData: Game | undefined;
  loading?: boolean;
}
export function GameRightSide({ postData, loading }: GameDataProps) {
  const { classes, cx } = useGameRightSideStyles();

  const theme = useMantineTheme();

  // SNS 바로가기 관련
  const [SNSstate, setSNSstate] = useSetState({
    twiter: true,
    Insta: false,
    Face: false,
    Youtube: true,
    twitch: true,
    Homepi: true,
  });

  const trueCount = Object.values(SNSstate).filter((value) => value === true).length;
  const emptyBox = [];
  for (let i = 0; i < trueCount; i++) {
    emptyBox.push(<Box w={"4rem"} key={i}></Box>);
  }

  return (
    <Stack className={classes.stack} spacing={"3rem"}>
      {/* 첫 번째 컨테이너 */}
      <CardContainer className={cx(classes.container, classes.alignCenter)} h={"7rem"}>
        <Group className={classes.containerPadding} spacing={"sm"}>
          <Stack spacing={"lg"}>
            <Image
              className={classes.heartFilled}
              width={"1.7rem"}
              height={"1.5rem"}
              src={"/images/HeartFilled.svg"}
            />
            <Image className={classes.heartFilled} height={"1.5rem"} src={"/Images/GamePad.svg"} />
          </Stack>
          <Stack spacing={"1.8rem"}>
            <Group spacing={0}>
              <Text fw={"bold"} c={theme.colors.gray[6]}>
                {postData?.likeCount}
              </Text>
              <Text c={theme.colors.gray[6]}>명의 사람들이 이 게임을 찜했습니다.</Text>
            </Group>
            <Group spacing={0}>
              <Text fw={"bold"}>-</Text>
              <Text>명의 사람들이 이 게임을 플레이하였습니다.</Text>
            </Group>
          </Stack>
        </Group>
      </CardContainer>
      {/* 두 번째 컨테이너 */}
      <CardContainer className={classes.container} h={"12rem"}>
        <Stack className={classes.containerPadding} spacing={"xl"}>
          <Text fw={"bold"}>개발사 SNS 바로가기</Text>
          {/* 최대 4개의 바로가기 선택 가능 */}
          <Group className={classes.shortCutsGroup} spacing={"2rem"} position="center">
            {/* 트위터 */}
            {SNSstate.twiter && (
              <Stack spacing={"sm"} align="center">
                <Image width={"4rem"} src={"/images/Twiter.svg"} />
                <Text
                  className={classes.text}
                  component="a"
                  href={postData?.store?.snsUrls?.twitter}
                  c={theme.colors.gray[6]}
                >
                  Twitter
                </Text>
              </Stack>
            )}
            {/* 인스타 */}
            {SNSstate.Insta && (
              <Stack spacing={"sm"} align="center">
                <Image width={"4rem"} src={"/images/Instagram.png"} />
                <Text
                  className={classes.text}
                  component="a"
                  href={postData?.store?.snsUrls?.instagram}
                  c={theme.colors.gray[6]}
                >
                  Instagram
                </Text>
              </Stack>
            )}
            {/* 페이스북 */}
            {SNSstate.Face && (
              <Stack spacing={"sm"} align="center">
                <Image width={"4rem"} src={"/images/Facebook.svg"} />
                <Text
                  className={classes.text}
                  component="a"
                  href={postData?.store.snsUrls?.facebook}
                  c={theme.colors.gray[6]}
                >
                  Facebook
                </Text>
              </Stack>
            )}
            {/* 유튜브 */}
            {SNSstate.Youtube && (
              <Stack spacing={"sm"} align="center">
                <Image width={"4rem"} src={"/images/YouTube.png"} />
                <Text
                  className={classes.text}
                  component="a"
                  href={postData?.store?.snsUrls?.youtube}
                  c={theme.colors.gray[6]}
                >
                  Youtube
                </Text>
              </Stack>
            )}
            {/* 트위치 */}
            {SNSstate.twitch && (
              <Stack spacing={"sm"} align="center">
                <Image width={"4rem"} src={"/images/Twitch.svg"} />
                <Text
                  className={classes.text}
                  component="a"
                  href={postData?.store?.snsUrls?.twitch}
                  c={theme.colors.gray[6]}
                >
                  Twitch
                </Text>
              </Stack>
            )}
            {/* 홈페이지 */}
            {SNSstate.Homepi && (
              <Stack spacing={"sm"} align="center">
                <Image width={"4rem"} src={"/images/Homepage.svg"} />
                <Text
                  className={classes.text}
                  component="a"
                  href={postData?.store?.snsUrls?.customPage}
                  c={theme.colors.gray[6]}
                >
                  홈페이지
                </Text>
              </Stack>
            )}
            {/* 정렬용 빈 상자 */}
            <>{emptyBox}</>
          </Group>
        </Stack>
      </CardContainer>
      {/* 세 번째 컨테이너 */}
      {/* {!postData?.isPlayable && (
        <CardContainer className={classes.container} h={"12rem"}>
          <Stack spacing={"sm"} className={classes.containerPadding}>
            <Text fw={"bold"}>구매</Text>
            <Text fz={22} fw={"bold"}>
              {postData?.store?.title}
            </Text>
            <Group className={classes.marginTop} spacing={"xs"} position="right">
              {true && (
                <Box className={classes.percent}>
                  <Text fz={16} fw={"bold"}>
                    -{postData?.store?.cost?.salePercentage}%
                  </Text>
                </Box>
              )}
              <Text fz={26} fw={"bold"}>
                ￦ {postData?.store?.cost?.saledPrice}
              </Text>
              {true && (
                <Text
                  className={classes.realPrice}
                  fz={18}
                  td="line-through"
                  c={theme.colors.gray[6]}
                >
                  ￦ {postData?.store?.cost?.defaultPrice}
                </Text>
              )}
            </Group>
            <Group>
              <Button className={classes.sellButton}>
                <Text fz={18} fw={"normal"}>
                  장바구니에 담기
                </Text>
              </Button>
              <Button className={classes.passButton} variant="outline" color="dark">
                <Stack spacing={"0.2rem"}>
                  <Center>
                    <Text fz={24}>패스</Text>
                  </Center>
                  <Text fz={12} c={"gray"}>
                    무료로 플레이
                  </Text>
                </Stack>
              </Button>
            </Group>
          </Stack>
        </CardContainer>
      )}
      {postData?.isPlayable && (
        <Box className={classes.container} h={"12rem"}>
          <Button className={classes.sellButton} w={"100%"} h={"3.7rem"} radius={"lg"}>
            <Stack spacing={"xs"}>
              <Center>
                <Text fz={24}>게임 시작</Text>
              </Center>
              <Center>
                <Text fz={12} fw={"normal"}>
                  마지막 플레이 2분 전
                </Text>
              </Center>
            </Stack>
          </Button>
        </Box>
      )} */}
    </Stack>
  );
}
