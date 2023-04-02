import React from 'react'

function FinancialInfo({onSuccess,stepBack}) {

    const submitHandler = ev => {
        ev.preventDefault();
        onSuccess("Moving to PerformanceDetails", 3); /* onSuccess("nextTabName", nextStep);*/
    };

  return (
        <form className='form'>
            <div className='formArea'>
                <header className='formHeader'>
                    <h3>Financial Info</h3>
                </header>
            </div>
            
            <footer className='btn_panel'>
                <button className='back' onClick={stepBack}>Back</button>
                <button className='continue' onClick={(event)=>submitHandler(event)}>Continue</button>
            </footer>
        </form>
  )
}

export default FinancialInfo