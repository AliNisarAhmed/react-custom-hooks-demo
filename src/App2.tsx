import React from 'react';
import API from './API/api';
import ListComponent from './ListComponent';
import FormComponent from './FormComponent';

interface IState {
  posts: any[];
  value: string;
  isLoading: boolean;
  isError: boolean;
}

class App extends React.Component<{}, IState> {
  state = {
    posts: [],
    value: 'react',
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    this.fetchSearchResults();
  }

  render() {
    const { posts, isLoading, isError, value } = this.state;
    return (
      <>
        <FormComponent
          inputValue={value}
          onFormSubmit={this.onSearchSubmit}
          onValueChange={this.onValueChange}
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

  fetchSearchResults = async () => {
    this.setState({ isLoading: true });
    try {
      const { hits } = await API.getData(this.state.value);
      console.log(hits);
      this.setState({ isLoading: false, posts: hits });
    } catch (error) {
      this.setState({ isError: true });
    }
  };

  onSearchSubmit = (e: any) => {
    e.preventDefault();
    this.fetchSearchResults();
    this.setState({ value: '' });
  };

  onValueChange = (e: any) => {
    this.setState({ value: e.target.value });
  };
}

export default App;
