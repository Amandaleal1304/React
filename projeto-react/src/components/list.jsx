import styles from './list.module.css';
const List = (props) => {
    return(
        <ul>
            {
                props.items.map((v, i) => {
                    return <li className={styles.li}>{v}</li>;
            })
                
            }
        </ul>
    );
};

export default List;