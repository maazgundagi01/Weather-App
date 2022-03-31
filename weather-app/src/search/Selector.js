import React from 'react'
function Selector() {
    return (
        <>
            <div>
                <div className='p-t-container'>
                    <h2 className='page-title'>Search</h2>
                    <h4 className='page-subtitle'>Search for a city or airport</h4>
                    <form className='searcher'>
                        <label htmlFor="s-l" ></label>
                        <input class="s-in" name="searcher" type="text" />
                        <button class="s-btn">Go</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Selector