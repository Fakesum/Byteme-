import Results from './display_results'
import './App.css'
import { useState, useReducer } from 'react';
import Header from './header'
import Footer from './footer'
import LoadingBar from './components/loading';

export default function Component() {
    const [loading, setLoading] = useState(0);

    const [results, setResults] = useState(null);

    function search(query){
        fetch(`http://localhost:3030/search?q=${query}`).then(res => {return res.json()}).then(res => {
          setResults(res);
          setLoading(0);
        }).catch(e => {console.log(e)});
    }

  function loadingBar(){
    return (
      <div>
        <LoadingBar progress={loading} max={2}/>
      </div>
    )
  }
  return (
      <div className="min-h-screen flex flex-col bg-gray-50">

        <Header />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8">
          <div>
            <h1 className="text-center text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Find the Best Prices
            </h1>
            <p className="mt-5 text-xl text-center text-gray-500">
              Compare prices for any product or service across multiple platforms.
            </p>
          </div>
          <div className="mt-10 flex items-center">
          <input
              type="text" 
              placeholder="Enter a product or service..." 
              className="block w-full rounded-l-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 main-input"
              onKeyDown={(e)=>{
                if (e.key != 'Enter'){
                  return;
                }
                setLoading(1);
                search(e.currentTarget.value);
              }}
            />
            <br/>
          </div>
          <div className='results-container'>
            {
                loading != 0 ? loadingBar() : (results == null ? <></>: <Results resData={results}></Results>)
            }
          </div>
        </div>
      </main>

      <Footer/>

      </div>

  )
}