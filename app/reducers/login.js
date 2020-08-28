import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "../actions/login";

const initialState = {
  userLoginData: {
    userLoggedIn: false
  },
  currentUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userLoginData: {
          userLoggedIn: true
        },
        currentUser: action.userData || {}
      };

    case UPDATE_USER:
      let { user } = action.userData;

      // let { pic: newPic } = user;

      // newPic = `${newPic}?ver${Math.floor(Math.random() * 100) + 1}`;

      // user.pic = newPic;

      return {
        ...state,
        currentUser: { ...state.currentUser, user } || {}
      };

    case LOGOUT_USER:
      return {
        userLoginData: {
          userLoggedIn: false
        },
        currentUser: {}
      };

    default:
      return state;
  }
};
