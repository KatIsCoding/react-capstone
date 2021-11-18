import { useDispatch , useSelector } from "react-redux";
import React from "react";
import { Form } from "react-bootstrap";
import { setSearchQuery } from "../redux/cases/cases";

export default function SearchBar(){
  const { searchQuery } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
  <Form onSubmit={(e) => {e.preventDefault()}}>
    <Form.Group controlId="formSearchCountry">
        <Form.Control
            value={searchQuery}
            onInput={e => dispatch(setSearchQuery(e.target.value))}
            type="text"
            placeholder="Search Country"
            name="searchCountry"
            style={{textAlign: "center", border: "none"}}
        />
    </Form.Group>
    </Form>
  )
}