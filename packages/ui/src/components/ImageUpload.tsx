import { ImageField, ImageInput } from 'react-admin';
import { Button } from '@mui/material';
import { MouseEventHandler } from 'react';

/**
 * ImageEdit component for editing image
 * @param label button label
 * @param onCancel cancel button click event
 * @returns
 */
const ImageEdit = ({
  label,
  onCancel,
}: {
  label: string;
  onCancel: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <ImageInput source="pictures" label="Image" isRequired>
        <ImageField source="src" title="title" />
      </ImageInput>
      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={onCancel}
      >
        {label}
      </Button>
    </>
  );
};

/**
 * ImageShow component for showing image
 * @param label button label
 * @param source image source
 * @param onChange button click event
 * @returns
 */
const ImageShow = ({
  label,
  source,
  onChange,
}: {
  label: string;
  source: string;
  onChange: MouseEventHandler<HTMLButtonElement>;
}) => (
  <>
    <ImageField source={source} title="thumbImgName" />
    <Button type="button" variant="contained" color="info" onClick={onChange}>
      {label}
    </Button>
  </>
);

export { ImageEdit, ImageShow };
