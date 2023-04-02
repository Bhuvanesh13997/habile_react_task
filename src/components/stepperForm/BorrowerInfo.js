import React, { useState,useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import pdfIcon from '../../assets/icons/icon_pdf.png';

function BorrowerInfo({onSuccess}) {

    const [data,setData] = useState({});
    const [files, setFiles] = useState([]);
    const [pdfUrl, setPdfUrl] = useState([]);

    const changeHandler = (event) =>{
        let {name,value} = event.target;
        setData({...data,[name]:value});
    }

    const submitHandler = ev => {
        ev.preventDefault();
        onSuccess("directorInfo", 1,data);
        console.log('borrowerInfo',data);
    };
    
    const {
      acceptedFiles,
      fileRejections,
      getRootProps,
      getInputProps
    } = useDropzone({
      accept: '.pdf',
      onDrop: acceptedFiles => {
        acceptedFiles.forEach( async (file, index) => {
          const reader = new FileReader();
          reader.onload = function(e) {
            setPdfUrl(prevState => [
              ...prevState,
              { src: e.target.result }
            ]);
          };
          reader.readAsDataURL(file);
          setFiles(prevState => [ ...prevState, file]);
          console.log("files", files);
          return file;
        });
      }
    });

    const thumbs = pdfUrl.map((file, index) => (
      <div className="droppedThumb" key={index}>
          <div>
            <img src={pdfIcon} />
          </div>
          <nav>
              <button title='delete' type="button" className="btn_delete" onClick={(f)=>{ deleteFile(index) }}>
                  <i className='icon icon_delete'></i>
              </button>
          </nav>
      </div>
    ));

    const deleteFile = (assetIndex) => {

      console.log('assetIndex',assetIndex);
      let newFiles = files;
      if(assetIndex != null) {
        newFiles.splice(assetIndex, 1);
        setFiles( newFiles );
      }
    };


  return (
        <form className='form'>
            <div className='formArea'>
                <header className='formHeader'>
                    <h3>Borrower Company Info</h3>
                </header>
                <main className='formMain'>
                    <div>
                        <div className='formInputs'>
                            <label className='formLabel'>Property Name</label>
                            <input placeholder="Property Name" name="propertyName" type="text" onChange={(event)=>changeHandler(event)}/>
                        </div>
                        <div className='formInputs'>
                            <label className='formLabel'>Property Type</label>
                            <select name="propertyType" onChange={(event)=>changeHandler(event)}>
                                <option value="" disabled selected>Property Type</option>
                                <option value="Own House">Own House</option>
                                <option value="Rented">Rented</option>
                            </select>
                        </div>
                        <div className='formInputs'>
                            <label className='formLabel'>Number of Units</label>
                            <select name="numberOfUnits" onChange={(event)=>changeHandler(event)}>
                                <option value="" disabled selected>Number of Units</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className='formTextArea'>
                        <label className='formLabel'>Property Address</label>
                        <textarea placeholder='Enter Borrower Name' name="propertyAddress" onChange={(event)=>changeHandler(event)}>

                        </textarea>
                    </div>

                    <div className='formTextArea'>
                        <label className='formLabel'>File Attachment</label>
                        <div className={ files.length > 0 ? "droppedList" : "" } style={{'marginTop':'10px'}}>
                            {thumbs}
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <div className="full-drop-wrapper">
                                    <span className='btn_browse'>Browse</span>                                    
                                    <span> or Drag and drop to attach a file</span>                                    
                                </div>
                                <div className="short-drop-wrapper">
                                    <button type="button"className="btn_add"><i className='icon icon_addPlus'></i></button>
                                    <h4>Add file(s)</h4>
                                </div>
                            </div> 
                        </div>
                    </div>
                </main>
            </div>
            
            <footer className='btn_panel'>
                <button type="button" className='back'>Back</button>
                <button className='continue' onClick={(event)=>submitHandler(event)}>Continue</button>
            </footer>
        </form>
  )
}

export default BorrowerInfo