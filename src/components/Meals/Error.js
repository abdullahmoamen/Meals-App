import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NiceError(){
    const notify = () =>
    toast.error('   TERE IS AN ERROR , TRY AGAIN ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
        });
    return (
    <div>
        <button onClick={notify} className="errorBtn"
        >ERROR 404!  PLEASE CLICK HERE!</button>
        <ToastContainer
        className='toast'
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </div>
    );
}
export default NiceError