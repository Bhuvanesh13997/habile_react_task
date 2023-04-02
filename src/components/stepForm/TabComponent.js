import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone';
import pdfIcon from '../../assets/icons/icon_pdf.png';

function TabComponent({label,fields,currentStep,onSuccess,stepBack}) {

    const [data,setData] = useState({});
    const [files, setFiles] = useState([]);
    const [pdfUrl, setPdfUrl] = useState([]);

    const changeHandler = (event) =>{
        let {name,value} = event.target;
        setData({...data,[name]:value});
    }

    const submitHandler = ev => {
        ev.preventDefault();
        onSuccess(label.split(' ').join(''),currentStep + 1,data);
    };
    
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
      } = useDropzone({
        accept: {'application/pdf':['.pdf']},
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


    const thumbnails = pdfUrl.map((file, index) => {
        
        return(
            <div className="droppedThumb" key={index}>
                <div>
                    <img src={pdfIcon} alt='pdf_icon'/>
                </div>
            </div>
        )}
    );


    const FormLayout = fields.map( field => {

        if(field.type === "string"){
            return(
                <div className='formInputs' key={field.fieldId}>
                    <label className='formLabel'>{field.fieldName}</label>
                    <input placeholder={`Enter ${field.fieldName}`} name={field.fieldName} type="text" onChange={(event)=>changeHandler(event)}
                        autoComplete='off'/>
                </div>
            )
        }
        else if(field.type === "dropdown"){
            return(
                <div className='formInputs' key={field.fieldId}>
                    <label className='formLabel'>{field.fieldName}</label>
                    <select name={field.fieldName} onChange={(event)=>changeHandler(event)}>
                        <option hidden>{field.fieldName}</option>
                        {
                            field.selectableValues.map((dropdownValue)=>{
                                return <option key={dropdownValue} value={dropdownValue}>{dropdownValue}</option>
                            })
                        }
                    </select>
                </div>
            )
        }
        else if(field.type === "textarea"){
            return(
                <div className='formTextArea' key={field.fieldId}>
                    <label className='formLabel'>{field.fieldName}</label>
                    <textarea placeholder={`Enter ${field.fieldName}`} name={field.fieldName} onChange={(event)=>changeHandler(event)}></textarea>
                </div>
            )
        }
        else if(field.type === "file"){
            return(
                <div className='formFileInput' key={field.fieldId}>
                    <label className='formLabel'>File Attachment</label>
                    <div className={ files.length > 0 ? "droppedList" : "" } style={{'marginTop':'10px'}}>
                        {thumbnails}
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
            )
        }
    })

  return (
        <form className='form'>
            <div className='formArea'>
                <header className='formHeader'>
                    <h3>{label}</h3>
                </header>
                <main className='formMain'>
                    {/* Form Layout dynamic is rendered here  */}
                    {FormLayout}                    
                </main>
            </div>
            
            <footer className='btn_panel'>
                <button type="button" className='back' onClick={()=>stepBack()}>Back</button>
                <button className='continue' onClick={(event)=>submitHandler(event)}>Continue</button>
            </footer>
        </form>
  )
}

export default TabComponent