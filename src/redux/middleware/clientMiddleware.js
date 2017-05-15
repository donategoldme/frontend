export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }
      if (!types) {
        const actionPromise = promise(client);
        return actionPromise;
      }
      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      if (client.TOKEN === '' && getState().auth.user !== undefined &&
      getState().auth.user !== null && getState().auth.user.token !== undefined) {
        client.TOKEN = getState().auth.user.token;
      }
       // initial token for header
      const actionPromise = promise(client);
      actionPromise.then(
        (result) => {
          if (result === 'close window' && __CLIENT__) {
            window.close();
          }
          next({...rest, result, type: SUCCESS});
        },
        (error) => {
          console.error('MIDDLEWARE ERROR1:', error);
          next({...rest, error, type: FAILURE});
        }).catch((error)=> {
          console.error('MIDDLEWARE ERROR2:', error);
          next({...rest, error, type: FAILURE});
        });
      return actionPromise;
    };
  };
}
