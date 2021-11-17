/* eslin-disable no-unused-vars */

import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';
import { getCountryDataAction } from '../redux/cases/cases';
// const currentID = "";

export default function CountryDetails() {

  const { countryId } = useParams();
  const dispatch = useDispatch();
  const countryObject = useSelector((state) => state.countryData);
  // let countryObject = {};

  
  useEffect(() => {
    dispatch(getCountryDataAction(countryId))
  }, [dispatch, countryId]) 
  
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


}