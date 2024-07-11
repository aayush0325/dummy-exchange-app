import { TextField,Button } from "@mui/material"
import { BottomWarning } from "./bottomwarning"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"




export function Signup(){
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [showWarning,setShowWarning] = useState(false)
    let component;
    if(showWarning){
        component = <Warning/>
    }else{
        component = null
    }
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-slate-400">
            <div className='w-full max-w-xs text-center'>
                <div className='flex flex-col justify-center bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border'>
                    <div className='text-4xl font-bold mb-4'>Sign Up</div>
                    <InputBox password={false} heading={"First Name"} onChange={(e) => {
                        setFirstname(e.target.value);
                    }}/>
                    <InputBox password={false} heading={"Last Name"} onChange={(e) => {
                        setLastname(e.target.value)
                    }}/>
                    <InputBox password={false} heading={"Username"} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                    <InputBox password={true} heading={"Password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                    <div className='flex justify-center'>
                    <Button variant="contained" onClick={async () => {
                        if(firstname.length<3 || lastname.length<3 || username.length<3 || password.length<3){
                            setShowWarning(true)
                        }else{
                            setShowWarning(false)
                             const response = await  axios.post('http://localhost:3000/api/v1/user/signup',{
                                username,
                                password,
                                firstname,
                                lastname, 
                            })
                            localStorage.setItem("token", response.data.token);
                            navigate('/dashboard');
                        }
                    }}>Sign Up</Button>
                    </div>
                    {component}
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
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

export function Warning(){
    return (
        <div className="bg-red-600 text-white mt-3 rounded p-3">
            All fields should be more than 3 characters and less than 50 characters
        </div>
    )
}