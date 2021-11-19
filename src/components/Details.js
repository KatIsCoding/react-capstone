import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';
import { getCountryDataAction } from '../redux/cases/cases';

export default function CountryDetails() {
  const { countryId } = useParams();
  const dispatch = useDispatch();
  const countryObject = useSelector((state) => state.countryData);

  useEffect(() => {
    dispatch(getCountryDataAction(countryId));
  }, [dispatch, countryId]);

  return (
    <Container key={countryId} style={{ padding: 0 }}>
      <h1 style={{ backgroundColor: 'var(--main-color)', color: 'white' }}>{countryObject.name}</h1>
      <ListGroup>
        <ListGroup.Item data-testid="source">
          Source:
          {countryObject.source}
        </ListGroup.Item>
        <ListGroup.Item data-testid="date">
          Date:
          {countryObject.date}
        </ListGroup.Item>
        <ListGroup.Item data-testid="confirmed">
          Confirmed Today:
          {countryObject.today_confirmed}
        </ListGroup.Item>
        <ListGroup.Item data-testid="deaths">
          Deaths Today:
          {countryObject.today_deaths}
        </ListGroup.Item>
        <ListGroup.Item data-testid="recovered">
          Recovered Today:
          {countryObject.today_recovered}
        </ListGroup.Item>

      </ListGroup>
    </Container>
  );
}
