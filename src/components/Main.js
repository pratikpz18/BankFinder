import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import { uploadDetails,getData,getAllDetails, deleteData,deleteAllData,getAllStatesbyBankName,getAllCitiesbyStateName,getBankDetailsByValue } from "../apis/funct";

const Main = () => {

    const [items, setItems] = useState([]);
    const [data,SetData] = useState([]);
    const [result,SetResult] = useState([]);
    const [sn,SetSn] = useState([])
    const [cn,SetCn] = useState([])
    const [bankname,SetBankName] = useState('')
    const [statename,SetStateName] = useState('')
    const [cityname,SetCityName] = useState('')

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
            console.log(data)
            uploadDetails(data)
      
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
          name: "BANK_NAME",
          selector: "BANK_NAME",
        },
        {
          name: "IFSC",
          selector: "IFSC",
        },
        {
            name: "OFFICE",
            selector: "OFFICE",
        },
        {
            name: "ADDRESS",
            selector: "ADDRESS",
            grow:1,
        },
        {
            name: "DISTRICT",
            selector: "DISTRICT",
        },
        {
            name: "CITY",
            selector: "CITY",
        },
        {
            name: "STATE",
            selector: "STATE",
        },
        {
            name: "PHONE",
            selector: "PHONE",
        },
        {
            name: "Operations",
            selector: "Operations",
            cell: row => (<div>
                            <button><Link to={`/editdata/:${row.IFSC}`}>Edit Data</Link></button> &nbsp; 
                            <button onClick={() => {
                                handleDelete(row.IFSC)}}>Delete</button>
                        </div>),
        },
    ];

    // const filterListonState = (event) => {
    //     let value = event.target.value;
    //     console.log(data)
    //     let res=[];
    //     res = data.filter((d)=>{
    //         return d.STATE.toUpperCase().search(value.toUpperCase()) != -1;
    //     });
    //     console.log(res)
    //     SetResult(res)
    // }

    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    const bn = getUniqueListBy(data,'BANK_NAME');
    // const sn = getUniqueListBy(data,'STATE');
    // const cn = getUniqueListBy(data,'CITY');
    
    // console.log(data.find(cntry => cntry.BANK_NAME === 'IDFC First Bank Ltd').STATE)

    let s=[];
    const handleBankOption = (evt) => {
        console.log(evt.target.value)
        SetBankName(evt.target.value)
        getAllStatesbyBankName(evt.target.value)
        .then(res => res.map(d => {
                // console.log(d.STATE)
                s.push(d.STATE)
                SetSn([... new Set(s)])
            }
            ))
        .catch( err => console.log(err))
        // console.log(getUniqueListBy(sn,'STATE'))
    }

    console.log(bankname)
    let c=[];
    const handleStateOption = (evt) => {
        // console.log(bankname,evt.target.value)
        SetStateName(evt.target.value)
        getAllCitiesbyStateName(bankname,evt.target.value)
        .then(res => res.map(d => {
                c.push(d.CITY2)
                SetCn([... new Set(c)])
            }
            ))
        .catch( err => console.log(err))
    }

    console.log(cn)

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

    console.log(result)

    return (
        <div>
            <div>
                <input 
                    type="file"
                    onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                    }}
                ></input>
            </div>
            <br></br>
            <div>
                <button><Link to="/createdata">Create Data</Link></button> &nbsp;
                <button onClick={ handleDeleteAllData }>Delete All Data</button>
            </div>
            <br></br>
            <div>
                <label>Bank Name</label>
                <select onChange={handleBankOption}>
                    <option >Choose Bank Name</option>
                    {bn.map((d,index) => (
                        <option 
                        value={d.BANK_NAME} 
                        key={index}
                        >{d.BANK_NAME}</option>
                    ))
                    }
                </select> &nbsp;
                <label>State</label>
                <select defaultValue=" " onChange={handleStateOption}>
                    <option>Choose state</option>
                    {sn.map((d,index) => (
                        <option value={d} key={index}>{d}</option>
                    ))
                    }
                </select> &nbsp;
                <label>City</label>
                <select defaultValue=" " onChange={handleCityOption}>
                    <option>Choose City</option>
                    {cn.map((d,index) => (
                        <option value={d} key={index}>{d}</option>
                    ))
                    }
                </select> &nbsp;
                <button onClick={filterList}>Search</button>
            </div>
            { result.length == 0 ? 
                <div>
                    <h2>Use the Search Filter for Retrieving Data</h2>
                </div> 
            : 
            <DataTable
                title="BANK DETAILS"
                data={result} 
                columns={columns} 
                pagination
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
    )
}

export default Main;