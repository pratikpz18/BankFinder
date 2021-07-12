import React,{ useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { getStatistics,getBankName,getDataByBankName } from "../apis/funct";

const Home = () => {
    
    const [sd,SetSd] = useState([]);
    const [names,SetNames] = useState([]);
    const [name,SetName] = useState('');
    const [data,SetData] = useState([]);

    const getstats = async () => {
        await getStatistics()
        .then(res => 
            SetSd(res)
        )
        .catch( err => console.log(err))
        await getBankName()
        .then(res => 
            SetNames(res)
        )
        .catch( err => console.log(err))
    }


    const handleBankOption = (evt) => {
        // console.log(evt.target.value)
        SetName(evt.target.value)
    }

    console.log(name)

    const ViewData = async () => {
        try{
            const arr = await getDataByBankName(name);
            SetData(arr);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getstats()
    },[])

    const columns = [
        {
          name: "NAME",
          selector: "NAME",
        },
        {
          name: "IFSC",
          selector: "IFSC",
        },
        {
            name: "BRNC",
            selector: "BRNC",
        },
        {
            name: "ADDR",
            selector: "ADDR",
            grow:1,
        },
        {
            name: "LODT",
            selector: "LODT",
        },
        {
            name: "LOCT",
            selector: "LOCT",
        },
        {
            name: "LOST",
            selector: "LOST",
        },
        {
            name: "MMID",
            selector: "MMID",
        },
        {
            name: "Operations",
            selector: "Operations",
            cell: row => (<div>
                            <button type="button" className="btn btn-light mx-2">
                                <Link to={`/editdata/${row.IFSC}`}>Edit Data</Link>
                            </button>
                        </div>),
        },
    ];

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
                        <a className="nav-link active" href="/home">Home</a>
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
            { sd.length >0 ?
            <div>
                <h3 className="my-4">Statistics</h3>
                <div className="my-2">
                    {/* <p>All Bank Names:</p> */}
                    <p>Total Number of Banks : <strong>{sd[1]}</strong></p>
                    <p>Total Number of Records : <strong>{sd[0]}</strong></p>
                </div>
                <div className="my-2">
                    <label className="label mx-2">Select Bank Name</label>
                    <select className="select-option" onChange={handleBankOption}>
                        <option >Choose Bank Name</option>
                        {names.map((d,index) => (
                            <option 
                            value={d.NAME} 
                            key={index}
                            >{d.NAME}</option>
                        ))
                        }
                    </select>
                    {names.length > 0 ? 
                        <button 
                        type='button' 
                        className="btn btn-success mx-3 mb-2 px-4"
                        onClick={ViewData}>View</button> :
                         <div></div>
                    }
                </div>
                { data.length > 0 ?
                    <DataTable
                    title={name}
                    data={data} 
                    columns={columns} 
                    pagination
                    selectableRows
                    ></DataTable> :
                    <div></div>
                }
            </div> 
            : 
            <div className=" d-flex justify-content-center align-items-center vh-100">
                <h2 className="text-success">Loading .... </h2>
            </div>
            }
        </div>
    )
}

export default Home;