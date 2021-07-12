import React,{ useState,useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { getDatabyIfsc,UpdateData } from "../apis/funct";


const EditData = (props) => {

    const { ifsccode } = useParams();
    // console.log(ifsccode);

    const [name,setName]=useState('');
    const [ifsc,setIfsc]=useState('');
    const [office,setOffice]=useState('');
    const [address,setAddress]=useState('');
    const [district,setDistrict]=useState('');
    const [city,setCity]=useState('');
    const [state,setSTATE]=useState('');
    const [phone,setPhone]=useState('');

    const [data,setData] = useState([]);

    useEffect(() => {
        getDatabyIfsc(ifsccode)
        .then(details => {
            setData(details);
            console.log(details)
            setName(details.BANK_NAME);
            setIfsc(details.IFSC);
            setOffice(details.OFFICE);
            setAddress(details.ADDRESS);
            setDistrict(details.DISTRICT);
            setCity(details.CITY);
            setSTATE(details.STATE);
            setPhone(details.PHONE);
        })
    },[])

    const handleUpdate = (evt) => {
        evt.preventDefault();
        console.log(name,ifsc,office,address,district,city,state,phone);
        UpdateData(name,ifsc,office,address,district,city,state,phone);
        props.history.push("/");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark  px-5">
                <a className="navbar-brand " href="#">Data Admin</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-8" id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                    <li className="nav-item pl-5">
                        <a className="nav-link" href="/home">Home</a>
                    </li>
                    <li className="nav-item pl-5">
                        <a className="nav-link" href="/ifsc">IFSC</a>
                    </li>
                    <li className="nav-item pl-5">
                        <a className="nav-link" href="/createdata">Create Data</a>
                    </li>
                    </ul>
                </div>
            </nav>
            <h2 className="my-2">Edit Data</h2>
            <div>
                <form className="my-4 ">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Bank Name</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter Bank Name"
                    defaultValue={data.NAME || ''}
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
                    defaultValue={data.IFSC || ''}
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
                    defaultValue={data.BRNC || ''}
                    onChange={evt => setOffice(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">ADDRESS</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    className="form-control"
                    placeholder="enter Address"
                    defaultValue={data.ADDR || ''}
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
                    defaultValue={data.LODT || ''}
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
                    defaultValue={data.LOCT || ''}
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
                    defaultValue={data.LOST || ''}
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
                    defaultValue={data.MMID || ''}
                    onChange={evt => setPhone(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-2 col-md-2 create-btn">
                    <button type="button" className="btn btn-primary my-4 px-4" onClick={handleUpdate}>Update Data</button>
                </div>
                </form>
            </div>
            <div>
                <Link to="/home">Main Page</Link>
            </div>
        </div>
    )
}

export default EditData