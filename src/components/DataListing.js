import React from "react";
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom";

export default function ListComponent({ dates }) {
    
      return Object.keys(dates).map(date => (
          Object.keys(dates[date].countries).map(countryName => {
            const countryObject = dates[date].countries[countryName]
            return (
            <Link to={`details/${countryObject.id}`} key={countryObject.id}>
            <Card style={{width: "10rem"}}>
              <Card.Body>
                <Card.Title>{countryName}</Card.Title>
                <Card.Subtitle>Confirmed Today: {countryObject.today_confirmed}</Card.Subtitle>
                </Card.Body>
            </Card>
            </Link>)
          })
        ))
    
  

}