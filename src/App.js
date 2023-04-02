import './App.css';
import './fonts/Avenir/AvenirLTStd-Black.otf';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Topbar from './components/library/topbar/Topbar';
import StepForm from './components/stepForm/StepForm';
import PageNotFound from './components/library/404/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App font-face-avenir">
        <BrowserRouter basename={'/'}>
            <Topbar/>
            <Routes>
                <Route path="/" element={<StepForm/>} />
                <Route path="/step_form" element={<StepForm/>} />
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>

        <div>
            <ToastContainer />
        </div>
    </div>
  );
}

export default App;
