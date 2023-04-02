import React, { useState} from 'react';
import { Stepper } from 'react-form-stepper';
import './StepForm.css';
import { toast } from 'react-toastify';
import TabComponent from './TabComponent';
import ModelData from './Model.json';

function StepForm() {
    
    const [FinalData, setFinalData] = useState({});
    const [step, setStep] = useState(0);

    const PageNames = () =>{
        let tabHeaders = [];
        ModelData.map((item)=>{
          tabHeaders.push({'label':item.pageName});
        })
        return tabHeaders;
    }

    // Function to store Tab data in state & move to next tab

    const moveStep = (tabName,step,tabData) => {

        console.log("moveStep data ==> ",tabName,step,tabData);
        setFinalData({...FinalData,[tabName]:tabData});

        let data = {...FinalData,[tabName]:tabData};
        
        if (step === ModelData.length) {  // When Last Tab form is submitted
            SaveForm(data);
        } else {
            setStep(step);
        }
    }

    // Function to move to previous tab

    const backHandler = ()=>{
        setStep(prev => step > 0 ? prev - 1 : 0)
    }

    // Final Form Data Submit (POST API CALL)

    const SaveForm = (data) =>{

        console.log('FinalData for POST API =========================>',data); // Logging Final Data
        toast.success("Data Saved Successfully");
        setStep(0);

        // Post API Call

        // requestOptions = {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(FinalData)
        // };

        // fetch('https://cloudbank.in/addForm',requestOptions)
        //     .then(res => res.json())
        //     .then(data => {
        //       console.log("data ==> ", data);
        //     })
        //     .catch(error => { 
        //       console.log("error ==> ", error);
        //     });
        
    }

  return (
    <div className='StepperForm innerPage'>
        <header className='stepperHeaders'>
            <Stepper steps={PageNames()}
            activeStep={step}/>
        </header>

        <Stepper activeStep={step} className='stepperContainer'>
            {
              ModelData.map((item,index)=>{
                  return( 
                      step === index && <TabComponent key={index} fields={item.fields} label={item.pageName} onSuccess={(k,s,d)=>moveStep(k,s,d)} stepBack={backHandler} currentStep={index}/>
                  )
            })}
        </Stepper>
        
    </div>
  )
}

export default StepForm