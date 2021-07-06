import React from "react";
import "./style.css";
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Container, Table } from 'react-bootstrap'

function MediaList(props) {
    console.log(props)
  return (
    <Container >
        <div className="top-margin">
            <h3>Media Available:</h3>
            <Table striped  hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Link</th>
                        <th>Audio</th>
                    </tr>
                </thead>
                <tbody>
                    {props.audio.map((item, index) => 
                        <tr key={item.name}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.path}</td>
                            <td>
                                <audio controls>
                                    <source src={item.src} type="audio/mpeg"></source>
                                </audio>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    </Container>
  );
}
export default MediaList;
