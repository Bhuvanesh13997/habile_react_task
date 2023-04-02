import React, { useState} from 'react';
import { Stepper } from 'react-form-stepper';
import BorrowerInfo from './BorrowerInfo';
import DirectorInfo from './DirectorInfo';
import FinancialInfo from './FinancialInfo';
import PerformanceDetails from './PerformanceDetails';
import DocumentUpload from './DocumentUpload';
import './StepperForm.css';
import { toast } from 'react-toastify';

function StepperForm(props) {

    const [step, setStep] = useState(0);

    /*Every Tab data to be stored in individual state */

    const [borrowerInfo, setBorrowerInfo] = useState([]);
    const [directorInfo, setDirectorInfo] = useState([]);
    const [financialInfo, setFinancialInfo] = useState([]);
    const [performanceDetails, setPerformanceDetails] = useState([]);
    const [documents, setDocuments]     = useState([]);

    /*Function to store tab data in state & also to Move to next tab/step*/

    const moveStep = (key,step,data) => {

        console.log("moveStep data ==> ",key,step,data);
          
        switch (step) {
            case 1:
              setBorrowerInfo(data);
                break;
                
            case 2:
              setDirectorInfo(data);
                break;
    
            case 3:
              setFinancialInfo(data);
                break;
    
            case 4:
              setPerformanceDetails(data);
                break;
    
            case 5:
              setDocuments(data);
                break;
        
            default:
                break;
        }

        
        if (step === 5) {
            console.log("Final Step",data);
            toast.success("Data Saved Successfully")
            setTimeout(()=>setStep(0),1000)
        } else {
            setStep(step);
        }
        
    }

    /* Function to Move to previous step/tab */

    const backHandler = ()=>{
      setStep(prev => prev - 1)
    }


  return (
    <div className='StepperForm innerPage'>
        <header className='stepperHeaders'>
            <Stepper steps={[
                    { label: 'Borrower Company Info' }, { label: 'Director Info' }, { label: 'Financial Info' }, 
                    { label: 'Past Performance Details' }, { label: 'Document Upload' }
                  ]}
            activeStep={step}/>
        </header>

        <Stepper activeStep={step} className='stepperContainer'>
            {step === 0 && <BorrowerInfo label="Borrower Company Info" onSuccess={(k,s,d)=>moveStep(k,s,d)} />}
            {step === 1 && <DirectorInfo label="Director Info" onSuccess={(k,s,d)=>moveStep(k,s,d)} stepBack={backHandler} />}
            {step === 2 && <FinancialInfo label="Financial Info" onSuccess={(k,s,d)=>moveStep(k,s,d)} stepBack={backHandler}/>}
            {step === 3 && <PerformanceDetails label="Past Performance Details" onSuccess={(k,s,d)=>moveStep(k,s,d)} stepBack={backHandler}/>}
            {step === 4 && <DocumentUpload label="Document Upload" onSuccess={(k,s,d)=>moveStep(k,s,d)} stepBack={backHandler}/>}
        </Stepper>
        
    </div>
  )
}

export default StepperForm