import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { getTodayCasesFunction } from "../redux/cases/cases";
import ListComponent from "./DataListing";




export default function HomeComponent(){
  const dispatch = useDispatch();
  const { dates, total } = useSelector(state => state);
  useEffect(() => {
    dispatch(getTodayCasesFunction());
  }, [dispatch]);
  

  return (
    <div>
      <Container>
        <h5>Total Confirmed Cases: {total.today_confirmed}</h5>
        <h5>Total Deaths: {total.today_deaths}</h5>
        <h5>Total Recovered: {total.today_recovered}</h5>
      </Container>
      <Container fluid style={{display: "grid",
    "grid-template-columns": "auto auto",
    "justify-items": "center",}}>
      <ListComponent dates={dates} />
        </Container>
    </div>
  );
}

