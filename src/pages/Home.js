/* eslint-disable jsx-a11y/alt-text */
import styles from './Home.module.css'
import Loader from "../layouts/Loader"

import { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {MdOutlinePersonOutline} from 'react-icons/md'
import {FiMapPin} from 'react-icons/fi'

export default function Home() {

    const [username, setUserName] = useState('')
    const [user, setUser] = useState({})
    const [recentUsers, setRecentUsers] = useState([])
    const [removeLoading, setRemoveLoading] = useState(true)
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault();
        setRemoveLoading(false)

        axios.get(`https://api.github.com/users/${username}`)
        .then(async (res) => {
            await setUser(res.data)
            if(recentUsers.name === res.data.name) {
                console.log('ja existe')
            }
            setRecentUsers(current => ([...current, res.data]))
            if(res.data.name) {
                localStorage.setItem(`Usuario: ${res.data.name}`, res.data.name)
            }
        })
        .catch((err) => {
            console.log(err)
        })
        setRemoveLoading(true)
        console.log(user)
    }

    const toRepos = () => {
        navigate('/user', {state: {user: user}})
    }


    return (
        <div className={styles.general_container}>
            <h1>HUBbusca</h1>
            <div className={styles.main}>
                <div className={styles.app}>
                    <form>
                        <input 
                        type="text" 
                        id='username'
                        onChange={e => setUserName(e.target.value)} 
                        placeholder="Username" 
                        name="searchUser"/>

                        <button onClick={submit}>Pesquisar usuário</button>
                        {!removeLoading && <Loader/>}
                    </form>

                    {user && 
                        <main className={styles.main_container}>
                            <img src={user.avatar_url} onClick={toRepos}/>
                            {user.name && <h1>{user.name}</h1>}
                            {user.login && <h2> <MdOutlinePersonOutline/> {user.login}</h2>}
                            {user.location && <h2> <FiMapPin/> {user.location}</h2>}
                        </main>
                    }
                </div>
            </div>
                <h1>Buscados recentemente:</h1>
                <div className={styles.recent_users}>
                            { recentUsers.map((user) => (
                                <div className={styles.infos}>
                                    <img onClick={toRepos} src={user.avatar_url} />
                                    { user.name && <h1> {user.name}</h1> }
                                    { user.login && <h2> <MdOutlinePersonOutline/> {user.login}</h2> }
                                    { user.location && <h2> <FiMapPin/> {user.location}</h2> }
                                </div>
                            )) }
                </div>
        </div>
    )
}