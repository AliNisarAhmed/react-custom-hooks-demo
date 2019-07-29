import React from 'react';
import ListComponent from './ListComponent';
import FormComponent from './FormComponent';
import useCustomHook from './useCustomHook';

const App4: React.FC = () => {

  const initialSearchTerm = 'react';
  const [ { data, isLoading, isError }, setSearchTerm ] = useCustomHook(initialSearchTerm);
  const [ value, setValue ] = React.useState(initialSearchTerm);

  const onSearchSubmit = (e: any) => {
    e.preventDefault();
    setSearchTerm(value)
    setValue('');
  }

  const onValueChange = (e: any) => {
    setValue(e.target.value);
  }

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
}
export default App4;


