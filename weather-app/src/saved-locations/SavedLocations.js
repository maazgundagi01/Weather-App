import React from 'react'

function SavedLocations() {

    return (
        <div>
            {/* //Table Just for styling purposes.
            //Replace with...code...yep */}
            <table>
                <tr>
                    <th>Locations</th>
                    <th>Temperature</th>
                </tr>
                <tr>
                    <td>Winnipeg, Canada</td>
                    <td>-50'C</td>
                </tr>
                <tr>
                    <td>Sahara Desert, Africa?</td>
                    <td>50'C</td>
                </tr>
                <tr>
                    <td>Tokyo, Japan</td>
                    <td>0'C</td>
                </tr>
                <tr>
                    <td>South Pole, Antartica</td>
                    <td>-100'C</td>
                </tr>
                <tr>
                    <td>Indonasian Volcano</td>
                    <td>100'C</td>
                </tr>
            </table>
        </div>
    )
}

export default SavedLocations