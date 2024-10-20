import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ImageCarousel from './components/Carousel';
import Banner from './components/Banner';
import DateField from './components/DateField';
import TimeField from './components/TimeField';
import Dropdown from './components/Dropdown';
import Checkbox from './components/Checkbox';
import Button from './components/Button';

import './App.css';

function App() {
    const placePickerRef = useRef(null);
    const [value, setValue] = useState(250); // Valor inicial do slider
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // Estados para Dropdowns e Checkboxes
    const [transport, setTransport] = useState('');
    const [alimentacao, setAlimentacao] = useState('');
    const [isAccessibility, setAccessibility] = useState(false);
    const [isPetFriendly, setIsPetFriendly] = useState(false);
    const [isChildFriendly, setIsChildFriendly] = useState(false);

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

    useEffect(() => {
        // Adiciona um listener para capturar o valor do place picker
        if (placePickerRef.current) {
            placePickerRef.current.addEventListener('gmpx-place-changed', (event) => {
                const place = event.detail.result;
                console.log('Endereço selecionado:', place);
                // Aqui você pode salvar o valor do place no estado ou enviar para sua API
            });
        }
    }, []);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="App">
            <Header />
            <ImageCarousel />
            <Banner />
            <div id="forms">
                {/* Seção de Local */}
                <div className="locate-section">
                    <h1>Local</h1>
                    <hr className="custom-line" />
                    <p>Preencha com o local de saída para seu passeio</p>
                    <gmpx-place-picker
                        ref={placePickerRef}
                        placeholder="Digite um endereço"
                    ></gmpx-place-picker>
                </div>

                {/* Seção de Faixa de Custo */}
                <div className="cost-range-section">
                    <h1>Faixa de Custo</h1>
                    <hr className="custom-line" />
                    <p>Preencha com o valor máximo que deseja gastar por pessoa</p>

                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={value}
                        onChange={handleChange}
                        className="slider"
                    />
                    <p>Valor selecionado: R$ {value === '500' ? '500+' : value}</p>
                </div>

                {/* Seção de Horários */}
                <div className="time">
                    <h1>Horários</h1>
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

                {/* Seção de Demais Informações */}
                <div className="demais">
                    <h1>Demais Informações</h1>
                    <hr className="custom-line" />
                    <p>Preencha as informações abaixo:</p>
                    <div className="dropdowns-checkboxes">
                        {/* Dropdown para transporte */}
                        <Dropdown
                            label="Forma de transporte:"
                            options={transportOptions}
                            value={transport}
                            onChange={(e) => setTransport(e.target.value)}
                        />

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


                <div className="food">
                    <h1>Alimentação</h1>
                    <hr className="custom-line" />
                    <p>Preencha as informações de alimentação:</p>
                    <Dropdown
                            label="Refeições:"
                            options={alimentacaoOptions}
                            value={alimentacao}
                            onChange={(e) => setAlimentacao(e.target.value)}
                        />
                </div>




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
                            onChange={(e) => setIsComidaRegional(e.target.checked)}/>
                </div>



            </div>

            <Button label='Criar Agenda'/>
        </div>
    );
}

export default App;