import React from 'react'

function Selector() {
    return (
        <>
            <div>
                <h2>Search</h2>
                <h4>Search for a city or airport</h4>
                <label htmlFor="searcher" ></label>
                <input name="searcher" type="text" placeholder="Search a location" />
            </div>
        </>
    )
}

export default Selector