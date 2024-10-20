import React, { useState, useRef } from 'react';
import Header from './components/Header';
import ImageCarousel from './components/Carousel';
import Banner from './components/Banner';
import DateField from './components/DateField';
import TimeField from './components/TimeField';
import Checkbox from './components/Checkbox';
import Button from './components/Button';
import './App.css';

function App() {
    const placePickerRef = useRef(null);
    const [value, setValue] = useState(250); // Valor inicial do slider
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedPlace, setSelectedPlace] = useState('');

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

    const transportOptions = ['Carro', 'Transporte Público', 'A pé', 'Transporte por Aplicativo', 'Bicicleta'];
    const alimentacaoOptions = ['Café da Manhã', 'Almoço', 'Café da Tarde', 'Janta', 'Não vou comer'];

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handlePlaceChange = (event) => {
        const place = event.detail.result;
        console.log('Place object:', place);
        console.log('Formatted address:', place.formatted_address);
        setSelectedPlace(place.formatted_address);
    };

    const handleSubmit = () => {
        // Verificar se selectedPlace tem valor

        
        if (!selectedPlace) {
            alert('Por favor, selecione um endereço válido.');
            return;
        }

        // Mapeamento para os valores esperados pela API
        const transportMapping = {
            'Carro': 'carro',
            'Transporte Público': 'transporte_publico',
            'A pé': 'a_pe',
            'Transporte por Aplicativo': 'transporte_aplicativo',
            'Bicicleta': 'bicicleta',
        };

        const transport_types = selectedTransportOptions.map(option => transportMapping[option]);

        // Coleta dos moods
        const ambience = [];
        if (isNatural) ambience.push('Contato com a natureza');
        if (isSilencioso) ambience.push('Ambientes Silenciosos');
        if (isRelaxante) ambience.push('Espaços Relaxante');
        if (isAnimado) ambience.push('Animado');

        const vibe = [];
        if (isRomantico) vibe.push('Romântico');
        if (isEsportivo) vibe.push('Esportivo');
        if (isDescontraido) vibe.push('Descontraído');
        if (isCultural) vibe.push('Cultural');
        if (isFamiliar) vibe.push('Familiar');
        if (isFestivo) vibe.push('Festivo');

        const gastronomy = [];
        if (isPagode) gastronomy.push('Pagode');
        if (isRestaurante) gastronomy.push('Restaurante');
        if (isDrinks) gastronomy.push('Drinks');
        if (isSamba) gastronomy.push('Samba');
        if (isComidaRegional) gastronomy.push('Comida Regional');

        // Construção do objeto de dados
        const data = {
            local: selectedPlace,
            max_price: Number(value),
            datetime: {
                date: date,
                exit_time: startTime,
                return_time: endTime,
            },
            food: selectedFoodOptions,
            transport_types: transport_types,
            accessibility: isAccessibility,
            pet_friendly: isPetFriendly,
            child_friendly: isChildFriendly,
            moods: {
                ambience: ambience,
                vibe: vibe,
                gastronomy: gastronomy,
            }
        };

        console.log('Dados enviados:', data);

        // Envio da requisição
        fetch('https://flow-3slz.onrender.com/create-turistic-route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            // Aqui você pode redirecionar o usuário ou mostrar uma mensagem de sucesso
        })
        .catch(error => {
            console.error('Error:', error);
            // Trate os erros aqui
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
                    <gmpx-place-picker
                        ref={(el) => {
                            if (el && !el.listenerAttached) {
                                el.addEventListener('gmpx-place-changed', handlePlaceChange);
                                el.listenerAttached = true; // Evita adicionar múltiplos listeners
                            }
                            placePickerRef.current = el;
                        }}
                        placeholder="Digite um endereço"
                        className="endereco_box"
                    ></gmpx-place-picker>
                </div>

                {/* Seção de Faixa de Custo */}
                <div className="cost-range-section">
                    <h1>Faixa de Custo<span className="required-asterisk">*</span></h1>
                    <hr className="custom-line" />
                    <p>Preencha com o valor máximo que deseja gastar por pessoa</p>

                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={value}
                        onChange={handleChange}
                        className="slider"
                        step="25"
                    />
                    <p>Valor selecionado: <span className='dinheiro'>R$ {value === '500' ? '500+' : value}</span> por pessoa</p>
                </div>

                {/* Seção de Horários */}
                <div className="time">
                    <h1>Horários<span className="required-asterisk">*</span></h1>
                    <hr className="custom-line" />
                    <p>Preencha os horários livres para sua saída e volta</p>
                    <DateField
                        label="Data"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <TimeField
                        label="Saída"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <TimeField
                        label="Retorno"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>

                {/* Seção de Alimentação */}
                <div className="food">
                    <h1>Alimentação<span className="required-asterisk">*</span></h1>
                    <hr className="custom-line" />
                    <p>Preencha caso você deseje receber recomendações de locais para alimentação na sua trilha.</p>
                    {alimentacaoOptions.map((option) => (
                        <Checkbox
                            label={option}
                            checked={selectedFoodOptions.includes(option)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedFoodOptions([...selectedFoodOptions, option]);
                                } else {
                                    setSelectedFoodOptions(selectedFoodOptions.filter((item) => item !== option));
                                }
                            }}
                        />
                    ))}
                </div>

                {/* Seção de Demais Informações */}
                <div className="demais">
                    <h1>Demais Informações<span className="required-asterisk">*</span></h1>
                    <hr className="custom-line" />
                    <p>Preencha as informações abaixo:</p>
                    <div className="dropdowns-checkboxes">
                        <p>Forma de transporte:</p>
                        {transportOptions.map((option) => (
                            <Checkbox
                                label={option}
                                checked={selectedTransportOptions.includes(option)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedTransportOptions([...selectedTransportOptions, option]);
                                    } else {
                                        setSelectedTransportOptions(selectedTransportOptions.filter((item) => item !== option));
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

                    <div className='subtitle-experience'>
                        <h2>Ambiente</h2>
                        <hr className="custom-line-subtitle" />
                    </div>

                    <Checkbox
                        label="Contato com a natureza"
                        checked={isNatural}
                        onChange={(e) => setIsNatural(e.target.checked)}
                    />

                    <Checkbox
                        label="Ambientes Silenciosos"
                        checked={isSilencioso}
                        onChange={(e) => setIsSilencioso(e.target.checked)}
                    />

                    <Checkbox
                        label="Espaços Relaxante"
                        checked={isRelaxante}
                        onChange={(e) => setIsRelaxante(e.target.checked)}
                    />

                    <Checkbox
                        label="Animado"
                        checked={isAnimado}
                        onChange={(e) => setIsAnimado(e.target.checked)}
                    />

                    <div className='subtitle-experience'>
                        <h2>Vibe</h2>
                        <hr className="custom-line-subtitle" />
                    </div>

                    <Checkbox
                        label="Romântico"
                        checked={isRomantico}
                        onChange={(e) => setIsRomantico(e.target.checked)}
                    />

                    <Checkbox
                        label="Esportivo"
                        checked={isEsportivo}
                        onChange={(e) => setIsEsportivo(e.target.checked)}
                    />

                    <Checkbox
                        label="Descontraído"
                        checked={isDescontraido}
                        onChange={(e) => setIsDescontraido(e.target.checked)}
                    />

                    <Checkbox
                        label="Cultural"
                        checked={isCultural}
                        onChange={(e) => setIsCultural(e.target.checked)}
                    />

                    <Checkbox
                        label="Familiar"
                        checked={isFamiliar}
                        onChange={(e) => setIsFamiliar(e.target.checked)}
                    />

                    <Checkbox
                        label="Festivo"
                        checked={isFestivo}
                        onChange={(e) => setIsFestivo(e.target.checked)}
                    />

                    <div className='subtitle-experience'>
                        <h2>Gastronomia</h2>
                        <hr className="custom-line-subtitle" />
                    </div>

                    <Checkbox
                        label="Pagode"
                        checked={isPagode}
                        onChange={(e) => setIsPagode(e.target.checked)}
                    />

                    <Checkbox
                        label="Restaurante"
                        checked={isRestaurante}
                        onChange={(e) => setIsRestaurante(e.target.checked)}
                    />

                    <Checkbox
                        label="Drinks"
                        checked={isDrinks}
                        onChange={(e) => setIsDrinks(e.target.checked)}
                    />

                    <Checkbox
                        label="Samba"
                        checked={isSamba}
                        onChange={(e) => setIsSamba(e.target.checked)}
                    />

                    <Checkbox
                        label="Comida Regional"
                        checked={isComidaRegional}
                        onChange={(e) => setIsComidaRegional(e.target.checked)}
                    />
                </div>
            </div>

            <Button label='Criar Agenda' onClick={handleSubmit} />
        </div>
    );
}

export default App;
