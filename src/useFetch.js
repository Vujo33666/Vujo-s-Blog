import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{

        const abortCont = new AbortController();

        // npx json-server --watch data/db.json --port 5555
         fetch(url,{signal:abortCont.signal})
           .then(response=>{
             if(!response.ok){
               throw Error("could not fetch the data for that resource!");
             }
             return response.json();
           })
           .then(data => {
             setData(data);
             setLoading(false);
             setError(null);
           })
           .catch(error=>{
               if(error.name==="AbortError"){
                   console.log("fetch aborted");
               }else{
                setLoading(false);
                setError(error.message);
               }
           })
           //aborting fetching data if client moves to another page
           return () => abortCont.abort();
           
       },[url]);
       return {data,loading,error}
}

export default useFetch;