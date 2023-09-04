import {
  Avatar,
  Button,
  Center,
  Collapse,
  Divider,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useGamePlayModalStyles } from "./GamePlayModal.styles";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import useAuth from "../../../../../hooks/useAuth";
import { useDisclosure } from "@mantine/hooks";
import { PostGameSubscribe } from "../../../../../utils/api/game/game/gameSubscribe";
import { Game } from "../../../../../types/api/game/game";
import { showNotification } from "../../../../../utils/notifications";
import { SwitchPlaytime } from "../../../mypage/mypagePlaytimesSecion/mypagePlaytimesSection";

interface GamePlayModalProps {
  onCloseClick: () => void;
  postData: Game;
}

export function GamePlayModal({ onCloseClick, postData }: GamePlayModalProps) {
  const theme = useMantineTheme();
  const { classes, cx } = useGamePlayModalStyles();

  const { user, token, openSignInModal } = useAuth();

  const [opened, { toggle }] = useDisclosure(false);

  // 게임 다운로드/플레이 관련
  const onDownloadClick = () => {
    window.open(`agoragame://install?id=${postData.id}&token=${token}`, "_blank");
  };
  const onPlayClick = () => {
    window.open(`agoragame://execute?id=${postData.id}&token=${token}`, "_blank");
  };

  return (
    <Stack spacing={"xs"}>
      <Group>
        <Avatar
          size={"3.75rem"}
          radius={"md"}
          src={
            "https://play-lh.googleusercontent.com/He92papZcOmkgTi1sLHXQQb02aoyRtJ8ml96njM_cSAcpHhILvxMjhLix4mYEIKXPq4=s96-rw"
          }
        />
        <Stack spacing={"xs"}>
          <Text fw={"bold"} fz={20}>
            {postData.store?.title}
          </Text>
          <Text fz={16}>
            플레이한 시간:{" "}
            <Text c={theme.colors.teal[5]} fw={"bold"} span>
              {postData.playtime ? SwitchPlaytime(postData.playtime) : "-"}
            </Text>
          </Text>
        </Stack>
      </Group>
      <Group className={classes.marginTop} spacing={"xs"}>
        <IconClock />
        <Text fz={16}>
          남은 시간:{" "}
          <Text c={theme.colors.teal[5]} fw={"bold"} span>
            {postData.remaintime ? SwitchPlaytime(postData.remaintime) : "-"}
          </Text>
        </Text>
      </Group>
      {/* {postData.isPlayable && (
        <Group spacing={"xs"}>
          <IconCalendar />
          <Text fz={16}>
            종료 날짜:{" "}
            <Text c={theme.colors.teal[5]} fw={"bold"} span>
              {postData.author.playtime ? postData.author.playtime : "2023년 9월 28일"}
            </Text>
          </Text>
        </Group>
      )} */}
      {!postData.isPlayable && (
        <Stack spacing={"xs"}>
          <Group className={classes.marginTop} position="apart">
            <Button className={classes.passButton} variant="default" onClick={toggle}>
              <Text fz={20}>Agora 패스 구매</Text>
            </Button>
          </Group>
          <Collapse in={opened}>
            <Stack spacing={"0.4rem"}>
              <Group className={classes.marginSide} position="apart">
                <Text>1시간 / 1개월</Text>
                <Button
                  className={classes.priceButton}
                  onClick={() => {
                    if (!user) {
                      openSignInModal();
                      onCloseClick();
                    } else {
                      PostGameSubscribe(user.id, { time: 60, duration: 30 }).then(() => {
                        showNotification("Agora 패스 구매가 완료되었습니다!", null);
                        onCloseClick();
                      });
                    }
                  }}
                >
                  무료
                </Button>
              </Group>
              <Divider />
              <Group className={classes.marginSide} position="apart">
                <Text>2시간 / 1개월</Text>
                <Button
                  className={classes.priceButton}
                  onClick={() => {
                    if (!user) {
                      openSignInModal();
                      onCloseClick();
                    } else {
                      PostGameSubscribe(user.id, { time: 120, duration: 30 }).then(() => {
                        showNotification("Agora 패스 구매가 완료되었습니다!", null);
                        onCloseClick();
                      });
                    }
                  }}
                >
                  무료
                </Button>
              </Group>
            </Stack>
          </Collapse>
        </Stack>
      )}
      {postData.isPlayable && (
        <Group className={classes.marginTop} position="apart">
          <Button className={classes.sellButton} w={"3rem"} onClick={onDownloadClick}>
            <Text fz={20}>게임 다운로드</Text>
          </Button>
          <Button className={classes.sellButton} onClick={onPlayClick}>
            <Stack spacing={"sm"}>
              <Center>
                <Text fz={20}>게임 시작</Text>
              </Center>
              {/* <Center>
                <Text fz={12} fw={"normal"}>
                  마지막 플레이 2분 전
                </Text>
              </Center> */}
            </Stack>
          </Button>
        </Group>
      )}
    </Stack>
  );
}
