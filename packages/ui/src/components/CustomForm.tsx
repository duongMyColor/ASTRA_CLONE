import { SaveButton, SimpleForm, ValidateForm } from 'react-admin';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import DeleteButtonFlexEnd from './DeleteButtonFlexEnd';
import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import { RecordValue } from '@repo/types/general';
import EditButtonFlexEnd from './EditButtonFlexEnd';
import ReferenceButtonFlexEnd from './ReferenceButtonFlexEnd';
import { CustomButtonByRole } from '@repo/ui/src/components/CustomButtonByRole';

/**
 * Create CustomForm component with delete, save and cancel buttons
 * @param children: JSX.Element[] - children components
 * @param handleSave: SubmitHandler<FieldValues> - function to handle save action
 * @param pathTo: string - path to redirect after cancel button is clicked
 * @param showDeleteButton: boolean - show delete button
 * @param showSaveButton: boolean - show save button
 * @param showCancelButton: boolean - show cancel button
 * @param validate: (values: FieldValues) => Record<string, any> - validate function
 * @param props: any - other props
 * @returns
 */
const CustomForm = ({
  children,
  handleSave,
  pathTo,
  moveScanRange,
  showDeleteButton = false,
  showSaveButton = false,
  showCancelButton = false,
  showEditButton = false,
  showReferenceButton = false,
  deleteButtonLabel = '削除',
  validate,
  ...props
}: {
  children: JSX.Element | JSX.Element[];
  handleSave?: SubmitHandler<FieldValues>;
  showDeleteButton?: boolean;
  deleteButtonLabel?: string;
  showSaveButton?: boolean;
  showCancelButton?: boolean;
  showEditButton?: boolean;
  showReferenceButton?: boolean;

  moveScanRange?: () => void;

  pathTo: string;
  validate?: ValidateForm;
  props?: RecordValue;
}) => {
  return (
    <SimpleForm
      onSubmit={handleSave}
      warnWhenUnsavedChanges={true}
      toolbar={false}
      validate={validate}
      mode="onTouched"
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        width="100%"
        gap={3}
        alignItems="center"
      >
        {showDeleteButton ? (
          <CustomButtonByRole source="role">
            <DeleteButtonFlexEnd label={deleteButtonLabel} />
          </CustomButtonByRole>
        ) : null}

        {showEditButton ? <EditButtonFlexEnd label="編集" /> : null}
        {showReferenceButton ? <ReferenceButtonFlexEnd label="参照" /> : null}
      </Stack>

      {children}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        width="100%"
        sx={{
          backgroundColor: '#f1f1f1',
          padding: '1rem',
          borderRadius: '4px',
          marginTop: '1rem',
        }}
        {...props}
      >
        {showCancelButton ? (
          <Link to={pathTo}>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={moveScanRange}
            >
              戻る
            </Button>
          </Link>
        ) : null}
        {showSaveButton ? <SaveButton label="保存" /> : null}
      </Stack>
    </SimpleForm>
  );
};

export default CustomForm;
