import Results from './display_results'
import './App.css'
import { useState, useReducer, useEffect } from 'react';
import Header from './header'
import Footer from './footer'
import LoadingBar from './components/loading';
import { MapContainer, Marker, TileLayer, Tooltip, Popup, useMap, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Component() {
    const [loading, setLoading] = useState(0);
    const [loading_bar, setLoadingBar] = useState(0);
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    const [temp_marker, setTempMarker] = useState(undefined);
    const [results, setResults] = useState(null);
    const [center, setCenter] = useState([0,0]);
    const [zoom, setZoom] = useState(0);
    const [value, setValue] = useState('');
    const [show_map,  setShowMap] = useState(false);

    function search(query){
      if ((show_map) && (temp_marker != undefined)){
        query += ', from cords: ' + temp_marker[0] + ',' + temp_marker[1];
      }

      console.log(query);
      
      fetch(`http://localhost:3030/search?q=${query}`).then(res => {return res.json()}).then(res => {
          setResults(res);
          setLoading(0);
        }).catch(e => {console.log(e)});
    }
  
    useEffect(() => {
      setInterval(() => {
        setLoadingBar(loading_bar + 1);
      }, 5000)
    });

  function loadingBar(){
    return (
      <div>
        <LoadingBar progress={loading_bar} max={120}/>
      </div>
    )
  }

  function makeTempMarker(search_result){
    setTempMarker(search_result);

    setCenter([search_result.lat, search_result.lon]);
    setZoom(10);

    forceUpdate();
  }

  const MapEvents = () => {
      useMapEvent({
        click(e) {
          setTempMarker([e.latlng.lat, e.latlng.lng]);
        },
      });
      return false;
  }

  function showStreets(e){

    if (e.code == "Enter"){
      if (document.querySelector(".address-input").value == ""){
        return; // Cause OH God it crashes, And I have no idea WHY!!!.
      }
      
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${document.querySelector(".address-input").value}&limit=5&appid=da00953907b5ec2c5db00f53ffd89e68`)
        .then(res => {if (res.cod == 400){return [];}; return res.json()})
        .then(res => {if (res != []){
          makeTempMarker(res[0]);
        }}).catch(e=>{});
    }
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
          <label className="switch">
            <input type="checkbox" onChange={(e) => {setShowMap(e.currentTarget.checked);}}/>
            <span className="slider round"></span>
          </label>
          {(()=>{
            if (!show_map){
              return;
            }
            return (<div style={{ height: '400px', width: '100%' }}>
              <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                  <input
                    placeholder="Search For Places here..."
                    style={{zIndex: 99999, position: 'absolute'}}
                    type="text"
                    autoComplete="street-address"
                    className="address-input"
                    onKeyDown={showStreets}
                  />
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {
                    (()=>{
                      if (temp_marker == undefined){
                        return;
                      }

                      return <Marker position={temp_marker}>
                      </Marker>
                    }
                    )()
                  }
                  <MapEvents />
              </MapContainer>
          </div>)})()}
        </div>
      </main>

      <Footer/>

      </div>

  )
}