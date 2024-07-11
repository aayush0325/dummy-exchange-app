import { Button } from "@mui/material";
import { Appbar } from "./appbar";
import { Balance } from "./balance";
import { Users } from "./users";

export function Dashboard({user}){
    return (
        <div className="h-screen">
            <Appbar/>
            <div className="m-10">
                <Balance value={10000}/>
                <Users/>
            </div>
        </div>
    )
}