import React, { useRef, useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const AutocompleteInput = ({ onSelect }) => {
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setAddress(place.formatted_address);
      if (onSelect) {
        onSelect(place.formatted_address);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB9sA-Bn-0POr4a7JETfFv95QsDmexuDXQ" libraries={libraries}>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Digite o endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "80vw", padding: "10px", fontSize: "16px" }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default AutocompleteInput;
