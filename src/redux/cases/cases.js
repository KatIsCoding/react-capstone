

const GET_TODAY_CASES = 'redux/actions/GET_TODAY_CASES';
const GET_COUNTRY_DATA = 'redux/actions/GET_COUNTRY_DATA'
const dateObj = new Date();

const zeroPad = (num, places) => String(num).padStart(places, '0')
export const today = `${dateObj.getFullYear()}-${zeroPad(dateObj.getMonth() + 1, 2)}-${zeroPad(dateObj.getDate(), 2)}`;

const getCountryDataAction = (data) => ({type: GET_COUNTRY_DATA, payload: data})

export const getCountryData = (countryId, date=today) => (dispatch) => 
fetch(`https://api.covid19tracking.narrativa.com/api/${date}/country/${countryId}`)
  .then(res => res.json())
    .then(data => {dispatch(getCountryDataAction(data)); })                                        




export const getTodayCasesFunction = () => (dispatch) => fetch(`https://api.covid19tracking.narrativa.com/api/${today}`)
                                                                      .then(data => data.json())
                                                                          .then(data => dispatch({ type: GET_TODAY_CASES, payload: data }));

const initialState = {dates: {}, total:{}, countryData: {dates: {}, total: {}}};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODAY_CASES:
      return { ...state, ...action.payload};
    case GET_COUNTRY_DATA:
      return {...state, countryData: action.payload}
    default:
      return state
  }
};

