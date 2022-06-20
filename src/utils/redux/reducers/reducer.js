const initialState = {
  favorites: [],
  loading: true,
  error1: null,
  error2: null,
  error3: null,
  error4: null,
  error5: null,
  error6: null,
  error7: null,
  error8: null,
  error9: null,
  error10: null,
  error11: null,
  error12: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FAVORITES":
      return {
        favorites: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
