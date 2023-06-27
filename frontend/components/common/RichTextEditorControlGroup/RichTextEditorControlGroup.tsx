import { ActionIcon, Group } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { IconCodeDots, IconPhoto } from "@tabler/icons-react";
import { useRichTextEditorControlGroupStyles } from "./RichTextEditorControlGroup.styles";

function RichTextEditorControlGroup() {
  const { classes } = useRichTextEditorControlGroupStyles();

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

      <RichTextEditor.ControlsGroup>
        <ActionIcon variant="outline" className={classes.photoButton} size={26}>
          <IconPhoto size={16} stroke={1} />
        </ActionIcon>
        <RichTextEditor.Link />
        <RichTextEditor.Unlink />
      </RichTextEditor.ControlsGroup>
    </Group>
  );
}

export default RichTextEditorControlGroup;
