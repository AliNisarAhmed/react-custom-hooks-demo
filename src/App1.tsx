import React from 'react';
import API from './API/api';

interface IState {
  posts: any[];
  value: string;
}

class App extends React.Component<{}, IState> {
  state = {
    posts: [],
    value: 'react',
  };

  componentDidMount() {
    this.fetchSearchResults();
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSearchSubmit}>
          <input value={this.state.value} onChange={this.onValueChange} />
          <button type="submit">Search</button>
        </form>
        <div>
          <ul>
            {this.state.posts.length > 0 &&
              this.state.posts.map((item: any) => (
                <li key={item.objectID}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  }

  fetchSearchResults = async () => {
    const { hits } = await API.getData(this.state.value);
    console.log(hits);
    this.setState({ posts: hits });
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
