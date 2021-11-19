import { render, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import timemachine from 'timemachine';
import { createStore, applyMiddleware } from 'redux';
import fs from 'fs';
import App from '../../App';
import reducer, { convertDate } from '../../redux/cases/cases';

const getMockedData = () => {
  const data = fs.readFileSync('./src/__tests__/React/mockData.json', 'utf8');
  return JSON.parse(data);
};

const createTestStore = () => {
  const store = createStore(
    reducer,
    applyMiddleware(thunk),
  );
  return store;
};

let store;
let tree;

const renderList = (store, component) => render(<Provider store={store}>{component}</Provider>);
describe('React Data rendering and accuracy tests', () => {
  beforeEach(() => {
    timemachine.config({
      dateString: 'Fri Nov 15 2021 09:19:14 GMT-0600 (Central Standard Time)',
    });
    fetchMock.reset();
    fetchMock.get('begin:https://api.covid19tracking.narrativa.com/api/', getMockedData());
    store = createTestStore();
    tree = renderList(store, <App />);
  });

  test('Snapshot Testing', async () => {
    expect(tree).toMatchSnapshot();
  });

  test('Testing the amount of countries loaded (should be 195)', async () => {
    const { findAllByTestId } = tree;
    const countries = await findAllByTestId('data-item');
    expect(countries.length).toBe(195);
  });

  test('Check for data accuracy in and out of the country details page', async () => {
    const { findAllByText, findAllByTestId } = tree;

    let date = await findAllByTestId('currentDate');
    const cases = await findAllByTestId('confirmedCases');
    let deaths = await findAllByTestId('totalDeaths');
    let recoveries = await findAllByTestId('totalRecoveries');

    expect(date[0].textContent).toBe('Statistics for date: 1969-12-31');
    expect(cases[0].textContent).toBe('Total Confirmed Cases: 255930146');
    expect(deaths[0].textContent).toBe('Total Deaths: 5130140');
    expect(recoveries[0].textContent).toBe('Total Recovered: 144282370');

    const AfghanistanCard = await findAllByText('Afghanistan');
    expect(AfghanistanCard.length).toBe(1);
    AfghanistanCard[0].click();

    const source = await findAllByText('Source: John Hopkins University');
    const confirmations = await findAllByText('Confirmed Today: 156739');
    date = await findAllByText(`Date: ${convertDate(Date())}`);
    deaths = await findAllByText('Deaths Today: 7297');
    recoveries = await findAllByText('Recovered Today: 82586');

    expect(source.length).toBe(1);
    expect(date.length).toBe(1);
    expect(confirmations.length).toBe(1);
    expect(deaths.length).toBe(1);
    expect(recoveries.length).toBe(1);
  });
});
