import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField} from "@mui/material";
import { useCallback } from 'react'

export function Dashboard(){
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [balance,setBalance] = useState(0)
    const [filter,setFilter] = useState("")
    const [users,setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/info',{
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        }).then(
            res => {
                setFirstname(res.data.firstname)
                setLastname(res.data.lastname)
            }
        )

        axios.get('http://localhost:3000/api/v1/account/balance',{
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        }).then(
            res => {
                setBalance(res.data.balance)
            }
        )
    },[])


    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        }).then(
            (res) => {
                setUsers(res.data.user);
            }
        )
    },[filter])
    return (
        <div>
            <TopBar firstname={firstname}/>
            <Balance balance={balance}/>
            <Search filter={filter} setFilter={setFilter}/>
            <Users users={users}/>
        </div>
    )
}

function TopBar({firstname}){
    return (
        <div className="grid grid-cols-2 shadow-lg items-center">
            <div className="text-xl font-bold p-3 md:mx-3">
                Payments App
            </div>
            <div className="flex justify-end  p-3 items-center font-semibold">
                <div className="text-sm mr-1 md:mr-3 md:text-lg">
                    Hello, {firstname}
                </div>
                <div className="bg-blue-500 text-white w-8 h-8 text-center rounded-full flex items-center justify-center md:mx-2 md:w-10 md:h-10">
                    {firstname[0]}
                </div>
            </div>
        </div>
    )
}

function Logout(){
    const navigate = useNavigate();
    return (
        <div className="">
            <Button variant="contained" onClick={() => {
                localStorage.removeItem('token')
                navigate('/signin')
            }}>Log out</Button>
        </div>
    )
}

function Balance({balance}){
    return (
        <div className="flex justify-between m-10">
            <div className=" text-xl font-bold md:text-3xl text-center">
                Balance: {Math.floor(balance)} Tokens
            </div>
            <Logout/>
        </div>
    )
}

function Search({filter,setFilter}){
    const handleInput = useCallback((e) => {
        setFilter(e.target.value);
        console.log(e.target.value);
    }, []);

    const debounce = (fn, delay) => {
        let timerID;
        return (...args) => {
            clearTimeout(timerID);
            timerID = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const debouncedCall = useCallback(debounce(handleInput, 1000), [handleInput]);
    return (
        <div className="flex justify-center mx-7">
            <TextField fullWidth label="Search Users" id="fullWidth" onChange={debouncedCall} />
        </div>
    )   
}

function Users({users}){
    return <div>
        {users.map(user => <User firstname={user.firstname} lastname={user.lastname} id={user._id}/>)}
    </div>
}

function User({firstname,lastname,id}){
    const navigate = useNavigate();
    return (
        <div className="flex justify-between border shadow-md mx-7 my-3 p-4">
            <div className="flex items-center">
                <div className="bg-blue-500 text-white w-8 h-8 text-center mx-1 rounded-full flex items-center justify-center md:mx-2 md:w-10 md:h-10">
                    {firstname[0]}
                </div>
                <div className="text-xl ml-4">
                    {firstname} {lastname}
                </div>
            </div>
            <div className="flex justify-end">
                <Button variant="contained" onClick={() => {
                    navigate(`/send?id=${id}&first=${firstname}&last=${lastname}`);
                }}>Send Money</Button>
            </div>
        </div>
    )
}