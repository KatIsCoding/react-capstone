import React from "react";
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const filterCountries = (dates, search) => {
  if (!Object.keys(dates).length || !dates) return [];
  const currentCountries = Object.values(Object.values(Object.values(dates)[0])[0]);
  if (!search || search === "") return currentCountries;
  return currentCountries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
}


export default function ListComponent() {

  const {dates, searchQuery} = useSelector(state => state);
  return (filterCountries(dates, searchQuery).map(countryObj => {
        const countryObject = countryObj
        return (
        <Link to={`details/${countryObject.id}`} key={countryObject.id} class="dataList" >
        <Card style={{height: "124px", minWidth: "193px"}}>
          <Card.Body>
            <Card.Title>{countryObject.name}</Card.Title>
            <Card.Subtitle>Confirmed Today: {countryObject.today_confirmed}</Card.Subtitle>
            </Card.Body>
        </Card>
        </Link>)
      })
    );
    
  

}