import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableData from './TableData';
import TableHead from './TableHead';
import './Body.css';

function Body() {
  const[tableData, setTableData] = useState();
  const[tableName, setTableName] = useState();
  var keys = (Object.keys(tableData ? tableData[0] : []));

  async function data(){
    const a = await axios.get('http://localhost:5000/showdata');
    await a.data.json;
    // console.log(a.data);
    setTableData(await a.data);
    // console.log(tableData);
  }

//   function tableHead(){
//     tableData[0].map((x)=>{
    
//  })
//  }

async function fees(comand, tabl){
  const a = await axios.get(`http://localhost:5000/xyz/${comand}`);
    await a.data.json;
    // console.log(a.data);
    setTableData(await a.data);
    // administrator,fee_details,fee_receipt,query,student,total_fee,total_fee_paid
    console.log(a);
    setTableName(tabl);
}

async function ascending(a){
  const order = 'ASC';
  const order_by = a;
  const last_query = `select * from ${tableName}`;
  const response_A = await axios.post(`http://localhost:5000/sort`, {order, order_by, last_query});
  // console.log(response_A);
  await response_A.data.json;
  
  setTableData(await response_A.data);
}

async function descending(a){
  const order = 'DESC';
  const order_by = a;
  const last_query = `select * from ${tableName}`;
  const response_A = await axios.post(`http://localhost:5000/sort`, {order, order_by, last_query});
  // console.log(response_A);
  await response_A.data.json;
  
  setTableData(await response_A.data);
}

 useEffect(() => {
   data();
   console.log(tableData);
 }, [])

  return (
    <div className='bodypart'>
      <div className="buttons">
        <button className='button b_1' onClick={() => fees('select * from administrator', 'administrator')}>
          <div className='p_wh'>
            Administrator
            <div className="white"></div>
            <div className="white_1"></div>
          </div>
        </button>
        <button className='button b_2' onClick={() => fees('select * from fee_details', 'fee_details')}>
          <div className='p_wh'>
            Fee Details
            <div className="white"></div>
            <div className="white_1"></div>
          </div>
        </button>
        <button className='button b_1' onClick={() => fees('select * from fee_receipt', 'fee_receipt')}>
          <div className='p_wh'>
            Fee Receipt
            <div className="white"></div>
            <div className="white_1"></div>
          </div>
        </button>
        <button className='button b_2' onClick={() => fees('select * from query', 'query')}>
          <div className='p_wh'>
            Exam
            <div className="white"></div>
            <div className="white_1"></div>
          </div>
        </button>
        <button className='button b_1' onClick={() => fees('select * from student', 'student')}>
          <div className='p_wh'>
            Student
            <div className="white"></div>
            <div className="white_1"></div>
          </div>
        </button>
        <button className='button b_2' onClick={() => fees('select * from total_fee', 'total_fee')}><div className='p_wh'>
            Total Fee
            <div className="white"></div>
            <div className="white_1"></div>
          </div>
        </button>
        <button className='button b_1' onClick={() => fees('select * from total_fee_paid', 'total_fee_paid')}>
          <div className='p_wh'>
            Total Fee Paid
            <div className="white"></div>
            <div className="white_1"></div>
          </div>
        </button>
      </div>
      {/* <div className="sort">
        <button className='sort_btn' onClick={() => ascending()}><i class="fas fa-sort-up"></i></button>
        <button className='sort_btn' onClick={() => descending()}><i class="fas fa-sort-down"></i></button>
      </div> */}
      <div className='parent_table'>
        <h1 className='table_name'>{tableName}</h1>
        <div style={{overflowX: "auto"}}>
          <table style={{width: "90vw"}}>
            <tr>
              {keys.map((y)=><th style={{width: "100vw", border: "1px solid #B8390E", textTransform: "uppercase", backgroundColor: "#FFB067",textAlign: "center", margin: "0px auto", padding: "10px"}}>
              <div className='tb_hd' style={{display: "flex"}}>
                {y}
                <div className="sort">
                  <button className='sort_btn btn_1' onClick={() => ascending(y)}><i class="fas fa-long-arrow-alt-up"></i></button>
                  <button className='sort_btn btn_2' onClick={() => descending(y)}><i class="fas fa-long-arrow-alt-down"></i></button>
                </div>
              </div>
              </th>)}
            </tr>
              {
                tableData ?
                <TableData tableData={tableData} />
                :
                console.log("NULL")
              }
          </table>
        </div>
      </div>
      <div style={{display: tableName ? "block" : "none"}}>
      <p style={{textAlign: "center", marginTop: "20px"}}>Click to insert data into {tableName}</p>
      <div className="add">
        <div className='add_btn'>+</div>
      </div>
      </div>
    </div>
  );
}

export default Body;
