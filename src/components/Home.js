import React,{ useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { getStatistics,getBankName,getDataByBankName, } from "../apis/funct";
import { useAuth } from "../context/AuthContext"

const Home = (props) => {
    
    const [sd,SetSd] = useState([]);
    const [names,SetNames] = useState([]);
    const [name,SetName] = useState('');
    const [data,SetData] = useState([]);
    const { currentUser, logout } = useAuth()

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

    const handleLogout = async () =>  {    
        try {
          await logout()
          props.history.push("/")
        } catch {
          console.log("Failed to log out")
        }
    }

    const handleBankOption = (evt) => {
        // console.log(evt.target.value)
        SetName(evt.target.value)
    }

    // console.log(name)

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
            name: "name",
            selector: "name",
        },
        {
        name: "ifsc",
        selector: "ifsc",
        },
        {
            name: "brnc",
            selector: "brnc",
        },
        {
            name: "addr",
            selector: "addr",
            grow:1,
        },
        {
            name: "lodt",
            selector: "lodt",
        },
        {
            name: "loct",
            selector: "loct",
        },
        {
            name: "lost",
            selector: "lost",
        },
        {
            name: "mmid",
            selector: "mmid",
        },
        {
            name: "Operations",
            selector: "Operations",
            cell: row => (<div>
                            <button type="button" className="btn btn-light mx-2">
                                <Link to={`/editdata/${row.ifsc}`}>Edit Data</Link>
                            </button>
                        </div>),
        },
    ];

    return (
        <div>
        { currentUser ?
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
                    <button className="btn btn-danger logout-btn" onClick={ handleLogout }>Logout</button>
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
                            value={d.name} 
                            key={index}
                            >{d.name}</option>
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
            {/* { weat ? 
            <div>
                <h2>Weather</h2>
                <input 
                placeholder="enter city"
                onChange={(e) => SetCityName(e.target.value)}
                ></input>
                <button 
                className="btn btn-primary mx-2"
                onClick={handleWeatherData}>Show Data</button>
                <div className="my-4">
                    <p><strong>{wd.name}</strong> Temparature is <strong>{wd.main.temp}</strong> Celcius and <strong>{wd.weather[0].description}</strong> weather</p>
                </div>
            </div> : 
            <div></div>
            } */}

        </div>
        :
        <div> 
            <h2>You are Not Logged In</h2>
            <Link to="/">Login</Link>
        </div>
        }
        </div>
    )
}

export default Home;