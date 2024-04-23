import ZoneList from './ZoneList'
import ChangeVille from "./ChangeVille";


import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Component, default: React} = require("react");


class VilleList extends Component {
   

    constructor(props){
        super(props);
        this.state = {villes: []};
        var x = 0;
        
    }

    componentDidMount() {
        fetch('/api/villes')
            .then(response => response.json())
            .then(data => this.setState({villes: data}) );
      
    }
    
  
    render() {
      /* const villesList = villes.map(villes => {
                return <tr key={villes.id}>
                    <td>
                        {villes.nom}

                    </td>
                </tr>
        });*/

     
        const villesList = this.state.villes.map(villes => {

            return  <p>{villes.nom} </p>
           
        });

        return(
            
            <div style={{display:"flex",padding:"0px 0px 0px 10px",justifyContent:"center", marginTop:"2%"}}>
                             
                            <Form.Select size="sm" style={{width:"120px", height:"30px"}} onChange={(e)=> {this.nameVille= e.target.value; this.setState({nameVille:e.target.value}); this.x = 1 }}>
                            <option name = "optionn" value="villes">les Villes</option>
                                            
                                            {/* LOOP*/}
                                        {villesList.map((villeslist, key) => {
                                            return <option name = "option"value={villeslist.json} >{villeslist}  </option> 
                                        })}
                            </Form.Select>
                            <ChangeVille nameville = {this.nameVille} conteur = {this.x}/>
                           
                                {/*
                                <select >
                                    {
                                        villesList.map((opts,i) => <option>{opts}</option>)
                                    }
                                </select>
                                */}

                                    <ZoneList nameville = {this.nameVille}/>            
            </div>        
        )
        }   
}
export default VilleList;