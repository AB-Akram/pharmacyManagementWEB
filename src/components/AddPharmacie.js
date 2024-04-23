import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

//import { withRouter } from 'react-router-dom';

const { Component, default: React} = require("react");
class AddPharmacie extends Component {
   
    constructor(props){
        super(props);
        this.state = {pharmacies: [], 
          show : false, 
          showEdit: false
      };
      var adresse = ""
     var etat = ""
     var laltitude = ""
     var longitude = ""
     var nom = ""
     var zone = ""
     var id =""        
    }

    componentDidMount() {
        fetch('/api/pharmacies')
            .then(response => response.json())
            .then(data => this.setState({pharmacies: data}) 
        );
            
    }
    
render() {

  const handleClose = () => this.setState({show: false}) 
  const handleShow = () => this.setState({show: true}) 

  const handleCloseEdit = () => this.setState({showEdit: false}) 

  const handleShowEdit = (e) => {
    this.setState({showEdit: true})
   this.state.pharmacies.map((pharmacie) =>
      pharmacie.id == (e.target.value) ? (this.id = pharmacie.id,
        this.adresse = pharmacie.adresse,
        this.etat = pharmacie.etat, 
        this.laltitude = pharmacie.laltitude,
        this.longitude = pharmacie.longitude,
        this.nom = pharmacie.nom,
        this.zone = pharmacie.zone.nom):null
    );
  
  }; 
       const handleSubmit = event =>{
          fetch('/api/pharmacies/add',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({title: 'React POST Requst'})
        }).then((response) => response.json())
        .then((data) => {console.log("the post of add pharmacie is "+data)})
       }

       const handleSubmitPut = event =>{ 
      /*
        const urlParams = new URLSearchParams(window.location.search);
        const adresseURL = urlParams.get('adresse');
        const etatURL = urlParams.get('etat');
        const laltitudeURL = urlParams.get('laltitude');
        const longitudeURL = urlParams.get('longitude');
        const nomURL = urlParams.get('nom');
        const zoneURL = urlParams.get('zone');

        alert(etatURL)
        */
        const data = {
          adresse: this.adresse,
          etat: this.etat,
          laltitude: this.laltitude,
          longitude: this.longitude,
          nom: this.nom,
          zone: this.zone
        };
        fetch(`/api/pharmacies/add/${this.id}?adresse=${data.adresse}&etat=${data.etat}&laltitude=${data.laltitude}&longitude=${data.longitude}&nom=${data.nom}&zone=${data.zone}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                   'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Headers': '*',
                    'X-Powered-By' : 'Express'
                  },
      })
     }

     const handleDelete = (e) =>{
      this.state.pharmacies.map((pharmacie) =>
      pharmacie.id == (e.target.value) ? (this.id = e.target.value):null
      );
      
      fetch(`/api/pharmacies/add/${this.id}`,{
        method: 'DELETE'

      })
      
      fetch('/api/pharmacies')
      .then(response => response.json())
      .then(data => this.setState({pharmacies: data}) 
  );
     }

return(
            <div>                            
 <Table striped bordered hover>
      <thead>
        <tr>
          <th>Adresse</th>
          <th>Etat</th>
          <th>Laltitude</th>
          <th>Longitude</th>
          <th>Nom</th>
          <th>Zone</th>
          <th><Button variant="outline-primary" onClick={handleShow}>Ajouter</Button></th>
        </tr>
      </thead>

      <tbody>
        {
           this.state.pharmacies.map(pharmacie=>{

           
        return (<tr key={pharmacie.id}>
          <td>{pharmacie.adresse}</td>
          <td>{pharmacie.etat}</td>
          <td> {pharmacie.laltitude}</td>
          <td> {pharmacie.longitude}</td>
          <td>{pharmacie.nom}</td>
          <td>{pharmacie.zone.nom}</td>
          <td><Button value={pharmacie.id} variant="outline-success" onClick={(e)=>{handleShowEdit(e)}}>Modifier</Button><Button value={pharmacie.id} variant="outline-danger" onClick={(e) =>{handleDelete(e)}}>Supprimer</Button></td>
        </tr>)
         })
    }
      </tbody>
    </Table>  

    <Modal
        show={this.state.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter pharmacie</Modal.Title>
        </Modal.Header>
        <Form  encType="multipart/form-data" method='POST' onSubmit={handleSubmit}>
        <Modal.Body>

            <Form.Group className="mb-3" >
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" placeholder="Enter Adresse"  name="adresse"/>
            </Form.Group>

            <Form.Group className="mb-3"  >
            <Form.Label>Etat</Form.Label>
            <Form.Control type="text" placeholder="Enter Etat"  name="etat"/>
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Laltitude</Form.Label>
            <Form.Control type="text" placeholder="Enter Laltitude"  name="laltitude"/>
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Longitude</Form.Label>
            <Form.Control type="text" placeholder="Enter Longitude"  name="longitude"/>
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" placeholder="Enter Nom"  name="nom"/>
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Zone</Form.Label>
            <Form.Control type="text" placeholder="Enter Zone"  name="zone"/>
            </Form.Group>

            <Form.Group className="mb-3"  >
            <Form.Label>Image</Form.Label>
            <Form.Control type="file"  name="file"/>
            </Form.Group>
             
        </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" type="submit">
                Submit
                </Button> 
            
            </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={this.state.showEdit}
        onHide={handleCloseEdit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier pharmacie</Modal.Title>
        </Modal.Header>
        <Form action={`/api/pharmacies/add/${this.id}`} method='PUT' onSubmit={(e)=>{handleSubmitPut(e)}}>
        <Modal.Body>

            <Form.Group className="mb-3" >
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" 
            defaultValue={this.adresse} 
            placeholder="Enter Adresse" 
            name="adresse"
            onChange={(e)=>{this.adresse = e.target.value}} />
            </Form.Group>

            <Form.Group className="mb-3"  >
            <Form.Label>Etat</Form.Label>
            <Form.Control type="text" 
            defaultValue={this.etat} 
            placeholder="Enter Etat"
            name="etat"
            onChange={(e)=>{this.etat = e.target.value}}
            />
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Laltitude</Form.Label>
            <Form.Control type="text" 
            defaultValue={this.laltitude}
            placeholder="Enter Laltitude" 
             name="laltitude"
             onChange={(e)=>{this.laltitude = e.target.value}}
             />
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Longitude</Form.Label>
            <Form.Control type="text" 
            defaultValue={this.longitude}
            placeholder="Enter Longitude" 
            name="longitude"
            onChange={(e)=>{this.longitude = e.target.value}}
            />
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" 
            defaultValue={this.nom} 
            placeholder="Enter Nom" 
            name="nom"
            onChange={(e)=>{this.nom = e.target.value}}
            />
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Zone</Form.Label>
            <Form.Control type="text" 
            defaultValue={this.zone} 
            placeholder="Enter Zone" 
            name="zone"
            onChange={(e)=>{this.zone = e.target.value}}
            />
            </Form.Group>  
              
        </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
                Close
            </Button>
            <Button variant="primary" type="submit">
                Submit
                </Button> 
            </Modal.Footer>
        </Form>
      </Modal>
            </div>                         
        )
        }
}
export default AddPharmacie;