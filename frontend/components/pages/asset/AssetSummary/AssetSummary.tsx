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
import { useContext, useEffect, useRef, useState } from "react";
import { AssetTagModal } from "../AssetTagModal/AssetTagModal";
import useAuth from "../../../../hooks/useAuth";
import { AssetContext } from "../../../../pages/asset/[id]";
import { DelAssetLike, PostAssetLike } from "../../../../utils/api/asset/asset/assetLike";
import { theme } from "../../../../styles/theme";

interface AssetSummaryProps {
  asset: Asset;
}

export function AssetSummary({ asset }: AssetSummaryProps) {
  const { classes, cx } = useAssetSummaryStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const tags = asset.popularTags.map((item) => <Box className={classes.tag}>{item.name}</Box>);
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
  const { user, token } = useAuth();
  const { mutateAsset } = useContext(AssetContext);
  const theme = useMantineTheme();

  const handleIsLiking = () => {
    if (asset.like) {
      DelAssetLike(asset.id, token).then(() => {
        mutateAsset();
      });
    } else {
      PostAssetLike(asset.id, token).then(() => {
        mutateAsset();
      });
    }
  };

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
                {asset.category.name}
              </Text>
              <Group spacing={7}>
                <InvisibleButton onClick={handleIsLiking}>
                  {asset.like ? (
                    <IconHeart size={"2rem"} stroke={1} fill={theme.colors.red[6]} />
                  ) : (
                    <IconHeart size={"2rem"} stroke={1} />
                  )}
                </InvisibleButton>
                {asset.likeCount}
              </Group>
            </Group>
            <Text fw={"bold"} fz={32}>
              {asset.title}
            </Text>
          </Stack>
          <Stack spacing={16} w={"100%"} className={classes.stack}>
            <Group spacing={8}>
              <Avatar
                size={36}
                radius="lg"
                src="https://avatars.githubusercontent.com/u/52057157?v=4"
              />
              <Text fz={18}>{asset.author.name}</Text>
            </Group>
            <Group spacing={6}>
              <Image src="/images/token.svg" width={32} height={32} />
              <Text fz={24} fw={"bold"}>
                {asset.cost.isSale ? asset.cost.saledPrice : asset.cost.defaultPrice}
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
            <a href={asset.downloadUrl} download style={{ textDecoration: "none", color: "white" }}>
              <Center>
                <Text fz={28}>다운로드</Text>
              </Center>
            </a>
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
