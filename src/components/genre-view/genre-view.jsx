import React from 'react';
import { Container, Button } from 'react-bootstrap';

export function GenreView ({genre, onBackClick}) {
    return (
        <Container>
            <h1>{genre.Name}</h1>
            <p></p>
            <h5>Description</h5>
            <p>{genre.Description}</p>
            <Button type="button" onClick={()=>{onBackClick();}}>Back</Button>
        </Container>
    )}