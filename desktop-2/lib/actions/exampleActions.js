import * as types from './actionTypes';


export function loadHappeningSuccess(result) {
  return { type: types.LOAD_HAPPENING_SUCCESS, result };
}

export function loadHappeningFailure(error) {
  return { type: types.LOAD_HAPPENING_FAILURE, error };
}

export function loadHappening() {
  return dispatch => {
    return happeningPromise()
      .then(result => {
        dispatch(loadHappeningSuccess(result));
      }).catch(err => {
        dispatch(loadHappeningFailure(err));
      });
  };
}

function happeningPromise() {
  return delay()
    .then(() => {
      const random = Math.random();
      if (random >= 0.5) return Promise.resolve('Ka-Thunk.');
      return Promise.reject('Fail.');
    });
}
function delay() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}


