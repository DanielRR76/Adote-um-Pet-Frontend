import styles from './Footer.module.css'

function Footer({theme}) {
    return (
        
        <footer className={`${styles.footer} ${theme === 'light' ? styles.light : styles.dark}`}>
            <p><span className="bold">Get a Pet</span> &copy; 2024</p>
        </footer>
    )
    }
    
    export default Footer