import styles from './Loader.module.css'
import loading from '../../src/images/loading.svg'

const Loader = () => {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt=""/>
        </div>
    )
}

export default Loader