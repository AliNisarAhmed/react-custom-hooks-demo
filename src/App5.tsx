import React from 'react';
import FormComponent from './FormComponent';
import ListComponent from './ListComponent';
import useReallyCustomizedHook from './useReallyCustomizedHook';
import API from './API/api';

const initialState = { data: [], isLoading: false, isError: false };

const App5: React.FC = () => {
  const [value, setValue] = React.useState('redux');

  const [{ data, isLoading, isError }, setApiCallObj] = useReallyCustomizedHook(
    {
      apiCallFunc: API.getData,
      params: [value],
    },
    initialState,
  );

  const onSearchSubmit = (e: any) => {
    e.preventDefault();
    setApiCallObj({ apiCallFunc: API.getData, params: [value] });
    setValue('');
  };

  const onValueChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <FormComponent
          onFormSubmit={onSearchSubmit}
          inputValue={value}
          onValueChange={onValueChange}
      />
      <div>
        <ListComponent
          isError={isError}
          isLoading={isLoading}
          data={data}
        />
      </div>
    </>
  );
};
export default App5;
