import React from 'react';
import PropTypes from "prop-types";
import { Pagination, Navbar } from 'react-bootstrap';


const PaginatedFooter = ({
    totalPages, currentPage, onPageChange
}) => {
    
    return (
        <Navbar fixed="bottom" 
            style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}
            className='paginatedFooter' bg="dark" data-bs-theme="dark">    
            <Pagination>
                <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => onPageChange(index + 1)}>
                    {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
        </Navbar>
    )
};

PaginatedFooter.propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
}

export default PaginatedFooter;