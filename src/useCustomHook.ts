import React from 'react';
import API from './API/api';

interface IState {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

type Hook = (initialSearchTerm: string) => [ IState, any ];

const useCustomHook: Hook = (initialSearchTerm) => {

  const [ data, setData ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ isError, setIsError ] = React.useState(false);
  const [ searchTerm, setSearchTerm ] = React.useState<string>(initialSearchTerm);

  React.useEffect(() => {

    fetchData();

    async function fetchData() {
      setIsLoading(true);
      try {
        const { hits } = await API.getData(searchTerm);
        setData(hits);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }
  }, [ searchTerm ]);

  return [ { data, isLoading, isError }, setSearchTerm ];
}

export default useCustomHook;