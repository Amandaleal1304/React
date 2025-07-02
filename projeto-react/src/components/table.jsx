
const Table = ({ titles, data }) => {

    return (

        <table  style={{ border: '0.2px solid black', borderCollapse: 'collapse', width: '70%', margin: 'auto' }} >

            <thead>

                <tr>

                    {

                        titles.map((v, i) => {

                            return <th style={styles.th}>{v}</th>

                        })

                    }

                </tr>

            </thead>

            <tbody>

                {

                    data.map((obj, i) => {

                        return (

                            <tr style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>

                                <td style={styles.td}>{obj.id}</td>

                                <td style={styles.td}>{obj.nome}</td>

                                <td style={styles.td}>{obj.idade}</td>

                            </tr>

                        );

                    })

                }

            </tbody>

        </table>

    );

};

const styles = {

    th: {

        padding: '10px',

        textAlign: 'center',

        border: '0.2px solid black',

        fontWeight: 'bold'

    },

    td: {

        padding: '10px',

        textAlign: 'center',

        border: '0.2px solid black'

    },

};

export default Table;

