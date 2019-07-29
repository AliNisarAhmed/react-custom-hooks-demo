import React from 'react';

interface IApiCallObj {
  apiCallFunc: any;
  params: any[];
}

interface IState {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

type Hook = (initialApiCallObj: IApiCallObj, initialState: IState) => [ IState, any ];

const useReallyCustomizedHook: Hook = (initialApiCallObj, initialState ) => {

  const [ { apiCallFunc, params }, setApiCallObj ] = React.useState(initialApiCallObj);
  const [ state, setState ] = React.useState(initialState);

  React.useEffect(() => {

    fetchData();

    async function fetchData() {
      setState({ isLoading: true } as IState);
      try {
        const { hits } = await apiCallFunc(...params);
        setState({ data: hits, isLoading: false } as IState);
      } catch (error) {
        setState({ isError: true } as IState)
      }
    }
  }, [ params ]);

  return [ state, setApiCallObj ];
}

export default useReallyCustomizedHook;