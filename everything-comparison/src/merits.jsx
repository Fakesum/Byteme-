import React, { useEffect, useReducer, useState } from 'react'
import LoadingBar from './components/loading';
import ProductAnalysisCard from './components/productAnalysis'
import Headers from './header'
import Footer from './footer'

export default function Component() {
    const [loading, setLoading] = useState(0);
    const [loading_animation, setLoadingAnimation] = useState(0);
    const [result, setResult] = useState(null);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        setInterval(() => {setLoadingAnimation(loading_animation + 1)}, 5000);
    }, [loading_animation]);

    function search(query){
        fetch(`http://localhost:3030/merits?q=${query}`).then(res => {return res.json()}).then(res => {
            setResult(res);
            setLoading(0);
            forceUpdate();
        });
    }

    function loadingComponent(){
        return loading != 0 ? <LoadingBar progress={loading_animation} max={120} /> : (result == null ? <div></div> : <ProductAnalysisCard data={result}/>)
    }

    return (
        <div>
            <Headers />
            <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
            }}>
                <input className='block w-full rounded-l-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 main-input' style={{backgroundColor: 'lightgray', width: '50%'}} onKeyDown={(e) => {
                    if (e.key != 'Enter'){
                        return;
                    }
                    setLoading(1);
                    search(e.currentTarget.value);
                    forceUpdate();
                }}></input>
            </div>
            {
                loadingComponent()
            }
            <Footer />
        </div>
    )
}