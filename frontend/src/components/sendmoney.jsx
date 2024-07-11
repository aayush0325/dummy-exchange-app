import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

export function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const firstname = searchParams.get("first");
    const lastname = searchParams.get("last");
    const [amount, setAmount] = useState(0);
    const [warning, setWarning] = useState(false);
    const [transferSuccess, setTransferSuccess] = useState(false);
    const [transferFail, setTransferFail] = useState(false);

    function Warning() {
        return (
        <div className="bg-red-600 text-white mt-3 rounded p-6">
            Please enter a valid number!
        </div>
        );
    }

    function Success() {
        return (
        <div className="bg-green-600 text-white mt-3 rounded p-6">
            Transfer Successful
        </div>
        );
    }

    function Fail() {
        return (
        <div className="bg-red-600 text-white mt-3 rounded p-6">
            Transfer Unsuccessful, insufficient balance
        </div>
    );
    }

    let component3;
    if (transferFail) {
        component3 = <Fail />;
    } else {
        component3 = null;
    }

    let component2;
    if (transferSuccess) {
        component2 = <Success />;
    } else {
        component2 = null;
    }

    let component;
    if (warning) {
        component = <Warning />;
    } else {
        component = null;
    }

    const navigate = useNavigate();

    return (
        <div className='flex h-screen items-center justify-center bg-slate-500'>
            <div className='flex flex-col border shadow-md p-6 sm:p-10 justify-center items-center bg-white'>
                <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-10 sm:mb-20 text-center'>
                    Send Money
                </div>
                <div className="flex items-center mt-3 text-center">
                    <div className="bg-blue-500 text-white w-8 h-8 sm:w-10 sm:h-10 text-center mx-1 rounded-full flex items-center justify-center">
                        {firstname[0]}
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl ml-2">
                        {firstname} {lastname}
                    </div>
                </div>
                <div className='my-6'>
                    <TextField fullWidth label="Amount" id="fullWidth" onChange={(e) => {
                        setAmount(Math.floor(parseInt(e.target.value)))
                    }} />
                </div>
                <div>
                    <Button variant="contained" onClick={() => {
                        if (isNaN(amount) || typeof amount !== "number") {
                            setWarning(true);
                            setTransferSuccess(false)
                            setTransferFail(false)
                        } else {
                            setWarning(false);
                            axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to: id,
                                amount: amount,
                            }, {
                                headers: {
                                    "Authorization": `Bearer ${localStorage.token}`
                                }
                            }).then(
                                (res) => {
                                    if (res.data.message) {
                                        setTransferSuccess(true)
                                        setTransferFail(false)
                                        setWarning(false)
                                    }else{
                                        setTransferSuccess(false)
                                        setTransferFail(true)
                                        setWarning(false)
                                        console.log('failed')
                                    }
                                }
                            )
                        }
                    }}>Send Money</Button>
                    <div className='flex justify-center mt-3'>
                        <Button variant="outlined" onClick={() => {
                            navigate('/dashboard')
                        }}>Back</Button>
                    </div>
                </div>
                {component}
                {component2}
                {component3}
            </div>
        </div>
    )
}
