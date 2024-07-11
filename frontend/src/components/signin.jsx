import { TextField,Button } from "@mui/material"
import { BottomWarning } from "./bottomwarning"
export function Signin(){
    return (
        <div className="flex justify-center items-center h-screen bg-slate-400">
            <div className='w-full max-w-xs text-center'>
                <div className='flex flex-col justify-center bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border'>
                    <div className='text-4xl font-bold mb-4'>Sign In</div>
                    <InputBox heading={"Username"}/>
                    <InputBox heading={"Password"}/>
                    <div className='flex justify-center'>
                    <Button variant="contained">Sign In</Button>
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
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