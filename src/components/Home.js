
import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-date-picker";
import { useDispatch , useSelector } from "react-redux";

import ListComponent from "./DataListing";
import SearchBar from "./SearchCountry";
import { getCasesFunction , convertDate } from "../redux/cases/cases";


export default function HomeComponent({ total }){
  const dispatch = useDispatch();
  const { currentDate } = useSelector(state => state);
  return (
    <div>
      <div style={{display: "flex", flexDirection: "column"}}>
      <Container className="generalData">
        <h5>Statistics for date: {convertDate(currentDate)}</h5>
        <h5>Total Confirmed Cases: {total.today_confirmed}</h5>
        <h5>Total Deaths: {total.today_deaths}</h5>
        <h5>Total Recovered: {total.today_recovered}</h5>
      </Container>
      <Container fluid className="filterSection">
        <h5 style={{textAlign: "center"}}>Filters</h5>
        <SearchBar />
      </Container>
      </ div>
      <DatePicker maxDate={new Date()} value={currentDate} className="datePicker" onChange={(e) => {dispatch(getCasesFunction(convertDate(e)))}} />
      <Container fluid className="listContainer" style={{display: "grid",
                              gridTemplateColumns: "auto auto",
                              justifyItems: "center",
                              justifyContent: "center",
                              padding: 0}}>
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

