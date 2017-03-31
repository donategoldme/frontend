import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App, Home, Widgets, Login, NotFound,
    YoutubeHome, YoutubeWidget,
    StandardHome, StandardWidget,
    ChatsWidget, ChatsHome, ChatWidget, ChatsConnect, ChatPrefs,
    PollsWidget,
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
          <Route path="youtube" component={YoutubeHome}>
            <IndexRoute component={YoutubeWidget}/>
          </Route>
          <Route path="standard" component={StandardHome}>
            <IndexRoute component={StandardWidget}/>
          </Route>
          <Route path="chats" component={ChatsWidget}>
            <IndexRoute component={ChatsHome}/>
            <Route path="connect" component={ChatsConnect}/>
            <Route path="chat" component={ChatWidget}/>
            <Route path="prefs" component={ChatPrefs}/>
            <Route path="polls" component={PollsWidget}/>
          </Route>
        </Route>
      </Route>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
