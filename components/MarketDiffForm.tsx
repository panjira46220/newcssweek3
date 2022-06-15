import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

const MarketDiffForm = () => {
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
  const [allData,setAllData] =useState([{token1:"BTC",token2:"USDT",priceFTX:0,priceBinance:0,diff:0}])
  const [display,setDisplay] = useState(0);
  const getApi = async (e:React.FormEvent) => { 
    e.preventDefault()
    const newUrl2 =`https://api1.binance.com/api/v3/avgPrice?symbol=${token1}${token2}` ;
    const res2 = await  fetch(newUrl2);
    const link1 = await res2.json();
    const priceBinance: number = link1.price;

    const link2 = await axios.get('/api/ftx',{
      params: {token1,token2}
    })
    const priceFTX: number = link2.data.result.price;
    const diff = ((Math.abs(priceFTX-priceBinance)/priceFTX)*100);
    const sumData =  {token1,token2,priceFTX,priceBinance,diff}
    //setAllData([{coinname1:token1,coinname2:token2,binance:data}]);
    let i: number = 0;
    allData.forEach((item :any,id:number) => {
      if(item.token1 == token1){
        allData.splice(id,1,sumData)
        i++
      }
      
    })
    if(i==0){
      allData.push(sumData);
    }
    
     // console.log(allData);



      //allData.splice(id,1,sumData)
     // allData.push(sumData)
    //await allData.push(sumData);
    allData.sort((a,b) => (a.token1 > b.token1)? 1:-1 ) 
    setDisplay(display+1);
    //console.log(allData);

    
  }  
    
  const delData = (id:number) => {
      allData.splice(id,1);
      allData.sort((a,b) => (a.token1 > b.token1)? 1:-1 ) 
      setDisplay(display+1);
        
    
  }
  return (
    <div className="w-full bg-lightbg justify-center flex flex-col cursor-default  p-5 ">
      <div className="container rounded-lg shadow-lg w-full relative bg-white  lg:p-12  sm:mx-auto p-6   ">
      <form>
        <h3 className="lg:text-4xl sm:text-2xl font-bold text-center mb-7 ">Market Diff</h3>
        <div className="flex   lg:flex-row sm:flex-col mb-5 justify-around">
          <div className="  ">
            <p className="text-lg font-bold text-darkbg py-2 lg:text-lg sm:text-sm">Token 1</p>
            <input
              type="text"
              placeholder="Fill in token"
              className=" rounded shadow w-full lg:text-lg sm:p-4 text-xs"
              name="token1" 
              onChange={e => setToken1(e.target.value)}
            />
          </div>
          <div className=" ">
            <p className="text-lg font-bold text-darkbg py-2  lg:text-lg sm:text-sm">Token 2</p>
            <input
              type="text"
              placeholder="Fill in token"
              className=" rounded shadow w-full lg:text-lg sm:p-4 text-xs"
              name="token2" onChange={e => setToken2(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="rounded bg-darkbg text-white px-12 py-4 " type="submit" value="Fetch" 
          onClick={getApi}>Fetch</button>
        </div>
      </form>
      </div>
      
      <div className="container     sm:mx-auto py-4  ">
      <h3 className=" text-3xl font-bold  text-left relative">List</h3>
      
      <div className="  overflow-x-auto shadow-md rounded border-collapse border border-sky-500 relative " >
      <table className=" bg-white  w-full relative    ">
            <thead>
              <tr className="border-b-2 border-gray">
                <th className="p-4 w-10  ">Token 1</th>
                <th className="p-4 w-10 ">Token 2</th>
                <th className="p-4 w-10 ">Binance</th>
                <th className="p-4 w-10 ">FTX</th>
                <th className="p-4 w-10 ">Diff</th>
                <th className="p-4 w-10 ">Action</th>
              </tr>
            </thead>
            <tbody>
            {allData.map((contest, idx) => (
            <tr key={idx} className="text-center">
            <td className="p-4 ">{contest.token1}</td>
            <td className="p-4" >{contest.token2}</td>
            <td className="p-4" >{contest.priceFTX}</td>
            <td className="p-4 ">{contest.priceBinance}</td>
            <td className="p-4" >{contest.diff}%</td>
            <td className="p-4" ><button  className="bg-red-500  text-white  py-2 px-4 rounded" type="submit" value="Del" onClick={(e) =>delData(idx)}>Delete</button></td>
          </tr>
            ))} 
          </tbody>
        </table>
      </div>
     
      </div>
    </div>
  );
};

export default MarketDiffForm;