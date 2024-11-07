import styles from './Message.module.css'
import { useState,useEffect } from 'react'
import bus from '../../utils/bus'


function Message() {
    const [visbility, setVisibility] = useState(false)
    const [msg, setMsg] = useState('')
    const[type, setType] = useState('')

    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setVisibility(true)
            setMsg(message)
            setType(type)
            setTimeout(() => {
                setVisibility(false)
            }, 3000)
        })
    },[])

    return (
        visbility &&(
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )
    )
}

export default Message