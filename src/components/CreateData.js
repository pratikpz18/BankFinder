import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import {createData} from '../apis/funct'

const CreateData = (props) => {

    const [name,setName]=useState('');
    const [ifsc,setIfsc]=useState('');
    const [office,setOffice]=useState('');
    const [address,setAddress]=useState('');
    const [district,setDistrict]=useState('');
    const [city,setCity]=useState('');
    const [state,setSTATE]=useState('');
    const [phone,setPhone]=useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(name,ifsc,office,address,district,city,state,phone);
        createData(name,ifsc,office,address,district,city,state,phone);
        evt.target.reset();
        props.history.push("/");
    }

    return(
        <div>
            <h2>Create Data</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Bank Name</label>
                    <input 
                    placeholder="enter Bank Name"
                    onChange={evt => setName(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>Ifsc Code</label>
                    <input 
                    placeholder="enter IFSC Code"
                    onChange={evt => setIfsc(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>Office</label>
                    <input 
                    placeholder="enter Office Area"
                    onChange={evt => setOffice(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>ADDRESS</label>
                    <input 
                    placeholder="enter Address"
                    onChange={evt => setAddress(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>District</label>
                    <input 
                    placeholder="enter District"
                    onChange={evt => setDistrict(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>City</label>
                    <input 
                    placeholder="enter City"
                    onChange={evt => setCity(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>State</label>
                    <input 
                    placeholder="enter State"
                    onChange={evt => setSTATE(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>Phone</label>
                    <input 
                    placeholder="enter your mobile number"
                    onChange={evt => setPhone(evt.target.value)}
                    ></input>
                    <br></br>
                    <button >Create Data</button>
                </form>
            </div>
            <Link to="/">Main Page</Link>
        </div>
    )
}

export default CreateData;