import { TextField,Button } from "@mui/material"
import { BottomWarning } from "./bottomwarning"
export function Signup(){
    return (
        <div className="flex justify-center items-center h-screen bg-slate-400">
            <div className='w-full max-w-xs text-center'>
                <div className='flex flex-col justify-center bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border'>
                    <div className='text-4xl font-bold mb-4'>Sign Up</div>
                    <InputBox heading={"First Name"}/>
                    <InputBox heading={"Last Name"}/>
                    <InputBox heading={"Username"}/>
                    <InputBox heading={"Password"}/>
                    <div className='flex justify-center'>
                    <Button variant="contained">Sign Up</Button>
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}

export function InputBox({heading}){
    return (
        <div className='mb-2 flex justify-center flex-col'>
        <div className='text-lg font-semibold mb-2'>{heading}</div>
        <TextField id='outlined-basic' label={heading} variant='outlined'/>
        </div>
    )
}