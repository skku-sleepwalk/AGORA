import { ActionIcon, Group, Popover, Stack, Text } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { IconCodeDots, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useRichTextEditorControlGroupStyles } from "./RichTextEditorControlGroup.styles";
import { Dropzone } from "@mantine/dropzone";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showError } from "../../../utils/notifications";
import { useState } from "react";
import { uploadImage } from "../../../utils/api/upload";
import { PostUploadImageResponse } from "../../../types/api/upload";
import { Editor } from "@tiptap/react";
import { useClickOutside, useDisclosure } from "@mantine/hooks";

export interface RichTextEditorControlGroupProps {
  editor: Editor | null;
}

function RichTextEditorControlGroup({ editor }: RichTextEditorControlGroupProps) {
  const { classes } = useRichTextEditorControlGroupStyles();
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePopoverOpen, { toggle: toggleImagePopover, close: closeImagePopover }] =
    useDisclosure();
  const uploadFileRef = useClickOutside(() => closeImagePopover());

  return (
    <Group>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.Underline />
        <RichTextEditor.Strikethrough />
        <RichTextEditor.Code />
        <RichTextEditor.CodeBlock icon={() => <IconCodeDots size={16} stroke={2} />} />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Hr />
        <RichTextEditor.Subscript />
        <RichTextEditor.Superscript />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup ref={uploadFileRef}>
        <Popover width={600} position="bottom" withArrow shadow="md" opened={imagePopoverOpen}>
          <Popover.Target>
            <ActionIcon
              variant="outline"
              className={classes.photoButton}
              size={26}
              onClick={toggleImagePopover}
            >
              <IconPhoto size={16} stroke={1} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Dropzone
              onDrop={async (files) => {
                setImageUploading(true);
                const uploadPromises = files.map((file) =>
                  uploadImage(file).catch((e) => {
                    showError(
                      `${file.name} 업로드중 문제가 발생했습니다.`,
                      "잠시 후 다시 시도해주세요."
                    );
                    return Promise.resolve(null);
                  })
                );
                const uploadResults = await Promise.all(uploadPromises);
                const urls = uploadResults
                  .filter((result): result is PostUploadImageResponse => result !== null)
                  .map(({ url }) => url);
                setImageUploading(false);
                urls.forEach((url) => {
                  editor?.chain().focus().setImage({ src: url }).run();
                });
                closeImagePopover();
              }}
              onReject={() => {
                showError(
                  "이미지 형식이 올바르지 않습니다.",
                  "5MB, 10개 이하의 올바른 이미지 파일을 첨부해주세요."
                );
              }}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              loading={imageUploading}
              maxFiles={10}
            >
              <Group position="center" spacing="xl">
                <Dropzone.Accept>
                  <IconUpload size="3.2rem" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size="3.2rem" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>

                <Stack spacing={5} align="center">
                  <Text size="xl" inline>
                    클릭하거나 파일을 드래그하여 업로드
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    파일을 여러 개 첨부할 수 있습니다 (최대 10개). 각 파일의 크기는 5MB를 초과할 수
                    없습니다.
                  </Text>
                </Stack>
              </Group>
            </Dropzone>
          </Popover.Dropdown>
        </Popover>
        <RichTextEditor.Link />
        <RichTextEditor.Unlink />
      </RichTextEditor.ControlsGroup>
    </Group>
  );
}

export default RichTextEditorControlGroup;
