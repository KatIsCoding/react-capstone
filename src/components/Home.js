import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import ListComponent from './DataListing';
import SearchBar from './SearchCountry';
import { getCasesFunction, convertDate } from '../redux/cases/cases';

let loaded = false;

export default function HomeComponent() {
  const dispatch = useDispatch();
  const { currentDate, total } = useSelector((state) => state);

  useEffect(() => {
    if (!loaded) {
      dispatch(getCasesFunction());
      loaded = true;
    }
  }, [dispatch]);
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Container className="generalData">
          <h5 data-testid="currentDate">
            Statistics for date:
            {' '}
            {convertDate(currentDate)}
          </h5>
          <h5 data-testid="confirmedCases">
            Total Confirmed Cases:
            {' '}
            {total.today_confirmed}
          </h5>
          <h5 data-testid="totalDeaths">
            Total Deaths:
            {' '}
            {total.today_deaths}
          </h5>
          <h5 data-testid="totalRecoveries">
            Total Recovered:
            {' '}
            {total.today_recovered}
          </h5>
        </Container>
        <Container fluid className="filterSection">
          <h5 style={{ textAlign: 'center' }}>Filters</h5>
          <SearchBar />
        </Container>
      </div>
      <DatePicker maxDate={new Date()} value={currentDate} className="datePicker" onChange={(e) => { dispatch(getCasesFunction(convertDate(new Date(e.toString())))); }} />
      <Container
        fluid
        className="listContainer"
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          justifyItems: 'center',
          justifyContent: 'center',
          padding: 0,
          backgroundColor: 'var(--main-color)',
        }}
      >
        <ListComponent />
      </Container>
    </div>
  );
}

HomeComponent.propTypes = {
  total: PropTypes.shape({
    today_confirmed: PropTypes.number,
    today_deaths: PropTypes.number,
    today_recovered: PropTypes.number,
  }),
};

HomeComponent.defaultProps = {
  total: {},
};
