import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import data from './data.json'
import './search.css'
function Search() {
    let navigate = useNavigate();
    const [input, setInput] = useState("")
    const displayer = (e) => {
        e.preventDefault()
        setInput(e.target.value);
    };
    const displayer2 = (e) => {
        setInput(e.target.value);
    };

    if (input.length > 0) {
        document.querySelector('table').style.display = "block"
        // let trArray = document.querySelectorAll('tr')

        // for (let index = 0; index < trArray.length; index++) {
        //     const element = trArray[index];
        //     element.style.display = 'block'
        // }
        data = data.filter((i) => {
            return i.name.match(input.charAt(0).toUpperCase() + input.slice(1));
        })
    }
    window.addEventListener('DOMContentLoaded', (event) => {
        // let trArray = document.querySelectorAll('tr')

        // for (let index = 0; index < trArray.length; index++) {
        //     const element = trArray[index];
        //     element.style.display = 'none'
        // }
        document.querySelector('table').style.display = "none"
    });
    return (
        <div className='content-parent'>
            <div className="content-child">
                <div className='p-t-container'>
                    <h2 className='page-title'>Search</h2>
                    <h4 className='page-subtitle'>Search for a city or airport</h4>
                    <div className='searcher'>
                        <label htmlFor="s-l" ></label>
                        <input type="text" className='s-in' placeholder='search location' onChange={displayer} onKeyDown={displayer2} value={input} />

                    </div>
                </div>
            <table className='data-table search-table'>
                <thead>
                    <tr className='data-tr head-tr'>
                        <th>City</th>
                        <th>Country</th>
                        <th>Weather</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, lat) => {
                        return (<>
                            <tr key={lat} className='data-tr head-tr'>
                                <td>{entry.name}</td>
                                <td>{entry.country}</td>
                                <td><button onClick={() => { navigate(`/location/${entry.name}`) }} className='s-btn'> Go </button></td>
                            </tr>
                        </>);
                    })}
                </tbody>
                </table>
            </div>
        </div>
    )

}
export default Search