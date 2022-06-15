import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import  dayjs from "dayjs";
import { number, string } from "prop-types";
const TradeForm = () => {
  const [token1, setToken1] = useState('BTC');
  const [token2, setToken2] = useState('USDT');
  
  
  const [asks,setAsks] = useState([]);
  const [bids,setBids] = useState([]);

  const [amount,setAmount] = useState("");
  const [value, setValue] = useState("USDT");

  const [orderDetail, setOrederdetail] = useState<TypeOrder[]>([]);
  const [orderIndex, setOrederindex] = useState(0);

  const [display,setDisplay] = useState(0);

  let token:number = 0;
  let priceAvg:number = 0;
  let inputUSDT: number = Number(amount);
  let i :number = 0;
interface TypeOrder{
  time : string,
  symbol: string,
  type :string,
  price : number,
  input : string,
  output: number
}
  useEffect(() => {
    
  },);
 //setOrederdetail([]);
  const getApi = async (e:React.FormEvent) => { 
    e.preventDefault()
    const newUrl2 =`https://api1.binance.com/api/v3/depth?symbol=${token1}${token2}` 
    const res2 = await  fetch(newUrl2);
    const link1 = await res2.json();
    setAsks(link1.asks) ;
    setBids(link1.bids);
    
    //someAsk()
  }
  //console.log(value,amount);
  const buyValue =() => {
   console.log(value,amount);
   if(value == token2){  //USDT
     for( let item of asks){
      if(inputUSDT > 0){
        buyOutputToken2(item);
      }
      else{          
        break;
      }
   } 
  }
  else{                           //BTC
    for( let item of asks){
      if(inputUSDT > 0){
        buyOutputToken1(item);
      }
      else{
        break;
      }
    }
  }
  let formatdate = dayjs().format("DD/MM/YYYY h:mm");
    const detail : TypeOrder ={
        time : formatdate,
        symbol: token1+"_"+token2,
        type :"Buy",
        price : priceAvg/i,
        input : amount,
        output: token
    }
    orderDetail.push(detail);
    
    console.log(orderDetail);
    setDisplay(display+1);
    
  }


  function buyOutputToken2(order : any) {
    
    let a : number = parseFloat(order[0]);
    let b : number = parseFloat(order[1]);
   
    //console.log("price= "+a+"\tAmount= "+b);
    if(inputUSDT >= (a*b)){
        token = b + token;
        priceAvg = a + priceAvg;
        inputUSDT = inputUSDT-(a*b) ;
        i++
        //console.log(token,priceAvg,inputUSDT);
    }
    else if (inputUSDT<(a*b)){  //เงินเหลือ
        let fewToken : number = (inputUSDT*b)/a; //เหรียญที่ซื้อได้ด้วยเงินที่เหลือจริงๆ
                            //เหรียญมีจำนวนเยอะกว่าที่ต้องการ
            token =  fewToken + token ;
            priceAvg = a + priceAvg; 
            inputUSDT = 0; 
            i++
            console.log(token,priceAvg,inputUSDT,i);
            
    }
  }

  function buyOutputToken1(order : any) {
    let a : number = parseFloat(order[0]); //ถ้าเป็นBTC
    let b : number = parseFloat(order[1]);
    if(inputUSDT >= b){
      inputUSDT = inputUSDT - b;
      token = (a*b) + token ; //ได้กี่USDT
      priceAvg = a + priceAvg;
      i++;
    }
    else if ( inputUSDT< b){
      let fewToken :number = inputUSDT*a;
      token = fewToken + token;
      priceAvg = a + priceAvg;  
      inputUSDT = 0;
      i++
    }
           
    
  }


  const sellValue =() => {
    console.log(value,amount);
   if(value == token2){  //USDT
     for( let item of bids){
      if(inputUSDT > 0){
        sellOutputToken2(item);
      }
      else{          
        break;
      }
   } 
  }
  else{                           //BTC
    for( let item of bids){
      if(inputUSDT > 0){
        sellOutputToken1(item);
      }
      else{
        break;
      }
    }
  }
  let formatdate = dayjs().format("DD/MM/YYYY h:mm");
    const detail ={
        time : formatdate,
        symbol: token1+"_"+token2,
        type :"Sell",
        price : priceAvg/i,
        input : amount,
        output: token
    }
    orderDetail.push(detail);
    
    console.log(orderDetail);
    setDisplay(display+1);
    
  }

  function sellOutputToken2(order : any) {
    
    let a : number = parseFloat(order[0]);
    let b : number = parseFloat(order[1]);
   
    //console.log("price= "+a+"\tAmount= "+b);
    if(inputUSDT >= (a*b)){
        token = b + token;
        priceAvg = a + priceAvg;
        inputUSDT = inputUSDT-(a*b) ;
        i++
        //console.log(token,priceAvg,inputUSDT);
    }
    else if (inputUSDT<(a*b)){  //เงินเหลือ
        let fewToken : number = (inputUSDT*b)/a; //เหรียญที่ซื้อได้ด้วยเงินที่เหลือจริงๆ
                            //เหรียญมีจำนวนเยอะกว่าที่ต้องการ
            token =  fewToken + token ;
            priceAvg = a + priceAvg; 
            inputUSDT = 0; 
            i++
            console.log(token,priceAvg,inputUSDT,i);
            
    }
            
    
  }
  

  function sellOutputToken1(order : any){
    let a : number = parseFloat(order[0]); //ถ้าเป็นBTC
    let b : number = parseFloat(order[1]);
    if(inputUSDT >= b){
      inputUSDT = inputUSDT - b;
      token = (a*b) + token ; //ได้กี่USDT
      priceAvg = a + priceAvg;
      i++;
    }
    else if ( inputUSDT< b){
      let fewToken :number = inputUSDT*a;
      token = fewToken + token;
      priceAvg = a + priceAvg;  
      inputUSDT = 0;
      i++
    }
  }
  // const someAsk = () => {
  //   console.log(asks)
  //   const someAsks = asks.filter((item:string,index:number) =>{
  //     if(index<4){
  //       return item;
  //     }
  //   })
  //   setAsks(someAsks)  
  //   console.log(someAsks);
      
    
  // }

  function ShowAsks (){
    return (
      <div className="  relative lg:w-auto h-52 overflow-y-auto sm:w-full  " >
      <h2 className=" text-xl lg:px-6 lg:py-3 sm:p-1 font-bold">Asks</h2>
      <table className="   lg:w-40 h-40  sm:w-full  ">
            <thead>
            <tr>
              <th  scope="col" className="lg:px-6 lg:py-3 sm:p-1 sm:text-xs lg:text-lg">Price({token2})</th>
              <th  scope="col" className="lg:px-6 lg:py-3 sm:p-1 sm:text-xs  lg:text-lg">Amount({token1})</th>
              <th  scope="col" className="lg:px-6 lg:py-3 sm:p-1 sm:text-xs  lg:text-lg">Total</th>
            </tr> 
            </thead>
            <tbody>
            {asks.map((contest, idx) => (
            <tr key={idx} className="">
            <td scope="row" className="lg:px-6 lg:py-3 sm:p-1 sm:text-xs  lg:text-lg font-medium text-red-600 whitespace-nowrap">{Number(contest[0])}</td>
            <td className="lg:px-6 lg:py-3 sm:p-1 text-darkbg sm:text-xs  lg:text-lg">{Number(contest[1])}</td>
            <td className="lg:px-6 lg:py-3 sm:p-1 text-darkbg sm:text-xs  lg:text-lg">{(Number(contest[0])*Number(contest[1]))}</td>
           </tr>
            ))} 
          </tbody>
        </table>
      </div>
  )}

  function ShowBids (){
    return (
      <div className="  relative lg:w-auto h-52 overflow-y-auto sm:py-3 lg:py-0 sm:w-full " >
      <h2 className=" text-xl lg:px-6 lg:py-3 sm:p-1 font-bold">Bids</h2>
      <table className="   lg:w-40 h-40  sm:w-full  ">
            <thead>
            <tr>
              <th  scope="col" className="lg:px-6 lg:py-3 sm:p-1 sm:text-xs lg:text-lg">Price({token2})</th>
              <th  scope="col" className="lg:px-6 lg:py-3 sm:p-1 sm:text-xs  lg:text-lg">Amount({token1})</th>
              <th  scope="col" className="lg:px-6 lg:py-3 sm:p-1 sm:text-xs  lg:text-lg">Total</th>
            </tr> 
            </thead>
            <tbody>
            {bids.map((contest, idx) => (
            <tr key={idx} className="">
            <td scope="row" className="lg:px-6 lg:py-3 sm:p-1 sm:text-xs  lg:text-lg font-medium text-green-600 whitespace-nowrap">{Number(contest[0])}</td>
            <td className="lg:px-6 lg:py-3 sm:p-1 text-darkbg sm:text-xs  lg:text-lg">{Number(contest[1])}</td>
            <td className="lg:px-6 lg:py-3 sm:p-1 text-darkbg sm:text-xs  lg:text-lg">{(Number(contest[0])*Number(contest[1]))}</td>
           </tr>
            ))} 
          </tbody>
        </table>
      </div>
  )}

  const ShowOrder =() =>{
    return(
      
      <div className="container  px-4 py-2    sm:mx-auto  ">
      <h3 className=" text-xl font-bold  text-left relative py-2">Order history</h3>
      
      <div className="  overflow-x-auto shadow-md rounded border-collapse  relative " >
      <table className=" bg-white  w-full relative    ">
            <thead>
              <tr className="border-b-2 border-gray">
                <th className="p-4 w-10  ">Order ID</th>
                <th className="p-4 w-10 ">Date</th>
                <th className="p-4 w-10 ">Symbol</th>
                <th className="p-4 w-10 ">Type</th>
                <th className="p-4 w-10 ">Price</th>
                <th className="p-4 w-10 ">Input</th>
                <th className="p-4 w-10 ">Output</th>
              </tr>
            </thead>
            <tbody>
            {orderDetail.map((contest, idx) => (
            <tr key={idx} className="text-center">
            <td className="p-4 ">#{idx+1}</td>
            <td className="p-4" >{contest.time}</td>
            <td className="p-4" >{contest.symbol}</td>
            <td className="p-4 ">{contest.type}</td>
            <td className="p-4" >{contest.price}</td>
            <td className="p-4" >{contest.input}</td>
            <td className="p-4" >{contest.output}</td>
          </tr>
            ))} 
          </tbody>
        </table>
      </div>
     
      </div>
     
      
      
    )
  }
  //console.log(data);
  //console.log(token1,token2);

  return (
    <div className="w-full  justify-center flex flex-col  p-5 bg-lightbg  cursor-default">
      <div className="container rounded-lg shadow-lg w-full relative bg-white  lg:p-12  sm:mx-auto p-6   ">
      <form>
        <h3 className="lg:text-4xl sm:text-2xl font-bold text-center mb-7 ">Trade</h3>
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
      
      <div className="container w-full  relative sm:mx-auto py-4 ">
        <div className="px-4 py-2 flex lg:flex-nowrap justify-between sm:flex-wrap  relative">
          {ShowAsks()}
          {ShowBids()}
        </div>

        <div className="px-4 py-2 flex lg:flex-nowrap justify-between sm:flex-wrap  relative">
          <div className="py-2 w-full ">
            <p className="text-lg font-bold text-darkbg py-2 px-1 lg:text-xl ">Amount</p>
            <label className="block bg-white py-1 w-full rounded-lg  flex justify-around">
              <input
                type="text"
                placeholder="Amount"
                className=" border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 lg:text-lg sm:text-xs py-2 sm:w-full sm:px-2 "
                name="amountBuy" 
                onChange={e => setAmount(e.target.value)}
              />
              <select value={value} onChange={(e) => {setValue(e.target.value);}} className=" border border-cyan-500 rounded-lg lg:text-base sm:text-xs text-cyan-500 p-1 m-1 ">
                <option value={token1}>{token1}</option>
                <option value={token2}>{token2}</option>
              </select>
            </label>
            <div className="p-2"></div> 
            <button onClick={buyValue} className=" bg-green-600 text-white text-sm  py-4 w-full rounded">Buy</button> 
          </div>

          <div className="px-10"></div>

          <div className="py-2 w-full  ">
            <p className="text-lg font-bold text-darkbg py-2 px-1 lg:text-xl ">Amount</p>
            <label className="block bg-white py-1 w-full rounded-lg flex justify-around">
              <input
                type="text"
                placeholder="Amount"
                className=" border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 lg:text-lg sm:text-xs  py-2 sm:w-full sm:px-2 "
                name="amountSell" 
                onChange={e => setAmount(e.target.value)}
              />
              <select value={value} onChange={(e) => {setValue(e.target.value);}} className=" border border-cyan-500 rounded-lg lg:text-base sm:text-xs text-cyan-500 p-1 m-1">
                <option value={token1}>{token1}</option>
                <option value={token2}>{token2}</option>
              </select>
            </label>
            <div className="p-2"></div> 
            <button onClick={sellValue} className=" bg-red-600 text-white text-sm  py-4 w-full rounded">Sell</button> 
          </div>

        </div>

      
      </div>
      {display > 0 && <ShowOrder/> }
      
    </div>
  );
};

export default TradeForm;