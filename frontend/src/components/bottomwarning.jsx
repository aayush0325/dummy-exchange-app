import { Link } from "react-router-dom"

export function BottomWarning({label,buttonText,to}){
    return(
        <div className="flex font-thin justify-center text-lg mt-3">
            <div>
                {label}
            </div>
            <Link to={to} className="ml-1 underline text-blue-600">
                {buttonText}
            </Link>
        </div>
    )
}