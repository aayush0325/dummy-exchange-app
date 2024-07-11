import { TextField, Button } from "@mui/material";
import { BottomWarning } from "./bottomwarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [invalid, setInvalid] = useState(false);

    let component;
    if (showWarning) {
        component = <Warning />;
    } else {
        component = null;
    }

    let component2;
    if (invalid) {
        component2 = <UserPassWrong />;
    } else {
        component2 = null;
    }
    
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-slate-400">
            <div className='w-full max-w-xs text-center'>
                <div className='flex flex-col justify-center bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border'>
                    <div className='text-4xl font-bold mb-4'>Sign In</div>
                    <InputBox password={false} heading={"Username"} onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                    <InputBox password={true} heading={"Password"} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <div className='flex justify-center'>
                        <Button variant="contained" onClick={async () => {
                            if (username.length < 3 || password.length < 3) {
                                setShowWarning(true);
                                setInvalid(false);
                            } else {
                                setShowWarning(false);
                                setInvalid(false);  // Reset invalid state before making request
                                try {
                                    const res = await axios.post('http://localhost:3000/api/v1/user/signin', {
                                        username,
                                        password,
                                    });
                                    if (res.data.token) {
                                        localStorage.setItem("token", res.data.token);
                                        navigate('/dashboard');
                                    } else if (res.data.msg === "user not found") {
                                        setInvalid(true);
                                    }
                                } catch (error) {
                                    console.error("Error during sign-in", error);
                                    setInvalid(true);
                                }
                            }
                        }}>Sign In</Button>
                    </div>
                    <div>
                        {component}
                    </div>
                    <div>
                        {component2}
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
}

export function InputBox({ heading, onChange,password }) {
    if(password){
        return (
            <div className='mb-2 flex justify-center flex-col'>
                <div className='text-lg font-semibold mb-2'>{heading}</div>
                <TextField id='outlined-basic' label={heading} variant='outlined' onChange={onChange} type="password"/>
            </div>
        );
    }else{
        return (
            <div className='mb-2 flex justify-center flex-col'>
                <div className='text-lg font-semibold mb-2'>{heading}</div>
                <TextField id='outlined-basic' label={heading} variant='outlined' onChange={onChange} />
            </div>
        );
    }
    
}

function Warning() {
    return (
        <div className="bg-red-600 text-white mt-3 rounded p-3">
            All fields should be more than 3 characters and less than 50 characters
        </div>
    );
}

function UserPassWrong() {
    return (
        <div className="bg-red-600 text-white mt-3 rounded p-3">
            Username or password is incorrect
        </div>
    );
}
