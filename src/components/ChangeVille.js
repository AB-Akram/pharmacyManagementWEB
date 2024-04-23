import { useNavigate } from "react-router-dom";

export default function ChangeVille(props){
    const navigate = useNavigate();

    var nombre = props.conteur;
        while(nombre === 1){
            try {
                return (navigate("/api/villes/"+props.nameville+"/zones" ) ) 
            } catch (error) {
                console.log("Error from Change ville"+error);
            }
           
        }
}