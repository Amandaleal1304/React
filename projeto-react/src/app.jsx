import { useState, useRef } from 'react';

import List from './components/list.jsx';



const App = () => {

    // const [nome, setNome] = useState(valor_inicial);

    const [felinos, setFelinos] = useState(['Gato', 'Leopardo']);

    const iptFelino = useRef(null);



    function manipulaFormFelinos(e) {

        e.preventDefault();

        setFelinos([...felinos, iptFelino.current.value]);


        iptFelino.current.value = '';


    }



    return (

        <div>

            <h3>Felinos</h3>

            <form onSubmit={manipulaFormFelinos}>

                <label>Novo </label>

                <input ref={iptFelino} />

                <button>+</button>

            </form>

            <List items={felinos} />

        </div>

    );

};



export default App;