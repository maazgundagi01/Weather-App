import React from 'react'
import './saved-locations.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
function SavedLocations() {

    let navigate = useNavigate();
    let savedLocations = [];
    savedLocations = JSON.parse(localStorage.getItem("saved-locations") || "[]");

    function handleNavigation(linkURL) {
        navigate(linkURL);
    }

    return (
        <div className='content-parent'>
            <div className='content-child'>
                <div className="p-t-container">
                    <h2 className='page-title'>Saved Locations</h2>
                    <h4 className='page-subtitle'>Select a location to view weather</h4>
                </div>
                <table className='data-table locations-table'>
                    <thead>
                        <tr className='data-tr head-tr'>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        savedLocations.map((el, index) => {
                            var country = el[1].replace(/\s/g, "");
                            return(
                                <tr key={el[0]} className='data-tr'>
                                    <td>{el[0]}</td>
                                    <td>{el[1]}</td>
                                    <td>
                                    <button onClick={() => { navigate(`/location/${el[0]},${country}`) }} className='s-btn'> Go </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SavedLocations