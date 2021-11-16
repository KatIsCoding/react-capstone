import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';
// import { getCountryData } from '../redux/cases/cases';

// const currentID = "";

export default function CountryDetails() {
  const { countryId } = useParams();
  // const dispatch = useDispatch();
  const { countryData } = useSelector((state) => state);
  const date = Object.keys(countryData.dates)[0];
  const countryObject = countryData.dates[date].countries[Object.keys(countryData.dates[date].countries)[0]];
    return (
      <Container key={countryId}>
      <h1>Details of: {countryObject.name}</h1>
      <ListGroup>
        <ListGroup.Item>Source: {countryObject.source}</ListGroup.Item>
        <ListGroup.Item>Confirmed Today: {countryObject.today_confirmed}</ListGroup.Item>
        <ListGroup.Item>Deaths Today: {countryObject.today_deaths}</ListGroup.Item>
        <ListGroup.Item>Recovered Today: {countryObject.today_recovered}</ListGroup.Item>
      
    </ListGroup>
    </Container>);
  // return (<div>Loading...</div>);

}