import React, { Component } from "react";
import {Form, Container, Button} from "react-bootstrap"
import axios from "axios";
import download from "js-file-download"
import MediaList from "../MediaList";
import { Media } from "@vonage/server-sdk";

class TokenForm extends Component {
    constructor (props){
        super(props)
        this.state = {
            url:"",
            token:"",
            appID:"",
            privateKey:"",
            name:"",
            audio:[]

        }
        this.handleUrlInput = this.handleUrlInput.bind(this)
        this.handleTokenInput = this.handleTokenInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAppIDInput = this.handleAppIDInput.bind(this)
        this.handlePrivateKeyInput = this.handlePrivateKeyInput.bind(this)
        this.downloadMedia = this.downloadMedia.bind(this)

    }
    componentDidMount() {
        this.downloadMedia("all",[])
    
    }

    handleAppIDInput = (event) => {
        this.setState({appID:event.target.value}, this.generateToken)
    }
    handlePrivateKeyInput = (event) => {
        this.setState({privateKey:event.target.value}, this.generateToken)
    }
    handleUrlInput = (event) =>{
        console.log(event.target.value)
        this.setState({url:event.target.value})
    }

    handleTokenInput = (event) => {
        let token = event.target.value
        console.log(token)
        this.setState({token:event.target.value})
    }

    handleNameInput = (event) => {
        this.setState({name:event.target.value})
    }

    generateToken = (event) => {
        if (this.state.appID.length>=36 && this.state.privateKey.length>=5){
            let parameters = {
            appID:this.state.appID,
            privateKey:this.state.privateKey
        }

        return axios
        .post("/api/token", parameters)
        .then(res =>{
            this.setState({token:res.data})
        })
        }

    }

    handleSubmit = () => {
        let search = {
            token:this.state.token,
            url:this.state.url,
            name:this.state.name
        }

        return axios
        .post("/api/retrieve", search)
        .then(res =>{
            // 1. Make a shallow copy of the Audios
            let items = [...this.state.audio];
            // 2. Create the new audio object to be pushed
            let audio = {
                name:res.data.name,
                src:`http://localhost:3001/${res.data.name}.mp3`,
                path:this.state.url
            };
            // 4. Push it into our array.
            items.push(audio);
            // 5. Set the state to our new copy
            return this.setState({audio:items})
         

        })

    }

    downloadMedia = (mediaName, path) => {
        console.log(mediaName)
        return axios
        .get("api/retrieve/file", {params:{
            name:mediaName.name
            }
        })
        .then(resp =>{
            console.log(resp)
            let audios = []

            resp.data.forEach((element, index) => {
                audios.push({
                    name:element,
                    src:`http://localhost:3001/${element}`,
                    path:path[index]
                })

            });

            this.setState({audio:audios})
        })

    }

    render () {
        return (
            <Container>
                <Form>
                <Form.Group className="mb-3" controlId="urlControlInput">
                        <Form.Label>Application ID</Form.Label>
                        <Form.Control type="text" placeholder="Optional" onChange={this.handleAppIDInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tokenControlTextarea1">
                        <Form.Label>Private Key</Form.Label>
                        <Form.Control as="textarea" placeholder="Optional" rows={3} onChange={this.handlePrivateKeyInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tokenControlTextarea1">
                        <Form.Label>Token</Form.Label>
                        <Form.Control as="textarea" value = {this.state.token}rows={3} onChange={this.handleTokenInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="urlControlInput">
                        <Form.Label>URL</Form.Label>
                        <Form.Control type="text" placeholder="https://recordingURL" onChange={this.handleUrlInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="urlControlInput">
                        <Form.Label>Name for the File</Form.Label>
                        <Form.Control type="text" placeholder="e.g. CountryCode-TicketNumber-Date" onChange={this.handleNameInput}/>
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>

                <MediaList audio = {this.state.audio} />
            </Container>
        )
    }
}

export default TokenForm;