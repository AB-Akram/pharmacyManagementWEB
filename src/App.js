import './App.css';
import { Component } from 'react';
import { Route,  Routes } from 'react-router-dom';
import VilleList from './components/VilleList';
import AddPharmacie from './components/AddPharmacie';
import Image from './components/Photo';


import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AddVilles from './components/AddVilles';
import AddZone from './components/AddZone';
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  render(){
  return (
    <div>
<Navbar  expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">PHARMACIE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/api/zone/add">Zone</Nav.Link>
            <NavDropdown title="Ville" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/api/villes/add">
                AddVilles
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="/api/villes/">zones/pharmacies</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/api/pharmacies/add">Pharmacie</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <div>
      <Routes>
      <Route path={'/'} element={<Home/>}/>
        <Route path={'/api/villes'} element={<VilleList/>}/>
        <Route path={'/api/villes/add'} element={<AddVilles/>}/>
        <Route path={'/api/villes/:nom/zones'} element={<VilleList/>}/>
        <Route path={'/api/villes/:nom/zones/:nom/pharmacies'} element={<VilleList/>}/>
        <Route path={'/api/pharmacies/add'} element={<AddPharmacie/>}/>
        <Route path={'/api/pharmacies/add/:id'} element={<AddPharmacie/>}/>
        <Route path={'/api/zone/add'} element={<AddZone/>}/>
        <Route path={'/photo'} element={<Image/>}/>
        <Route path={'/login'} element={<Login/>}/>

    </Routes>
    </div>

    </div>
    
  );
}
}
export default App;