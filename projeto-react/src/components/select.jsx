import { useState, useRef, useEffect } from 'react';

const Select = () => {
    const [municipios, setMunicipios] = useState([]);
    const [uf, setUf] = useState('');
    const iptUf = useRef(null);
    
    function manipulaFormUf(e) {
        e.preventDefault();
        if (iptUf.current.value) {
            setUf(iptUf.current.value.toUpperCase());
        }       
    }

    useEffect(() => {
        if (uf === '') return;

        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        .then(res => {
            if (!res.ok) {
                setMunicipios([]);
                throw new Error('UF não encontrada ou inválida.');
            }
            return res.json();
        })
        .then(json => {
            setMunicipios(json);
        })
        .catch(error => console.error(error.message));
    }, [uf]);

    return (
        <div>
            <form onSubmit={manipulaFormUf} className="search-form">
                
                {/* MODIFICADO AQUI: 
                  Removemos o <div className="form-group"> que estava ao redor dos dois.
                  Agora a label, o input e o button estão no mesmo nível.
                */}
                <label htmlFor="uf-input">UF:</label>
                <input ref={iptUf} id="uf-input" type="text" placeholder="SP" />
                <button type="submit" className="search-btn">Buscar</button>
            
            </form>

            {municipios.length > 0 && (
                <select>
                    {municipios.map((municipio) => (
                        <option key={municipio.id}>{municipio.nome}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default Select;