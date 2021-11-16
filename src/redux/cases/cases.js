const GET_TODAY_CASES = 'redux/actions/GET_TODAY_CASES';
const dateObj = new Date();
const zeroPad = (num, places) => String(num).padStart(places, '0')
export const today = `${dateObj.getFullYear()}-${zeroPad(dateObj.getMonth() + 1, 2)}-${zeroPad(dateObj.getDate(), 2)}`;

export const getTodayCasesFunction = () => (dispatch) => fetch(`https://api.covid19tracking.narrativa.com/api/${today}`)
                                                                      .then(data => data.json())
                                                                          .then(data => dispatch({ type: GET_TODAY_CASES, payload: data }));

const initialState = {dates: {}, total:{}};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODAY_CASES:
      return action.payload;
    default:
      return state
  }
};

