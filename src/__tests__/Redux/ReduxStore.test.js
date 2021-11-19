import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  setSearchQuery, getCasesFunction, GET_CASES, changeDate,
} from '../../redux/cases/cases';
import realStore from '../../redux/store';

const mockStore = configureStore([thunk]);

fetchMock.get('begin:https://api.covid19tracking.narrativa.com/api/', {});

const today = '2021-01-01';
const initialState = {
  dates: {},
  total: {},
  countryData: {
    dates: {
      [today]: {
        countries: {
          name: '',
          source: '',
          today_confirmed: 0,
          today_deaths: 0,
          today_recovered: 0,
        },
      },
    },
  },
  searchQuery: '',
  currentDate: new Date(),
  backButton: false,
};

test('Simple Dispatch Actions', () => {
  const actionsDispatched = [];
  const store = mockStore(initialState);
  store.dispatch(setSearchQuery('test'));
  actionsDispatched.push(setSearchQuery('test'));
  actionsDispatched.push(changeDate('test'));
  actionsDispatched.push({ type: GET_CASES, payload: {} });
  store.dispatch(getCasesFunction('test')).then(() => {
    expect(store.getActions()).toEqual(actionsDispatched);
  });
});

test('Testing State', () => {
  realStore.dispatch(setSearchQuery('test'));
  expect(realStore.getState().searchQuery).toBe('test');
  realStore.dispatch(changeDate('2021-11-11'));
  expect(realStore.getState().currentDate.toString()).toBe(new Date('2021-11-11 ').toString());
  realStore.dispatch(getCasesFunction('test')).then(() => {
    expect(realStore.getState().dates[today].countries).toEqual({});
  });
});
