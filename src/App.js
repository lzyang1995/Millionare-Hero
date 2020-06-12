import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
// import { DatePicker, List } from 'antd-mobile';
import Cover from './view/Cover.js';
import QuestionWrapper from './view/Question.js';
import ResultWrapper from './view/Result.js';
import store from './utils/store.js';

class App extends React.Component {
  // async componentDidMount() {
  //   let result = await axios.get('http://localhost:8080/api/getQuestions');
  //   console.log(result.data);
  // }

  render() {
    return (
      <Provider store={store}>
        <Router basename="/baiwandati">
          <Switch>
            <Route path='/question/:id' component={QuestionWrapper} />
            <Route path='/result' component={ResultWrapper} />
            <Route path='/' component={Cover} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
