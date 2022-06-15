
import { useState,useEffect, ReactElement } from "react";
import React from 'react'

import { createChart } from 'lightweight-charts';

const ChartForm = () => {
  const [display,setDisplay] = useState(0); 
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState(''); 
  let dataGraph:any =[];


  const getApi = async (e:React.FormEvent) => { 
    e.preventDefault()
    const newUrl2 =`https://api1.binance.com/api/v3/klines?interval=1h&symbol=${token1}${token2}` 
    const res2 = await  fetch(newUrl2);
    const link1 = await res2.json();
    console.log(link1);
    

    
    
    link1.map((item : any)=>{
      
      

      const newobject ={
         
        time : item[0],
        open : Number(item[1]),
        hight : Number(item[2]),
        low : Number(item[3]),
        close : Number(item[4])
      };
      
      dataGraph.push(newobject);
    });
    
    
    console.log(dataGraph);
    
    }

    const callChart = () => {
    const chart = createChart(document.body, { width: 800, height: 700 });
    // const candlestickSeries = chart.addCandlestickSeries();
    // console.log(dataGraph);
    // candlestickSeries.setData(dataGraph);
    // chart.timeScale().fitContent();
    const candlestickSeries = chart.addCandlestickSeries();
    // candlestickSeries.setData(
    //   dataGraph 
    // );
    candlestickSeries.setData([
        { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
        { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
        { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
        { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
        { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
        { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
        { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
        { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
        { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
        { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
    ]);
    chart.timeScale().fitContent();

    }

    let imgToken = (name : string): any =>{
        
        switch(name){
            case "BTC":
                return <img src ="bitcoin-btc-logo.png" className="w-8 h-8"/>
                
            case "USDT":
                return <img src ="tether-usdt-logo.png" className="w-8 h-8"/>
            
            case "ETH":
                return <img src ="ethereum-eth-logo.png" className="w-8 h-8"/>
            
            case "SOL":
                return <img src ="solana-sol-logo.png" className="w-8 h-8"/>

            case "XRP":
                return <img src ="solana-sol-logo.png" className="w-8 h-8"/>
                
        }
    }
    console.log(imgToken(token1))
  return (
    <div className="w-full  justify-center flex flex-col  p-5 cursor-default  ">
      <div className="container rounded-lg shadow-lg w-full  bg-white relative lg:p-12  sm:mx-auto p-6   ">
      <form>
        <h3 className="lg:text-4xl sm:text-2xl font-bold text-center mb-7 ">Chart</h3>
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

      
      <div className="py-2 relative "></div>
      <div className="container  relative   sm:mx-auto py-4 bg-white  flex flex-col  ">
          <div className="flex-row relative">
          <div className="px-4 py-2 flex  justify-between flex-wrap relative ">
              <div>
                <div className="px-4  flex flex-row items-center">
                    {imgToken(token1)}
                    {imgToken(token2)}
                    <h3 className="px-2 text-sm font-bold  text-left">{token1}/{token2}</h3>
                    <img src ="Vector.png" className="lg:w-5 sm:w-4 "/>
                </div>
                <div className="px-4 py-2 flex flex-row items-center">
                    <h1 className=" lg:text-3xl font-bold text-darkbg sm:text-xl">45,212.30</h1>
                    <h6 className="px-1 text-xs text-gray-400 ">{token1}/{token2}</h6>
                    <h6 className=" text-xs text-red-600 ">-0.001(-2.14%)</h6>
                
                </div>
                <div className="px-4  flex flex-row items-center ">
                    <h6 className=" text-xs text-gray-400  ">Apr 05,2022, 07:37PM</h6>
                </div>
            </div>
            <div>
              <div className="px-4  flex flex-row ">
                    <button className="text-darkbg hover:bg-blue-500 hover:text-white text-sm font-bold py-1  lg:px-4 lg:py-2 rounded-full">30M</button>
                    <button className="text-darkbg hover:bg-blue-500 hover:text-white text-sm font-bold py-1 sm:px-2 lg:px-4 lg:py-2 rounded-full">1H</button>
                    <button className="text-darkbg hover:bg-blue-500 hover:text-white text-sm font-bold py-1 sm:px-2 lg:px-4 lg:py-2 rounded-full">24H</button>
                    <button className="text-darkbg hover:bg-blue-500 hover:text-white text-sm font-bold py-1 sm:px-2 lg:px-4 lg:py-2 rounded-full">1W</button>
                    <button className="text-darkbg hover:bg-blue-500 hover:text-white text-sm font-bold py-1 sm:px-2 lg:px-4 lg:py-2 rounded-full">1M</button>
                    <button className="text-darkbg hover:bg-blue-500 hover:text-white text-sm font-bold py-1 sm:px-2 lg:px-4 lg:py-2 rounded-full">1Y</button>
                </div>
            </div>  
          </div>
          
          </div>
          
          
      </div>
    </div>
  )
}



export default ChartForm;