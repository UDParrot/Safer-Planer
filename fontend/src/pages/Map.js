import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import {Header} from 'semantic-ui-react'

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import Arrangement from '../components/Arrangement';


//https://developers.google.com/maps/documentation/javascript/places
const libraries = ["places"];
const mapContainerStyle = {
  height: "90vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

function Map() {

  const { user, logout } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_LOCATION_QUERY);

  var locationList = [];
  if (!loading){
    locationList = data.getAllLocations;
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries, // avoid rerender
  });
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  if (loadError) return "Error Loading Map";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {
          locationList.map((location) =>
          <Marker
            key = {location.address}
            position={{ lat: parseFloat(location.lait), lng:  parseFloat(location.long)}}
            onClick={() => {
              setSelected(location);
            }}
          />
          )
        }

        {/* Display marker info */
        selected ? (
          <InfoWindow
            position={{ lat: parseFloat(selected.lait), lng: parseFloat(selected.long) }}
            onCloseClick={() => {
            setSelected(null);
            }}
          >
            <div>
              <Link to={"/location/"+selected.address}>View More </Link>
              <Header as='h3' color='teal' textAlign='center'>
                { selected.address }
              </Header>
              <h4>
                Predicted Current Visitor Flow: 
                <ReturnPopulation selected={selected} /> 
              </h4>
              <font>
                { new Date().toLocaleString() }
              </font>
              {
                user ? (
                  <Arrangement location={selected}/>
                ):(<div><font>Pleas login to make arrangement</font></div>)
              }
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function ReturnPopulation({ selected }) {
  const date = new Date();
  const hour = date.getHours();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const long = selected.long;
  const lait = selected.lait;
  const { loading, data } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: hour, year: year, month: month, day: day}});
  var count = 0;
  if(!loading){
    count = data.getCountOfLocationAtTime;
  }
  return (
    <font color="#4fb386">{count} People</font> 
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 40.712776, lng: () => -74.005974 },
      radius: 200 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

const FETCH_LOCATION_QUERY = gql `
  {
    getAllLocations{
      long
      lait
      address
    }
  }
`

const FETCH_POPULATION_QUERY = gql `
  query GetCountOfLocationAtTime($long: String, $lait: String, $time: Int, $year: Int, $month: Int, $day: Int){
    getCountOfLocationAtTime(long: $long, lait: $lait, time: $time, year: $year, month: $month, day: $day)
  }
`


export default Map;