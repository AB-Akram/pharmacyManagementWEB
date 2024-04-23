import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function AddVilles(){
    const [villes,setVilles]=useState([]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [nom, setNom] = useState('');
    const [id,setId] = useState('');
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => setShowEdit(false);

    const handleShowEdit = (e) => {
      setShowEdit(true)
      villes.map((ville) =>
      ville.id == (e.target.value) ? (setId(ville.id),
      setNom(ville.nom)
      ):null
    );
    };



    useEffect(()=>{
        axios.get("/api/villes")
        .then((response)=>{setVilles(response.data)})
    }, []);

    const handleSubmit = event =>{

     axios.post("/api/villes/add",{nom});

    axios.get("/api/villes")
        .then((response)=>{setVilles(response.data)})
     }

     const handleSubmitUpdate = event =>{

         villes.map((ville) =>
        ville.id == id ? axios.put(`/api/villes/add/${id}`,{nom}):null
        );
        
        axios.get("/api/villes")
        .then((response)=>{setVilles(response.data)})
      }

     const handleDelete = (e) =>{
        villes.map((ville) =>
        ville.id == (e.target.value) ? axios.delete(`/api/villes/add/${ville.id}`):null
        );
        
        axios.get("/api/villes")
        .then((response)=>{setVilles(response.data)})
     }


    return(
        <>
       <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nom</th>
          <th><Button variant="outline-primary" onClick={handleShow}>Ajouter</Button></th>
        </tr>
      </thead>

      <tbody>
        {
           villes.map(ville=>{
        return (<tr key={ville.id}>
          <td>{ville.nom}</td>
          <td><Button value={ville.id} variant="outline-success" onClick={(e)=>{handleShowEdit(e)}}>Modifier</Button><Button value={ville.id} variant="outline-danger" onClick={(e) =>{handleDelete(e)}} >Supprimer</Button></td>
        </tr>)
         })
    }
      </tbody>
    </Table>  

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Ville</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Modal.Body>

            <Form.Group className="mb-3" >
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text"
             placeholder="Enter Nom Ville" 
              value={nom}
              onChange={(e)=>{setNom(e.target.value)}}
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
          <Modal.Title>Modifier Ville</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitUpdate}>
        <Modal.Body>

            <Form.Group className="mb-3" >
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text"
             placeholder="Enter Nom Ville" 
              value={nom}
              onChange={(e)=>{setNom(e.target.value)}}
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