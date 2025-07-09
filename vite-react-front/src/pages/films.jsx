import { useEffect, useState } from "react";
import { createOrEditFilm, deleteFilm, listFilms } from "../data_access/film_access.js";
import { listGenders } from "../data_access/gender_access.js";
import { listDirectors } from "../data_access/director_access.js";

const Films = () => {
    const [films, setFilms] = useState([]);
    const [allGenders, setAllGenders] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [action, setAction] = useState('Criar');
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        listFilms()
            .then(films => setFilms(films));

        listGenders()
            .then(genders => {
                genders = genders.map(gender => {
                    gender.checked = false;
                    return gender;
                });
                setAllGenders(genders)
            });

        listDirectors()
            .then(directors => setDirectors(directors));
    }, []);

    function handleSubmitFilm(e) {
        e.preventDefault();
        const data = {
            id: id,
            title: title,
            description: description,
            year: year,
            DirectorId: director,
            genders: allGenders.filter(gender => gender.checked).map(gender => gender.id)
        };

        createOrEditFilm(data)
            .then((res) => {
                alert(res.message);
                listFilms()
                    .then(films => setFilms(films));
            });
        setId(null);
        setTitle('');
        setDescription('');
        setYear('');
        setDirector('');
        setAllGenders(allGenders.map((gender, index) => { gender.checked = false; return gender; }));
        setAction('Criar');
    }

    function handleEditButton(e) {
        const filmId = e.target.dataset.id;
        const film = films.find(f => f.id == filmId);
        if (film) {
            setId(film.id);
            setTitle(film.title);
            setDescription(film.description);
            setYear(film.year);
            setDirector(film.DirectorId);
            allGenders.forEach(gender => {
                gender.checked = film.Genders.some(a => a.id == gender.id);
            });
            setAllGenders(allGenders.map(v => v));
            setAction('Editar');
        }
    }
    function handleDelButton(e) {
        deleteFilm(e.target.dataset.id)
            .then((res) => {
                alert(res.message);
                listFilms()
                    .then(films => setFilms(films));
            });
    }

    function toggleSelectGenders(id) {
        const index = allGenders.findIndex((gender) => gender.id == id);
        allGenders[index].checked = !allGenders[index].checked;
        setAllGenders(allGenders.map(v => v));
    }

    return (
        <div>
            <h1>Filmes</h1>
            <form onSubmit={handleSubmitFilm}>
                <label>Title</label><br />
                <input type="text" value={title} required
                    onInput={e => setTitle(e.target.value)} /><br />
                <label >Description</label><br />
                <input type="text" value={description} required
                    onInput={e => setDescription(e.target.value)} /><br />
                <label>Year</label><br />
                <input type="number" value={year} required
                    onInput={e => setYear(e.target.value)} /><br />
                <label>Director</label><br />
                <select value={director} required
                    onChange={e => setDirector(e.target.value)}
                >
                    {
                        directors.map((director, index) => {
                            return (
                                <option key={index} value={director.id}>
                                    {director.name}
                                </option>
                            );
                        })
                    }
                </select>
                <br />
                <label>Genders</label><br />
                {
                    allGenders.map((gender, index) => {
                        return (
                            <div key={gender.id}>
                                <label>
                                    <input type="checkbox" value={gender.id}
                                        checked={gender.checked}
                                        onChange={e => toggleSelectGenders(gender.id)} />
                                    {gender.name}
                                </label>
                            </div>
                        );
                    })
                }
                <button>{action}</button >
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Year</th>
                        <th>Director</th>
                        <th>Genders</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        films.map((v, i) => {
                            return (
                                <tr key={i}>
                                    <td>{v.title}</td>
                                    <td>{v.description}</td>
                                    <td>{v.year}</td>
                                    <td>{v.Director.name}</td>
                                    <td>
                                        {
                                            v.Genders.map((v, i) => {
                                                return (
                                                    <p key={i}>{v.name}</p>
                                                );
                                            })
                                        }
                                    </td>
                                    <td>
                                        <button data-id={v.id} onClick={handleEditButton}>Edit</button>
                                        <button data-id={v.id} onClick={handleDelButton}>Del</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Films;