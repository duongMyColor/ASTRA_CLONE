import ContentFilter from '@mui/icons-material/FilterList';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { useListContext, SelectInput } from 'react-admin';

import { textInputStylesProduct } from '@repo/styles';
import { useEffect } from 'react';
import { statusActiveAppMaster } from '@repo/consts/product';

const ProductFilterButton = () => {
  const { showFilter } = useListContext();
  return (
    <Button
      size="small"
      color="primary"
      onClick={() => showFilter('main', null)}
      startIcon={<ContentFilter />}
    >
      Filter
    </Button>
  );
};

const ProductFilterForm = () => {
  const { displayedFilters, filterValues, setFilters, hideFilter } =
    useListContext();

  const form = useForm({
    defaultValues: filterValues,
  });

  const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkFilterLocal = JSON.parse(
      localStorage.getItem('RaStore.application-masters.listParams') as string
    );

    console.log({ checkFilterLocal });

    const valuesFilter = {
      isDeleted: checkFilterLocal.filter.isDeleted ?? 0,
    };

    valuesFilter.isDeleted = e.target.value;

    if (Object.keys(valuesFilter).length > 0) {
      setFilters(valuesFilter, displayedFilters);
    } else {
      hideFilter('main');
    }
  };

  // const clearFilter = () => {
  //   setFilters({ status: NOT_COMPLETED }, []);
  //   form.reset();
  // };
  useEffect(() => {
    const checkFilterLocal = JSON.parse(
      localStorage.getItem('RaStore.application-masters.listParams') as string
    );

    setFilters(
      {
        isDeleted: !checkFilterLocal
          ? statusActiveAppMaster[1]?.id
          : checkFilterLocal.filter.isDeleted,
      },
      []
    );
  }, []);

  return (
    <FormProvider {...form}>
      <Box
        width="60%"
        display="flex"
        sx={{
          margin: '0',
          gap: '15px',
          alignItems: 'end',
          paddingBottom: '5px',
        }}
      >
        <SelectInput
          key={1}
          choices={statusActiveAppMaster}
          defaultValue={statusActiveAppMaster[0]?.id}
          source="isDeleted"
          label="状況"
          sx={textInputStylesProduct}
          fullWidth={false}
          variant="outlined"
          isRequired
          onChange={(e) => onSubmit(e)}
        />
      </Box>
    </FormProvider>
  );
};

export { ProductFilterButton, ProductFilterForm };
