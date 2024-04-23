import axios from "axios";
import { useEffect, useState } from "react";

export default function Photo(props){
    const[photo, setPhoto] = useState([])
   
    useEffect(() => {
        axios.get('/photo').then((response) => {
        setPhoto(response.data);
 
    })
  
    }, [])

    return(
    <div style={{marginTop:"50px", marginLeft:"-300px"}}>

        {photo.map((photo , i) => (
        (photo.pharmacie?.nom) === props.pharmacieName?  ( <> <div style={{display:"flex",}}><img src={process.env.PUBLIC_URL + '/image/' + photo.url} height={"500px"} width={"700px"} alt="PharmacieImage"/> <iframe src={`https://www.google.com/maps?q=${photo.pharmacie?.laltitude},${photo.pharmacie?.longitude}&hl=es;&output=embed`} height={"500px"} width={"500px"} title="MAP for Pharmacies"></iframe> </div></>): null
        ))}
    </div>
    );
}