

export const GET_CASES = 'redux/actions/GET_CASES';
const GET_COUNTRY_DATA = 'redux/actions/GET_COUNTRY_DATA'
export const SET_SEARCH_QUERY = 'redux/actions/SET_SEARCH_QUERY'
const CHANGE_DATE = 'redux/actions/CHANGE_DATE'
const TOGGLE_BACK_BUTTON = "redux/actions/TOGGLE_BACK_BUTTON"
const dateObj = new Date();

const zeroPad = (num, places) => String(num).padStart(places, '0')
export const today = `${dateObj.getFullYear()}-${zeroPad(dateObj.getMonth() + 1, 2)}-${zeroPad(dateObj.getDate(), 2)}`;
export const convertDate = (date) => `${date.getFullYear()}-${zeroPad(date.getMonth() + 1, 2)}-${zeroPad(date.getDate(), 2)}`;


export const getCountryDataAction = (countryId) => ({type: GET_COUNTRY_DATA, payload: countryId})

export const toggleBackButton = () => ({type: TOGGLE_BACK_BUTTON})


export const changeDate = (date) => ({type: CHANGE_DATE, payload: date})

export const getCasesFunction = (date=today) => (dispatch) => fetch(`https://api.covid19tracking.narrativa.com/api/${date}`)
                                                                      .then(data => data.json())
                                                                          .then(data => {dispatch(changeDate(date)); return dispatch({ type: GET_CASES, payload: data })});

export const setSearchQuery = (query) => ({type: SET_SEARCH_QUERY, payload: query})                                                                        

const initialState = {dates: {}, total:{}, countryData: {dates: {
  [today]: {
    countries: {
      name: "",
      source: "",
      today_confirmed: 0,
      today_deaths: 0,
      today_recovered: 0,
    }}
}}, searchQuery: "", currentDate: new Date(), backButton: false};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CASES:
      return { ...state, ...action.payload};
    case GET_COUNTRY_DATA:
      return {...state, countryData: Object.values(Object.values(state.dates)[0].countries).find(country => country.id === action.payload)};
    case SET_SEARCH_QUERY:
      return {...state, searchQuery: action.payload}
    case CHANGE_DATE:
      return {...state, currentDate: new Date(`${action.payload  } `)}
    case TOGGLE_BACK_BUTTON:
      return {...state, backButton: !state.backButton}
    default:
      return state
  }
};

