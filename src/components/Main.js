import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import { uploadDetails,getData,getAllDetails, deleteData,deleteAllData,getAllStatesbyBankName,getAllCitiesbyStateName,getBankDetailsByValue,uploadData } from "../apis/funct";

const Main = () => {

    const [items, setItems] = useState([]);
    const [data,SetData] = useState([]);
    const [result,SetResult] = useState([]);
    const [sn,SetSn] = useState([])
    const [cn,SetCn] = useState([])
    const [bankname,SetBankName] = useState('')
    const [statename,SetStateName] = useState('')
    const [cityname,SetCityName] = useState('')
    const [flag, setFlag] = useState(0);

    const getalldata = async () => {
        try {
            const arr = await getAllDetails();
            // console.log(arr);
            SetData(arr);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getalldata();
    }, [])
    
    const readExcel = async (file) => {
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
    
          fileReader.onload = (e) => {
            const bufferArray = e.target.result;
    
            const wb = XLSX.read(bufferArray, { type: "buffer" });
    
            const wsname = wb.SheetNames[0];
    
            const ws = wb.Sheets[wsname];
    
            const data = XLSX.utils.sheet_to_json(ws);
    
            resolve(data);
            console.log(data,flag)
            uploadDetails(data,flag)
            console.log(bn)
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    
        await promise.then((d) => {
          setItems(d);
          // console.log(d);
        });
    }

    const handleDelete = (ifsc)=>{
        console.log(ifsc.toString());
        deleteData(ifsc);
        window.location.reload();
    }

    const handleDeleteAllData = async () => {
        await deleteAllData();
    }

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
                            <button type="button" 
                                className="btn btn-danger" 
                                onClick={() => {handleDelete(row.IFSC)}}
                                >Delete</button>
                        </div>),
        },
    ];

    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    const bn = getUniqueListBy(data,'NAME');
    console.log(bn)
    // const sn = getUniqueListBy(data,'STATE');
    // const cn = getUniqueListBy(data,'CITY');

    let s=[];
    const handleBankOption = (evt) => {
        // console.log(evt.target.value)
        SetBankName(evt.target.value)
        getAllStatesbyBankName(evt.target.value)
        .then(res => res.map(d => {
                // console.log(d.STATE)
                s.push(d.LOST)
                SetSn([... new Set(s)])
            }
            ))
        .catch( err => console.log(err))
        // console.log(getUniqueListBy(sn,'STATE'))
    }

    let c=[];
    const handleStateOption = (evt) => {
        // console.log(bankname,evt.target.value)
        SetStateName(evt.target.value)
        getAllCitiesbyStateName(bankname,evt.target.value)
        .then(res => res.map(d => {
                c.push(d.LOCT)
                SetCn([... new Set(c)])
            }
            ))
        .catch( err => console.log(err))
    }

    const handleCityOption = (evt) => {
        // console.log(bankname,statename,evt.target.value)
        SetCityName(evt.target.value)
    }

    const filterList = () => {
        getBankDetailsByValue(bankname,statename,cityname)
        .then(res => {
            console.log(res)
            SetResult(res)
        })
        .catch( err => console.log(err))
    }

    const handleFlag = (evt) => {
        // console.log(evt.target.value)
        setFlag(evt.target.value)
    }

    // console.log(result)

    return (
        <div>
        { data.length > 0 ? 
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
                        <a className="nav-link active" href="/ifsc">IFSC</a>
                    </li>
                    <li className="nav-item pl-5">
                        <a className="nav-link" href="/createdata">Create Data</a>
                    </li>
                    </ul>
                    <button className="btn btn-danger delete-btn" onClick={ handleDeleteAllData }>Delete All Data</button>
                </div>
            </nav>
            <div className="col-sm-6 col-md-8 mx-auto my-4">
                <h2 className="text-muted mb-4">Upload IFSC Excel File</h2>
                <div className="col-md-8 mx-auto input-div " >
                <input 
                    className="col-md-4 form-control file-input mx-4" 
                    type="file"
                    onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                    }}
                ></input>
                <select className="mx-4 form-select select" onChange={handleFlag}>
                    <option>select one</option>
                    <option value="0">Bank Details</option>
                    <option value="1">Bank Data</option>
                </select>
                </div>
            </div>
            <div>
                <div className="col-sm-6 col-md-10 mx-auto ">
                    <label className="label">Bank Name</label>
                    <select className="select-option" onChange={handleBankOption}>
                        <option >Choose Bank Name</option>
                        {bn.map((d,index) => (
                            <option 
                            value={d.NAME} 
                            key={index}
                            >{d.NAME}</option>
                        ))
                        }
                    </select>
                    <label className="label">State</label>
                    <select className="select-option" onChange={handleStateOption}>
                        <option>Choose state</option>
                        {sn.map((d,index) => (
                            <option value={d} key={index}>{d}</option>
                        ))
                        }
                    </select>
                    <label className="label">City</label>
                    <select className="select-option" onChange={handleCityOption}>
                        <option>Choose City</option>
                        {cn.map((d,index) => (
                            <option value={d} key={index}>{d}</option>
                        ))
                        }
                    </select>
                    <button type="button" className="btn btn-primary mx-3 mb-1 px-3 " onClick={filterList}>Search</button>
            </div>
            { result.length == 0 ? 
                <div className="my-4">
                    <h2 className="text-muted">Use the Search Filter for Retrieving Data</h2>
                </div> 
            : 
            <DataTable
                title="BANK DETAILS"
                data={result} 
                columns={columns} 
                pagination
                // paginationServer
                // paginationTotalRows={result.length}
                // paginationPerPage={3}
                // paginationComponentOptions={{
                //     noRowsPerPage: true
                // }}
                // onChangePage={page => setPage(page)}
                selectableRows
                ></DataTable>
            }
            {/* {result.length>0 ? 
                <DataTable
                title="BANK DETAILS"
                data={result} 
                columns={columns} 
                pagination
                selectableRows
                ></DataTable>
                :
                <DataTable
                title="BANK DETAILS"
                data={data}
                columns={columns}
                pagination
                selectableRows
                ></DataTable>
            } */}
        </div>
        </div> 
            : <div className="loading">
                <div >
                    <h2 className="text-success">Loading .... </h2>
                    <div className="my-4">
                        <Link to="/createdata">Create Data</Link>
                    </div>
                </div>
               </div>
        }
        </div>
    )
}

export default Main;