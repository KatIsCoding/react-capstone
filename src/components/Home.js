
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
      <Container>
        <h5>Total Confirmed Cases: {total.today_confirmed}</h5>
        <h5>Total Deaths: {total.today_deaths}</h5>
        <h5>Total Recovered: {total.today_recovered}</h5>
      </Container>
      <SearchBar />
      <DatePicker value={currentDate} onChange={(e) => {dispatch(getCasesFunction(convertDate(e)))}} />
      <Container fluid style={{display: "grid",
    "grid-template-columns": "auto auto",
    "justify-items": "center",}}>
      <ListComponent />
        </Container>
    </div>
  );
}



HomeComponent.propTypes = {
  /* dates: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      countries: PropTypes.shape({
        [PropTypes.string]: PropTypes.shape({
          name: PropTypes.string,
          source: PropTypes.string,
          today_confirmed: PropTypes.number,
          today_deaths: PropTypes.number,
          today_recovered: PropTypes.number,
        }),
      }),
    }),
  }), */
  total: PropTypes.shape({
    today_confirmed: PropTypes.number,
    today_deaths: PropTypes.number,
    today_recovered: PropTypes.number,
  }),
};


HomeComponent.defaultProps = {
  // dates: {},
  total: {},
};

