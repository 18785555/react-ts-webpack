import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getpersonal_fm } from "../../../utils/apis";



const Fm = ()=>{
    useEffect(()=>{
        getpersonal_fm().then(res=>{
            console.log(res);
            
        })
    },[])
    return(
    <div>
        私人FM
    </div>
)}

export default Fm