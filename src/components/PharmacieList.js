import React, {Component} from 'react';
import Photo from './Photo';

import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

class PharmacieList extends Component {

    constructor(props){
        super(props);
        this.state = {pharmacies: []};
        var namePharmacie;
        var nameVillesP;
        var photoPharmacieName;
    }

    componentDidMount() {
        
        if(this.nameVillesP !== undefined){
       fetch(`/api/villes/:nom/zones/${this.nameVillesP}/pharmacies`)
            .then(response => response.json())
            .then(data => this.setState({pharmacies: data}) );
        }
    }
    
    render(){
        this.nameVillesP = this.props.namezones;
        const pharmaciesList = this.state.pharmacies.map(pharmacies => {
                return <p> {pharmacies.nom}</p>
        });

         const fetchParmacie= () => {
            fetch(`/api/villes/:nom/zones/${this.nameVillesP}/pharmacies`)
            .then(response => response.json())
            .then(data => this.setState({pharmacies: data}) );
        }
        
        return(
            <div style={{padding:"0px 0px 0px 10px"}}>          

                <Form.Select size="sm" style={{width:"150px", height:"30px"}} onClick={(e)=>{this.namePharmacie= e.target.value; this.setState({namePharmacie:e.target.value}); fetchParmacie(); this.photoPharmacieName=e.target.value}}>
                        <option name = "optionn">Pharmacies</option>
                                
                                {pharmaciesList.map((pharmacieslist, key) => {
                                    return <option name = "option" value={pharmacieslist.json} >{pharmacieslist}  </option> 
                                })}
                </Form.Select>
                    
                <Photo pharmacieName={this.photoPharmacieName}  />
</div>
        )
    }
}
export default PharmacieList;