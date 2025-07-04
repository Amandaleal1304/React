import React, { useState, useRef, useEffect } from 'react';

// Supondo que seus componentes e contexto estejam nesses caminhos
import List from './components/list.jsx';
import Select from './components/select.jsx';
import Table from './components/table.jsx';
import ThemeContext from './context/theme.js';
import ChangeTheme from './components/change_theme.jsx';
// Importe o CSS para que as classes sejam aplicadas
import './app.css'; 

// Dados que você já tinha
const titles = ['ID', 'NOME', 'IDADE'];
const clients = [
    { id: 1, nome: "Lucas", idade: 45 },
    { id: 2, nome: "Ana", idade: 78 },
    { id: 3, nome: "Bia", idade: 14 },
    { id: 4, nome: "Paulo", idade: 69 }
];

const App = () => {
    // Estado para controlar o tema, começando com 'dark'
    const [theme, setTheme] = useState('dark'); 
    const [felinos, setFelinos] = useState(['Gato', 'Leopardo']);
    const iptFelino = useRef(null);

    // Efeito para mudar a classe do <body> e o fundo da página
    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
    }, [theme]); // Roda toda vez que o 'theme' mudar

    function manipulaFormFelinos(e) {
        e.preventDefault();
        if (iptFelino.current.value) { // Evita adicionar item em branco
            setFelinos([...felinos, iptFelino.current.value]);
            iptFelino.current.value = ''; // Limpa o input
        }
    }

    // O Provider agora envolve TODA a aplicação
    return (
        <ThemeContext.Provider value={theme}>
            {/* Adicionamos a classe 'container' e a classe de tema aqui */}
            <div className={`container theme-${theme}`}>
                {/* O componente ChangeTheme pode agora usar o contexto se precisar */}
                <ChangeTheme theme={theme} setTheme={setTheme} />
                
                <main>
                    <section>
                        <h2>Felinos</h2>
                        {/* Formulário com as classes de estilo */}
                        <form onSubmit={manipulaFormFelinos} className="add-item-form">
                            <input ref={iptFelino} type="text" placeholder="Novo" />
                            <button type="submit" className="add-btn">+</button>
                        </form>
                        {/* Seu componente de lista */}
                        <List items={felinos} />
                    </section>
                    
                    <hr />

                    <section id="municipios-section">
                        <h2>Municípios</h2>
                        {/* Seu componente de select (precisará de estilo interno) */}
                        <Select />
                    </section>
                    
                    {/* A tabela agora herda o tema do Provider principal */}
                    <Table titles={titles} data={clients} />
                </main>
            </div>
        </ThemeContext.Provider>
    );
};

export default App;