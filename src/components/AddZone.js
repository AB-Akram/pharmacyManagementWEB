import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
export default function AddZone(){
    const [zones,setZones]=useState([]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [nom, setNom] = useState('');
    const [ville, setVille] = useState('');
    const [id, setId]= useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => setShowEdit(false);

    const handleShowEdit = (e) => {
      setShowEdit(true)
      zones.map((zone) =>
      zone.id == (e.target.value) ? (setId(zone.id),
      setNom(zone.nom),
      setVille(zone.ville.nom)
      ):null
    );
    };


    useEffect(()=>{
        axios.get("/api/zones")
        .then((response)=>{setZones(response.data)})
    }, []);

    const handleSubmit = event =>{

        axios.post("/api/zones/add",{
            'nom':nom
            ,'ville':{'nom':ville}
        });
   
       axios.get("/api/zones")
           .then((response)=>{setZones(response.data)})
        };

        const handleSubmitUpdate = event =>{

            zones.map((zone) =>
           zone.id == id ? axios.put(`/api/zones/add/${id}`,{
            'nom':nom
            ,'ville':{'nom':ville}
           }):null
           );
           
           axios.get("/api/zones")
           .then((response)=>{setZones(response.data)})
         }



        const handleDelete = (e) =>{
            zones.map((zone) =>
            zone.id == (e.target.value) ? axios.delete(`/api/zones/add/${zone.id}`):null
            );
            
            axios.get("/api/zones")
            .then((response)=>{setZones(response.data)})
         }

    return(
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Ville</th>
          <th><Button variant="outline-primary" onClick={handleShow}>Ajouter</Button></th>
        </tr>
      </thead>

      <tbody>
        {
           zones.map(zone=>{
        return (<tr key={zone.id}>
          <td>{zone.nom}</td>
          <td>{zone.ville.nom}</td>
          <td><Button value={zone.id} variant="outline-success" onClick={handleShowEdit}>Modifier</Button><Button value={zone.id} variant="outline-danger" onClick={(e) =>{handleDelete(e)}} >Supprimer</Button></td>
        </tr>)
         })
    }
      </tbody>
    </Table>  

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Zone</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Modal.Body>

            <Form.Group className="mb-3" >
            <Form.Label>Nom</Form.Label>
            <Form.Control 
            type="text"
             placeholder="Enter Nom Zone" 
              value={nom}
              onChange={(e)=>{setNom(e.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Ville</Form.Label>
            <Form.Control 
            type="text"
             placeholder="Enter Nom Ville" 
              value={ville}
              onChange={(e)=>{setVille(e.target.value)}}
              />
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

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Zone</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitUpdate}>
        <Modal.Body>

            <Form.Group className="mb-3" >
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text"
             placeholder="Enter Nom Zone" 
              value={nom}
              onChange={(e)=>{setNom(e.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text"
             placeholder="Enter Nom Ville" 
              value={ville}
              onChange={(e)=>{setVille(e.target.value)}}
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
    
    </>
    );
}