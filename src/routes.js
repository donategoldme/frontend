import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Widgets,
    Login,
    NotFound,
    YoutubeWidget,
    StandardWidget,
    ChatsWidget,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      {/* <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>*/}

      { /* Routes */ }
      {/* <Route path="about" component={About}/>
      <Route path="pagination" component={Pagination}/>
      <Route path="survey" component={Survey}/>*/}
      <Route path="auth/:provider/callback" component={Login}/>
      <Route onEnter={requireLogin}>
        <Route path="widgets" component={Widgets}>
          <IndexRoute component={Home}/>
          <Route path="youtube" component={YoutubeWidget}/>
          <Route path="standard" component={StandardWidget}/>
          <Route path="chats" component={ChatsWidget}/>
        </Route>
      </Route>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
