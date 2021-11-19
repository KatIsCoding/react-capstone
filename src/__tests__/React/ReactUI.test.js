import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import MockDate from "mockdate";
import { createStore, applyMiddleware } from "redux";
import fs from 'fs';
import App from '../../App';
import reducer from "../../redux/cases/cases"


const getMockedData = () => {
  const data = fs.readFileSync('./src/__tests__/React/mockData.json', 'utf8')
  return JSON.parse(data);
}

const createTestStore = () => {
  const store = createStore(
    reducer,
    applyMiddleware(thunk),
  );
  return store;
};

let store;
let tree;

const renderList = (store, component) =>
  render(<Provider store={store}>{component}</Provider>);
describe("asdsadad", () => {
  beforeEach(() => {
    MockDate.set(new Date("2021-11-18"));
    fetchMock.reset()
    fetchMock.get("begin:https://api.covid19tracking.narrativa.com/api/", getMockedData());
    store = createTestStore();
    tree = renderList(store, <App />);
  })

  test("Snapshot Testing", async () => {
    expect(tree).toMatchSnapshot();
  })  

  test("Testing the amount of countries loaded (should be 195)", async () => {
    const { findAllByTestId } = tree;
    const countries = await findAllByTestId('data-item')
    expect(countries.length).toBe(195)
  })

  test("Testing data accuracy", async () => {
    const { findAllByTestId } = tree;
    const date = await findAllByTestId('currentDate')
    const cases = await findAllByTestId('confirmedCases')
    const deaths = await findAllByTestId('totalDeaths')
    const recoveries = await findAllByTestId('totalRecoveries')

    expect(date[0].textContent).toBe('Statistics for date: 2021-11-18')
    expect(cases[0].textContent).toBe('Total Confirmed Cases: 255930146')
    expect(deaths[0].textContent).toBe('Total Deaths: 5130140')
    expect(recoveries[0].textContent).toBe('Total Recovered: 144282370')
  })

  test("Testing click action into one country", async () => {
    const { findAllByText } = tree;
    const AfghanistanCard = await findAllByText("Afghanistan")
    expect(AfghanistanCard.length).toBe(1)

    AfghanistanCard[0].click()
    const source = await findAllByText("Source: John Hopkins University")
    const date = await findAllByText("Date: 2021-11-18")
    const confirmations = await findAllByText("Confirmed Today: 156739")
    const deaths = await findAllByText("Deaths Today: 7297")
    const recoveries = await findAllByText("Recovered Today: 82586")

    expect(source.length).toBe(1)
    expect(date.length).toBe(1)
    expect(confirmations.length).toBe(1)
    expect(deaths.length).toBe(1)
    expect(recoveries.length).toBe(1)

    

  })
})



