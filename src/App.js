import logo from './logo.svg';
import './App.css';
import {useCallback, useEffect, useState } from 'react';
import { data } from './languageData';
import axios from "axios";

function App() {
  const[sourceLanguage,setsourceLanguage]=useState('en')
  const [targetLanguage, settargetLanguage] = useState('hi')
  const[Data,setData]=useState('')
  const[results,setResult]=useState('')

    // const fetchingData = useCallback(()=>{
          async function getTranslatedData() {
    try {
   
    const encodeData = new URLSearchParams();
    
    encodeData.append("source_language", sourceLanguage);
    encodeData.append("target_language", targetLanguage);
    encodeData.append("text", Data);

    const option = {
      method: "post",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key":
          "61fe42194dmsha3e696751cf48edp14633fjsn5dd03c4a1e74",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodeData, // payload // request body
    };
    const res = await axios.request(option);
    setResult(res.data.data.translatedText);
  } catch (error) {
    console.log(error);
  }
  }
//   getTranslatedData()
// },[])

// useEffect(()=>{
//   fetchingData()
// },[Data,sourceLanguage,targetLanguage])

  
  return (
    <>
      <div className="bg-slate-800 w-[100vw] h-[100vh] flex flex-col gap-10 items-center">
      <div className="w-full flex items-center pl-10 h-20 bg-teal-600">
       <h1 className="text-2xl  text-white">Language Translation</h1></div>
         <div className="flex flex-col items-center gap-6">
          <div>
            <label className="text-2xl text-white">source Language : </label>
            <select
            onChange={(e)=>setsourceLanguage(e.target.value)}
            value={sourceLanguage}
            
            >
              {data.map((item,index)=><option 
              key={index}
              value={item.value}>{item.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-2xl text-white">Target Language : </label>
            <select
            onChange={(e)=>settargetLanguage(e.target.value)}
            value={targetLanguage}
            
            >
              {data.map((item,index)=><option 
              key={index}
              value={item.value}>{item.name}</option>)}
            </select>
          </div>
          <button 
          onClick={getTranslatedData}
          className="w-40 h-10 rounded-full bg-orange-500 text-2xl text-white flex justify-center items-center hover:bg-orange-800">Translate</button>

          
           

          
            
         </div>
         <div className="w-[60%] h-[50%] bg-white flex rounded-lg shadow-lg shadow-cyan-500/50">
             <div className="w-[50%] h-full pl-1 items-center rounded-lg">
              <textarea 
                 onChange={(e)=>setData(e.target.value)}
                 value={Data}
                 className="w-full h-full pl-1 items-center"
                 type="text"
                placeholder="write a text"></textarea>
                </div>
                <div className="w-[50%] h-full bg-gray-400 pl-1 items-center rounded-lg">
                  <h1 className="w-full h-10 flex justify-center mt-3 text-2xl font-bold text-zinc-900">Translation</h1>
                  <p className="w-full h-auto mt-4 text-xl pl-2">{results}</p>

                </div>
         </div>
      </div>
    </>
  );
}

export default App;
