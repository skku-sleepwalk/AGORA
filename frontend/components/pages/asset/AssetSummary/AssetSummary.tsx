import {
  Avatar,
  Group,
  Modal,
  Stack,
  Image,
  Text,
  Box,
  Divider,
  Button,
  Center,
  Badge,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { Asset } from "../../../../types/api/asset";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { IconHeart, IconInnerShadowBottomRight, IconLicense } from "@tabler/icons-react";
import { useAssetSummaryStyles } from "./AssetSummary.styles";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { AssetTagModal } from "../AssetTagModal/AssetTagModal";
import useAuth from "../../../../hooks/useAuth";

interface AssetSummaryProps {
  asset: Asset;
}

export function AssetSummary({ asset }: AssetSummaryProps) {
  const { classes, cx } = useAssetSummaryStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const tags = [{ name: "액션" }, { name: "스릴있는" }].map((item) => (
    <Box className={classes.tag}>{item.name}</Box>
  ));
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
  const { user } = useAuth();

  return (
    <>
      <Modal className={classes.modal} opened={opened} onClose={close} title="태그 추가" centered>
        <AssetTagModal onClose={close} assetId={asset.id} />
      </Modal>
      <Stack justify="space-between" sx={{ height: "100%" }}>
        <Stack spacing={"1rem"} className={cx(classes.stack, classes.marginLeft)}>
          <Stack spacing={"0.5rem"} className={classes.stack}>
            <Group position="apart">
              <Text fz={20} c={"gray"}>
                음악
              </Text>
              <Group spacing={7}>
                <InvisibleButton>
                  <IconHeart size={24} />
                </InvisibleButton>
                (100)
              </Group>
            </Group>
            <Text fw={"bold"} fz={32}>
              라면이 땡기는 뮤직
            </Text>
          </Stack>
          <Stack spacing={16} w={"100%"} className={classes.stack}>
            <Group spacing={8}>
              <Avatar
                size={36}
                radius="lg"
                src="https://avatars.githubusercontent.com/u/52057157?v=4"
              />
              <Text fz={18}>최강상현</Text>
            </Group>
            <Group spacing={6}>
              <Image src="/images/token.svg" width={32} height={32} />
              <Text fz={24} fw={"bold"}>
                2400
              </Text>
            </Group>
          </Stack>
        </Stack>
        <Stack spacing={"1rem"} className={cx(classes.stack, classes.marginLeft)}>
          <Stack spacing={17}>
            <Stack spacing={7}>
              <Text className={cx(classes.marginTop, classes.marginLeft)} fw={"bold"}>
                이 에셋의 인기 태그 :
              </Text>
              <Box className={classes.tagGroup}>
                <Box className={classes.tagBox} ref={overflowRef}>
                  {tags}
                  {true && (
                    <Button
                      className={cx(classes.addButton, isOverflowed ? classes.addButton_A : null)}
                      onClick={open}
                    >
                      +
                    </Button>
                  )}
                </Box>
              </Box>
            </Stack>
          </Stack>
          <Button className={classes.downloadButton}>
            <Center>
              <Text fz={28}>다운로드</Text>
            </Center>
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
