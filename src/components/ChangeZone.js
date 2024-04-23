import { useNavigate } from "react-router-dom";

export default function ChangeZone(props){
    const navigate = useNavigate();

    var nombre = props.conteur;

        while(nombre === 1){
            try {
                return (navigate("/api/villes/"+props.nameville+"/zones/"+props.namezones+"/pharmacies" ) ) 
            } catch (error) {
                console.log("Error from Change zone"+error);
            }
           
        }
}