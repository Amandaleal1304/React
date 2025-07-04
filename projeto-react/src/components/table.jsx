
import { useContext } from 'react';
import ThemeContext from '../context/theme.js';

const Table = ({ titles, data }) => {
    const theme = useContext(ThemeContext);
    return (
        <table className={`data-table theme-${theme}`}>
            <thead>
                <tr>
                    {
                        titles.map((v, i) => {
                            return <th>{v}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((obj, i) => {
                        return (
                            <tr>
                                <td>{obj.id}</td>
                                <td>{obj.nome}</td>
                                <td>{obj.idade}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
};

export default Table;

