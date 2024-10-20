import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ImageCarousel from './components/Carousel';
import Banner from './components/Banner';
import DateField from './components/DateField';
import TimeField from './components/TimeField';
import Checkbox from './components/Checkbox';
import Button from './components/Button';
import './App.css';
import { useNavigate } from 'react-router-dom';
import AutocompleteInput from './components/AutocompleteInput';

function Home() {
  const placePickerRef = useRef(null);
  const [value, setValue] = useState(0); // Valor inicial do slider
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [address, setAddress] = useState(''); // Endereço armazenado
  const [manualAddress, setManualAddress] = useState(''); // Endereço manual
  const [resultado, setResultado] = useState({}); // Estado para armazenar o resultado da requisição
  
  const navigate = useNavigate(); // Hook para navegação programática

  // Estados para Checkboxes
  const [selectedTransportOptions, setSelectedTransportOptions] = useState([]);
  const [selectedFoodOptions, setSelectedFoodOptions] = useState([]);
  const [isAccessibility, setAccessibility] = useState(false);
  const [isPetFriendly, setIsPetFriendly] = useState(false);
  const [isChildFriendly, setIsChildFriendly] = useState(false);

  // Estados para Moods
  const [isNatural, setIsNatural] = useState(false);
  const [isSilencioso, setIsSilencioso] = useState(false);
  const [isRelaxante, setIsRelaxante] = useState(false);
  const [isAnimado, setIsAnimado] = useState(false);

  const [isRomantico, setIsRomantico] = useState(false);
  const [isEsportivo, setIsEsportivo] = useState(false);
  const [isDescontraido, setIsDescontraido] = useState(false);
  const [isCultural, setIsCultural] = useState(false);
  const [isFamiliar, setIsFamiliar] = useState(false);
  const [isFestivo, setIsFestivo] = useState(false);

  const [isPagode, setIsPagode] = useState(false);
  const [isRestaurante, setIsRestaurante] = useState(false);
  const [isDrinks, setIsDrinks] = useState(false);
  const [isSamba, setIsSamba] = useState(false);
  const [isComidaRegional, setIsComidaRegional] = useState(false);

  // Novos estados para ambience, gastronomy, vibe e transport_types
  const [ambience, setAmbience] = useState([]);
  const [gastronomy, setGastronomy] = useState([]);
  const [vibe, setVibe] = useState([]);
  const [transport_types, setTransportTypes] = useState([]);

  const transportOptions = [
    'Carro',
    'Transporte Público',
    'A pé',
    'Transporte por Aplicativo',
    'Bicicleta',
  ];
  const alimentacaoOptions = [
    'Café da Manhã',
    'Almoço',
    'Café da Tarde',
    'Janta',
    'Não vou comer',
  ];

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    console.log("Endereço selecionado: ", selectedAddress);
  };

  const handlePlaceChange = () => {
    if (placePickerRef.current) {
      const place = placePickerRef.current.getPlace(); // Método para capturar o place
      if (place && place.formatted_address) {
        setAddress(place.formatted_address);
        console.log('Endereço selecionado:', place.formatted_address);
      } else {
        console.log('Nenhum endereço foi selecionado.');
      }
    }
  };

  useEffect(() => {
    const el = placePickerRef.current;
    if (el) {
      el.addEventListener('place_changed', handlePlaceChange);
      return () => el.removeEventListener('place_changed', handlePlaceChange);
    }
  }, []);

  const handleSubmit = () => {
    const data = {
      local: manualAddress, // Use the manual address
      max_price: Number(value),
      datetime: {
        date: date,
        exit_time: startTime,
        return_time: endTime,
      },
      food: selectedFoodOptions,
      transport_types: selectedTransportOptions,
      accessibility: isAccessibility,
      pet_friendly: isPetFriendly,
      child_friendly: isChildFriendly,
      moods: {
        ambience: ambience,
        vibe: vibe,
        gastronomy: gastronomy,
      },
    };

    console.log('Dados enviados:', data);

    fetch('https://flow-3slz.onrender.com/create-turistic-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        setResultado(result);
        navigate('/results', { state: { resultado: result } });
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  return (
    <div className="App">
      <Header />
      <ImageCarousel />
      <Banner />
      <div id="forms">
        {/* Seção de Local */}
        <div className="locate-section">
          <h1>Local<span className="required-asterisk">*</span></h1>
          <hr className="custom-line" />
          <p>Preencha com o local de saída para seu passeio</p>
          <AutocompleteInput onSelect={handleAddressSelect}/>
          <p>Endereço selecionado ou digitado: {address || manualAddress}</p>
        </div>

        <div className="cost-range-section">
          <h1>Faixa de Custo<span className="required-asterisk">*</span></h1>
          <hr className="custom-line" />
          <input type="range" step='20' min="0" max="200" value={value} onChange={(e) => setValue(e.target.value)} />
          <p>Valor selecionado: R$ {value === '200' ? '200+' : value} por pessoa</p>
        </div>

        <div className="time">
          <h1>Horários<span className="required-asterisk">*</span></h1>
          <hr className="custom-line" />
          <DateField label="Data" value={date} onChange={(e) => setDate(e.target.value)} />
          <TimeField label="Saída" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          <TimeField label="Retorno" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>

        {/* Seção de Alimentação */}
        <div className="food">
          <h1>
            Alimentação<span className="required-asterisk">*</span>
          </h1>
          <hr className="custom-line" />
          <p>
            Preencha caso você deseje receber recomendações de locais para
            alimentação na sua trilha.
          </p>
          {alimentacaoOptions.map((option) => (
            <Checkbox
              key={option}
              label={option}
              checked={selectedFoodOptions.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedFoodOptions([...selectedFoodOptions, option]);
                } else {
                  setSelectedFoodOptions(
                    selectedFoodOptions.filter((item) => item !== option)
                  );
                }
              }}
            />
          ))}
        </div>

        {/* Seção de Demais Informações */}
        <div className="demais">
          <h1>
            Demais Informações<span className="required-asterisk">*</span>
          </h1>
          <hr className="custom-line" />
          <p>Preencha as informações abaixo:</p>
          <div className="dropdowns-checkboxes">
            <p>Forma de transporte:</p>
            {transportOptions.map((option) => (
              <Checkbox
                key={option}
                label={option}
                checked={selectedTransportOptions.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTransportOptions([
                      ...selectedTransportOptions,
                      option,
                    ]);
                  } else {
                    setSelectedTransportOptions(
                      selectedTransportOptions.filter(
                        (item) => item !== option
                      )
                    );
                  }
                }}
              />
            ))}

            {/* Checkbox para Pet-friendly */}
            <Checkbox
              label="Pet-friendly"
              checked={isPetFriendly}
              onChange={(e) => setIsPetFriendly(e.target.checked)}
            />
            <Checkbox
              label="Acessibilidade"
              checked={isAccessibility}
              onChange={(e) => setAccessibility(e.target.checked)}
            />

            {/* Checkbox para Child-friendly */}
            <Checkbox
              label="Child-friendly"
              checked={isChildFriendly}
              onChange={(e) => setIsChildFriendly(e.target.checked)}
            />
          </div>
        </div>

        {/* Seção de Experiência */}
        <div className="experience">
          <h1>Personalize sua Experiência (opcional)</h1>
          <hr className="custom-line" />
          <p>Marque as estéticas de passeio desejado:</p>

          <div className="subtitle-experience">
            <h2>Ambiente</h2>
            <hr className="custom-line-subtitle" />
          </div>

          <Checkbox
            label="Contato com a natureza"
            checked={ambience.includes('Contato com a natureza')}
            onChange={(e) => {
              if (e.target.checked) {
                setAmbience([...ambience, 'Contato com a natureza']);
              } else {
                setAmbience(ambience.filter((item) => item !== 'Contato com a natureza'));
              }
            }}
          />

          <Checkbox
            label="Ambientes Silenciosos"
            checked={ambience.includes('Ambientes Silenciosos')}
            onChange={(e) => {
              if (e.target.checked) {
                setAmbience([...ambience, 'Ambientes Silenciosos']);
              } else {
                setAmbience(ambience.filter((item) => item !== 'Ambientes Silenciosos'));
              }
            }}
          />

          <Checkbox
            label="Espaços Relaxante"
            checked={ambience.includes('Espaços Relaxante')}
            onChange={(e) => {
              if (e.target.checked) {
                setAmbience([...ambience, 'Espaços Relaxante']);
              } else {
                setAmbience(ambience.filter((item) => item !== 'Espaços Relaxante'));
              }
            }}
          />

          <Checkbox
            label="Animado"
            checked={ambience.includes('Animado')}
            onChange={(e) => {
              if (e.target.checked) {
                setAmbience([...ambience, 'Animado']);
              } else {
                setAmbience(ambience.filter((item) => item !== 'Animado'));
              }
            }}
          />

          <div className="subtitle-experience">
            <h2>Vibe</h2>
            <hr className="custom-line-subtitle" />
          </div>

          <Checkbox
            label="Romântico"
            checked={vibe.includes('Romântico')}
            onChange={(e) => {
              if (e.target.checked) {
                setVibe([...vibe, 'Romântico']);
              } else {
                setVibe(vibe.filter((item) => item !== 'Romântico'));
              }
            }}
          />

          <Checkbox
            label="Esportivo"
            checked={vibe.includes('Esportivo')}
            onChange={(e) => {
              if (e.target.checked) {
                setVibe([...vibe, 'Esportivo']);
              } else {
                setVibe(vibe.filter((item) => item !== 'Esportivo'));
              }
            }}
          />

          <Checkbox
            label="Descontraído"
            checked={vibe.includes('Descontraído')}
            onChange={(e) => {
              if (e.target.checked) {
                setVibe([...vibe, 'Descontraído']);
              } else {
                setVibe(vibe.filter((item) => item !== 'Descontraído'));
              }
            }}
          />

          <Checkbox
            label="Cultural"
            checked={vibe.includes('Cultural')}
            onChange={(e) => {
              if (e.target.checked) {
                setVibe([...vibe, 'Cultural']);
              } else {
                setVibe(vibe.filter((item) => item !== 'Cultural'));
              }
            }}
          />

          <Checkbox
            label="Familiar"
            checked={vibe.includes('Familiar')}
            onChange={(e) => {
              if (e.target.checked) {
                setVibe([...vibe, 'Familiar']);
              } else {
                setVibe(vibe.filter((item) => item !== 'Familiar'));
              }
            }}
          />

          <Checkbox
            label="Festivo"
            checked={vibe.includes('Festivo')}
            onChange={(e) => {
              if (e.target.checked) {
                setVibe([...vibe, 'Festivo']);
              } else {
                setVibe(vibe.filter((item) => item !== 'Festivo'));
              }
            }}
          />

          <div className="subtitle-experience">
            <h2>Gastronomia</h2>
            <hr className="custom-line-subtitle" />
          </div>

          <Checkbox
            label="Pagode"
            checked={gastronomy.includes('Pagode')}
            onChange={(e) => {
              if (e.target.checked) {
                setGastronomy([...gastronomy, 'Pagode']);
              } else {
                setGastronomy(gastronomy.filter((item) => item !== 'Pagode'));
              }
            }}
          />

          <Checkbox
            label="Restaurante"
            checked={gastronomy.includes('Restaurante')}
            onChange={(e) => {
              if (e.target.checked) {
                setGastronomy([...gastronomy, 'Restaurante']);
              } else {
                setGastronomy(gastronomy.filter((item) => item !== 'Restaurante'));
              }
            }}
          />

          <Checkbox
            label="Drinks"
            checked={gastronomy.includes('Drinks')}
            onChange={(e) => {
              if (e.target.checked) {
                setGastronomy([...gastronomy, 'Drinks']);
              } else {
                setGastronomy(gastronomy.filter((item) => item !== 'Drinks'));
              }
            }}
          />

          <Checkbox
            label="Samba"
            checked={gastronomy.includes('Samba')}
            onChange={(e) => {
              if (e.target.checked) {
                setGastronomy([...gastronomy, 'Samba']);
              } else {
                setGastronomy(gastronomy.filter((item) => item !== 'Samba'));
              }
            }}
          />

          <Checkbox
            label="Comida Regional"
            checked={gastronomy.includes('Comida Regional')}
            onChange={(e) => {
              if (e.target.checked) {
                setGastronomy([...gastronomy, 'Comida Regional']);
              } else {
                setGastronomy(gastronomy.filter((item) => item !== 'Comida Regional'));
              }
            }}
          />
        </div>
      </div>

      <Button label="Criar Agenda" onClick={handleSubmit} />
    </div>
  );
}

export default Home;