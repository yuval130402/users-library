import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { setSearchQuery } from 'features/search/searchSlice';
import { resetPage } from 'features/pagination/pageSlice';


function SearchBar() {
    const dispatch = useDispatch();
    const [localSearchQuery, setLocalSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setLocalSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPage());
        dispatch(setSearchQuery(localSearchQuery));
    };
    return (
        <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
                type="search"
                style={{ width: "320px"}}
                placeholder="Search by Email, Name, ID, or Location"
                className="me-2"
                aria-label="Search"
                value={localSearchQuery}
                onChange={handleSearchChange}
            />
            <Button variant="secondary" type="submit">Search</Button>
        </Form>
    )
}

export default SearchBar;