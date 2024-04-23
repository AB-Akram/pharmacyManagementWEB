import React, {Component} from 'react';
import ChangeZone from './ChangeZone';
import PharmacieList from './PharmacieList';


import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

class ZoneList extends Component {

    constructor(props){
        super(props);
        this.state = {zones: []};
        var nameZone;
        var nameVillesZ;
        var x;
    }

    componentDidMount() {
       
        
        if(this.nameVillesZ != undefined){
       fetch(`/api/villes/${this.nameVillesZ}/zones`)
            .then(response => response.json())
            .then(data => this.setState({zones: data}) );
        }
    }
    
   

    render(){


        this.nameVillesZ = this.props.nameville;

        const zonesList = this.state.zones.map(zones => {
                return <p> {zones.nom}</p>
        });

         const reFetch = () => {
             fetch(`/api/villes/${this.nameVillesZ}/zones`)
                 .then(response => response.json())
                 .then(data => this.setState({zones: data}) );
            return
        }
        


        return(
            <div style={{display:"flex",padding:"0px 0px 0px 10px"}}>
                <Form.Select size="sm" style={{width:"120px", height:"30px"}} onClick={(e)=>{this.nameZone= e.target.value; this.setState({nameZone:e.target.value}); this.x = 1; reFetch() }  }>
                <option name = "optionn">les Zones</option>
                                
                            {zonesList.map((zoneslist, key) => {
                                return <option name = "option" value={zoneslist.json} >{zoneslist}  </option> 
                            })}
    
                            </Form.Select>
                
                <ChangeZone nameville = {this.nameVillesZ} namezones = {this.nameZone} conteur = {this.x}/>
                   
                <PharmacieList namezones={this.nameZone} />
                                  
</div>
        )
    }
}
export default ZoneList;