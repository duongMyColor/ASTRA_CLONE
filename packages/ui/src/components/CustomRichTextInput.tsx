import {
  DefaultEditorOptions,
  RichTextInputToolbar,
  LevelSelect,
  FormatButtons,
  AlignmentButtons,
  ListButtons,
  LinkButtons,
  QuoteButtons,
  ClearButtons,
  useTiptapEditor,
  ColorButtons,
  ImageButtons,
} from 'ra-input-rich-text';
const HorizontalRule = require( '@tiptap/extension-horizontal-rule');
import Remove from '@mui/icons-material/Remove';
import { ToggleButton } from '@mui/material';
import React from 'react';

const RichTextInput = React.lazy(() =>
  import('ra-input-rich-text').then((module) => ({
    default: module.RichTextInput,
  }))
);

/**
 * Custom RichTextInputToolbar component
 * @param size: 'small' | 'medium' | 'large' | undefined - size of the component
 * @returns
 */
const CustonRichTextInputToolbar = ({
  size,
}: {
  size: 'small' | 'medium' | 'large' | undefined;
}) => {
  const editor = useTiptapEditor();

  return (
    <RichTextInputToolbar>
      <LevelSelect size={size} />
      <FormatButtons size={size} />
      <ColorButtons size={size} />
      <AlignmentButtons size={size} />
      <ListButtons size={size} />
      <LinkButtons size={size} />
      <QuoteButtons size={size} />
      <ClearButtons size={size} />
      <ImageButtons size={size} />
      <ToggleButton
        aria-label="Add an horizontal rule"
        title="Add an horizontal rule"
        value="left"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        selected={editor?.isActive('horizontalRule')}
        size={size}
      >
        <Remove fontSize="inherit" />
      </ToggleButton>
    </RichTextInputToolbar>
  );
};

/**
 * Custom RichTextInput component
 * ref: https://marmelab.com/react-admin/RichTextInput.html
 * @param size: 'small' | 'medium' | 'large' | undefined - size of the component
 * @param label: string - label of the component
 * @param source: string - source of the component
 * @returns
 */
export const CustonRichTextInput = ({
  size,
  label,
  source,
}: {
  size: 'small' | 'medium' | 'large' | undefined;
  label: string;
  source: string;
}) => (
  <RichTextInput
    editorOptions={MyEditorOptions}
    toolbar={<CustonRichTextInputToolbar size={size} />}
    label={label}
    source={source}
    fullWidth
  />
);

export const MyEditorOptions = {
  ...DefaultEditorOptions,
  extensions: [...(DefaultEditorOptions.extensions ?? []), HorizontalRule],
};
