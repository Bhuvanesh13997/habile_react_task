import React from 'react'

function DocumentUpload({onSuccess,stepBack}) {

    const submitHandler = ev => {
        ev.preventDefault();
        onSuccess("DocumentUploads", 5);
    };

  return (
        <form className='form'>
            <div className='formArea'>
                <header className='formHeader'>
                    <h3>Document Upload</h3>
                </header>
            </div>
            
            <footer className='btn_panel'>
                <button className='back' onClick={stepBack}>Back</button>
                <button className='continue' onClick={(event)=>submitHandler(event)}>Continue</button>
            </footer>
        </form>
  )
}

export default DocumentUpload