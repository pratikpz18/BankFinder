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
            <nav className="navbar navbar-expand-lg navbar-dark  px-5">
                <a className="navbar-brand" href="/">Data Admin</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                    <li className="nav-item  pl-5">
                        <a className="nav-link" href="/home">Home</a>
                    </li>
                    <li className="nav-item pl-5">
                        <a className="nav-link" href="/ifsc">IFSC</a>
                    </li>
                    <li className="nav-item pl-5">
                        <a className="nav-link active " href="/createdata">Create Data</a>
                    </li>
                    </ul>
                </div>
            </nav>
            <div>
                <form onSubmit={handleSubmit} className="my-4 ">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Bank Name</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter Bank Name"
                    onChange={evt => setName(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Ifsc Code</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter IFSC Code"
                    onChange={evt => setIfsc(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Office</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter Office Area"
                    onChange={evt => setOffice(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter Address"
                    onChange={evt => setAddress(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">District</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter District"
                    onChange={evt => setDistrict(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">City</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter City"
                    onChange={evt => setCity(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">State</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter State"
                    onChange={evt => setSTATE(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter your mobile number"
                    onChange={evt => setPhone(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-2 col-md-2 create-btn">
                    <button type="button" className="btn btn-primary my-4 px-4">Create Data</button>
                </div>
                </form>
            </div>
            {/* <form onSubmit={handleSubmit} className="my-4 align-items-center">
                    <div className="form-group row col-md-3 mx-auto">
                    <div className="col-auto">
                    <label className="col-form-label">BANK NAME</label>
                    </div>
                    <div className="col-auto">
                    <input 
                    className=" form-control"
                    placeholder="enter Bank Name"
                    onChange={evt => setName(evt.target.value)}
                    ></input>
                    </div>
                    </div>
                    <div className="form-group row col-md-3 mx-auto">
                    <div className="col-auto">
                    <label className="col-form-label">IFSC CODE</label>
                    </div>
                    <div className="col-auto mx-3">
                    <input 
                    className=" form-control"
                    placeholder="enter IFSC Code"
                    onChange={evt => setIfsc(evt.target.value)}
                    ></input>
                    </div>
                    </div> 
                    <div className="form-group row col-md-3 mx-auto">
                    <div className="col-auto">
                    <label className="col-form-label">OFFICE AREA</label>
                    </div>
                    <div className="col-auto ">
                    <input 
                    className=" form-control"
                    placeholder="enter Office Area"
                    onChange={evt => setOffice(evt.target.value)}
                    ></input>
                    </div>
                    </div>
                    <div className="form-group row col-md-3 mx-auto">
                    <div className="col-auto">
                    <label className="col-form-label">ADDRESS</label>
                    </div>
                    <div className="col-auto mx-4">
                    <input 
                    className="form-control"
                    placeholder="enter Address"
                    onChange={evt => setAddress(evt.target.value)}
                    ></input>
                    </div>
                    </div>
                    <div className="form-group row col-md-3 mx-auto">
                    <div className="col-auto">
                    <label className="col-form-label">DISTRICT </label>
                    </div>
                    <div className="col-auto mx-4">
                    <input 
                    className="form-control"
                    placeholder="enter District"
                    onChange={evt => setDistrict(evt.target.value)}
                    ></input>
                    </div>
                    </div>
                    <div className="form-group row col-md-3 mx-auto">
                    <div className="col-auto">
                    <label className="col-form-label">CITY </label>
                    </div>
                    <div className="col-auto mx-5">
                    <input 
                    className="form-control"
                    placeholder="enter City"
                    onChange={evt => setCity(evt.target.value)}
                    ></input>
                    </div>
                    </div>
                    <div className="form-group row col-md-3 mx-auto">
                    <div className="col-auto mr-5">
                    <label className="col-form-label">STATE </label>
                    </div>
                    <div className="col-auto mx-4">
                    <input 
                    className="form-control"
                    placeholder="enter State"
                    onChange={evt => setSTATE(evt.target.value)}
                    ></input>
                    </div>
                    </div>
                    <div className="form-group row col-md-3 mx-auto">
                    <div className="col-auto">
                    <label className="col-form-label">PHONE</label>
                    </div>
                    <div className="col-auto mx-4">
                    <input 
                    className="form-control"
                    placeholder="enter your mobile number"
                    onChange={evt => setPhone(evt.target.value)}
                    ></input>
                    </div>
                    </div>
                    <button className="btn btn-primary">Create Data</button>
                </form> */}
        </div>
    )
}

export default CreateData;