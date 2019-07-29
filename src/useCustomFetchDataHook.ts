import { useState, useReducer, useEffect } from 'react';

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

interface IApiCallObj {
	apiCallFunc: any;
	params: any;
}

interface IState {
	data: any;
	isLoading: boolean;
	isError: boolean;
}

interface IAction {
	type: string;
	payload?: any;
}

type Hook = (ApiCallObj: IApiCallObj, state: IState) => [ IState, any ];

const useCustomFetchDataHook: Hook = ( initialApiCallObj: IApiCallObj, initialData: IState) => {

	const dataFetchReducer: React.Reducer<IState, IAction> = (prevState: IState, action: IAction) => {
		switch (action.type) {
			case FETCH_INIT:
				return { data: prevState.data, isLoading: true, isError: false };
			case FETCH_SUCCESS:
				return { data: action.payload, isLoading: false, isError: false };
			case FETCH_FAILURE:
				return { data: prevState.data, isLoading: false, isError: true };
			default:
				throw new Error('Something went wrong while fetching data');
		}
	};

	const [ { apiCallFunc, params }, setApiCall ] = useState(initialApiCallObj);

	const [ state , dispatch ] = useReducer(dataFetchReducer, initialData);

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: FETCH_INIT });

			try {
				const result = await apiCallFunc(params);

				dispatch({ type: FETCH_SUCCESS, payload: result });

			} catch (error) {
				dispatch({ type: FETCH_FAILURE });
			}
		};

		fetchData();
	}, [params]);

	return [ state, setApiCall ];
};

export default useCustomFetchDataHook;