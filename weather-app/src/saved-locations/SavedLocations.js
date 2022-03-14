import React from 'react'
import './saved-locations.css'
function SavedLocations() {

    return (
        <div className='content-parent'>
            <div className='content-child'>

                <h2>Saved Locations</h2>
                <h4>Select a location to view weather</h4>
                {/* //Table Just for styling purposes.
            //Replace with...code...yep */}

                <table className='data-table locations-table'>
                    <tr className='data-tr head-tr'>
                        <th>Locations</th>
                        <th>Temperature</th>
                    </tr>
                    <tr className='data-tr'>
                        <td>Winnipeg, Canada</td>
                        <td>-50'C</td>
                    </tr>
                    <tr className='data-tr'>
                        <td>Sahara Desert, Africa?</td>
                        <td>50'C</td>
                    </tr>
                    <tr className='data-tr'>
                        <td>Tokyo, Japan</td>
                        <td>0'C</td>
                    </tr>
                    <tr className='data-tr'>
                        <td>South Pole, Antartica</td>
                        <td>-100'C</td>
                    </tr>
                    <tr className='data-tr'>
                        <td>Indonasian Volcano</td>
                        <td>100'C</td>
                    </tr>
                    <tr className='data-tr'>
                        <td>Indonasian Volcano</td>
                        <td>100'C</td>
                    </tr>
                    <tr className='data-tr'>
                        <td>Indonasian Volcano</td>
                        <td>100'C</td>
                    </tr>

                </table>
            </div>
        </div>
    )
}

export default SavedLocations