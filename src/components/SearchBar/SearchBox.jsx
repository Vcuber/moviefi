import React from 'react';

const SearchBox = (props) => {
    return ( 
        <div class="container col col-sm-4">
            <input 
                className="form-control" 
                type="text" 
                value = {props.value}
                onChange = {(event) => props.setSearchData(event.target.value)}
                placeholder="Search for a movie ;)" 
            />
            <div class="search"></div>
        </div>
    )
}

export default SearchBox;