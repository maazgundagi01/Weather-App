import { useState } from 'react'
import data from './data.json'
import './search.css'
function Search() {
    const [input, setInput] = useState("")
    const displayer = (e) => {
        e.preventDefault()
        setInput(e.target.value);
    };
    if (input.length >= 0) {
        data = data.filter((i) => {
            return i.name.match(input.charAt(0).toUpperCase() + input.slice(1));
        })
    }
    return (
        <div className='content-parent'>
            <div className="content-child">
                <div className='p-t-container'>

                    <h2 className='page-title'>Search</h2>
                    <h4 className='page-subtitle'>Search for a city or airport</h4>
                    <div className='searcher'>
                        <label htmlFor="s-l" ></label>
                        <input type="text" className='s-in' placeholder='search location' onChange={displayer} onLoad={displayer} value={input} />
                    </div>
                </div>
            <table className='data-table search-table'>
                <tr className='data-tr head-tr'>
                        <th>City</th>
                        <th>Country</th>
                </tr>
                    {data.map((entry, lat) => {
                        return (<>
                            <tr key={lat} className='data-tr head-tr'>
                                <td>{entry.name}</td>
                                <td>{entry.country}</td>
                                <button></button>
                            </tr>
                        </>);
                    })}
                </table>
            </div>
        </div>

    )
}

export default Search