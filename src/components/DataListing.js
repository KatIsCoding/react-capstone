import React from "react";
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCountryData } from "../redux/cases/cases";

export default function ListComponent({ dates }) {
      const dispatch = useDispatch();
      return Object.keys(dates).map(date => (
          Object.keys(dates[date].countries).map(countryName => {
            const countryObject = dates[date].countries[countryName]
            return (
            <Link to={`details/${countryObject.id}`} key={countryObject.id} class="dataList" onClick={() => {dispatch(getCountryData(countryObject.id))}}>
            <Card style={{maxHeight: "179px"}}>
              <Card.Body>
                <Card.Title>{countryName}</Card.Title>
                <Card.Subtitle>Confirmed Today: {countryObject.today_confirmed}</Card.Subtitle>
                </Card.Body>
            </Card>
            </Link>)
          })
        ))
    
  

}