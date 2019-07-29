import React from 'react';
import API from './API/api';
import ListComponent from './ListComponent';
import FormComponent from './FormComponent';

const App: React.FC = () => {

  const [ posts, setPosts ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ isError, setIsError ] = React.useState(false);
  const [ value, setValue ] = React.useState('react');
  const [ searchTerm, setSearchTerm ] = React.useState('react');

  React.useEffect(() => {

    fetchData();

    async function fetchData() {
      setIsLoading(true);
      try {
        const { hits } = await API.getData(searchTerm);
        setPosts(hits);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }
  }, [searchTerm]);

  // Helper functions //

  const onSearchSubmit = (e: any) => {
    e.preventDefault();
    setSearchTerm(value);
    setValue('');
  }

  const onValueChange = (e: any) => {
    setValue(e.target.value);
  }

  // JSX //

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
          data={posts}
        />
      </div>
    </>
  );
}
export default App;


