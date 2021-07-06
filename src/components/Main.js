import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import { uploadDetails,getData,getAllDetails, deleteData } from "../apis/funct";

const Main = () => {

    const [items, setItems] = useState([]);
    const [data,SetData] = useState([]);

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
        getAllDetails();
        getalldata();
    }, [])
    

    const readExcel = (file) => {
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
    
        promise.then((d) => {
          setItems(d);
          // console.log(d);
          window.location.reload();
        });
        
    }

    const handleDelete = (ifsc)=>{
        console.log(ifsc.toString());
        deleteData(ifsc);
        window.location.reload();
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
            <div>
                <button><Link to="/createdata">Create Data</Link></button>
            </div>
            <DataTable
            title="BANK DETAILS"
            data={data}
            columns={columns}
            pagination
            selectableRows
            ></DataTable>
        </div>
    )
}

export default Main;