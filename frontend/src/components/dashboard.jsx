import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";



export function Dashboard(){

    return (
        <div>
            hello broski
            <Logout/>
        </div>
    )
}


function Logout(){
    const navigate = useNavigate();
    return (
        <Button variant="contained" onClick={() => {
            localStorage.removeItem('token')
            navigate('/signin')
        }}>Log out</Button>
    )
}