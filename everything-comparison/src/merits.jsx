import React, { useReducer, useState } from 'react'
import LoadingBar from './components/loading';
import ProductAnalysisCard from './components/productAnalysis'
import Headers from './header'
import Footer from './footer'

export default function Component() {
    const [loading, setLoading] = useState(0);
    const [result, setResult] = useState(null);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    function search(query){
        fetch(`http://localhost:3030/merits?q=${query}`).then(res => {return res.json()}).then(res => {
            setResult(res);
            setLoading(0);
            forceUpdate();
        });
    }

    function loadingComponent(){
        return loading != 0 ? <LoadingBar progress={loading} max={2} /> : (result == null ? <div></div> : <ProductAnalysisCard data={result}/>)
    }

    return (
        <div>
            <Headers />
            <input onKeyDown={(e) => {
                if (e.key != 'Enter'){
                    return;
                }
                setLoading(1);
                search(e.currentTarget.value);
                forceUpdate();
            }}></input>
            {
                loadingComponent()
            }
            <Footer />
        </div>
    )
}