import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
export default function Login(){

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    const handleSubmit = event =>{
        axios.post("/login",{
            username:username,
            nom:"",
            prenom:"",
            password:password
        })
     }

    return(
        <>
        <diV style={{display:"flex",padding:"0px 0px 0px 10px",justifyContent:"center",marginTop:"15%"}} >
        <Form action='/' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Username</Form.Label>
          <Form.Control 
          size="sm" 
          style={{width:"150px", height:"30px"}} 
           id="disabledTextInput" 
           value={username} 
           onChange={(e)=>{setUsername(e.target.value)}}
           placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">password</Form.Label>
          <Form.Control 
          id="disabledTextInput"
           size="sm"
            style={{width:"150px", height:"30px"}} 
            value={password} 
            onChange={(e)=>{setPassword(e.target.value)}}
             placeholder="password" 
             />
        </Form.Group>
        <Button type="submit">Se connecter</Button>
    </Form>
    </diV>
        </>
    );

}