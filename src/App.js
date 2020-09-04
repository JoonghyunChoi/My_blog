import React, { Component } from 'react';
import Blog from './containers/Blog/Blog';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Layout>
            <Blog />
          </Layout>
        </div>
    );
  }
}

export default App;
