import React from "react";
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { toggleBackButton } from "../redux/cases/cases";

const filterCountries = (dates, search) => {
  if (!Object.keys(dates).length || !dates) return [];
  const currentCountries = Object.values(Object.values(Object.values(dates)[0])[0]);
  if (!search || search === "") return currentCountries;
  return currentCountries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
}


export default function ListComponent() {
  const dispatch = useDispatch();
  const {dates, searchQuery} = useSelector(state => state);
  return (filterCountries(dates, searchQuery).map(countryObj => {
        const countryObject = countryObj
        return (
        <Link to={`details/${countryObject.id}`} key={countryObject.id} onClick={() => dispatch(toggleBackButton())} className="dataList" data-testid="data-item">
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