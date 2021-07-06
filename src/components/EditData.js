import React,{ useState,useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { getDatabyIfsc } from "../apis/funct";


const EditData = (props) => {

    const { ifsccode } = useParams();
    // console.log(ifsccode.slice(1));

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
        getDatabyIfsc(ifsccode.slice(1))
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
        // updateUserbyName(data.name,updatename,mobile,email,active);
        props.history.push("/");
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <div>
                <form>
                    <label>Bank Name</label>
                    <input 
                    placeholder="enter Bank Name"
                    defaultValue={data.BANK_NAME || ''}
                    onChange={evt => setName(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>Ifsc Code</label>
                    <input 
                    placeholder="enter IFSC Code"
                    defaultValue={data.IFSC || ''}
                    onChange={evt => setIfsc(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>Office</label>
                    <input 
                    placeholder="enter Office Area"
                    defaultValue={data.OFFICE || ''}
                    onChange={evt => setOffice(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>ADDRESS</label>
                    <input 
                    placeholder="enter Address"
                    defaultValue={data.ADDRESS || ''}
                    onChange={evt => setAddress(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>District</label>
                    <input 
                    placeholder="enter District"
                    defaultValue={data.DISTRICT || ''}
                    onChange={evt => setDistrict(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>City</label>
                    <input 
                    placeholder="enter City"
                    defaultValue={data.CITY || ''}
                    onChange={evt => setCity(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>State</label>
                    <input 
                    placeholder="enter State"
                    defaultValue={data.STATE || ''}
                    onChange={evt => setSTATE(evt.target.value)}
                    ></input>
                    <br></br>
                    <label>Phone</label>
                    <input 
                    placeholder="enter your mobile number"
                    defaultValue={data.PHONE || ''}
                    onChange={evt => setPhone(evt.target.value)}
                    ></input>
                    <br></br>
                    <button onClick={handleUpdate}>Update Data</button>
                </form>
            </div>
            <div>
                <Link to="/">Main Page</Link>
            </div>
        </div>
    )
}

export default EditData