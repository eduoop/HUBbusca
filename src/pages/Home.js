/* eslint-disable jsx-a11y/alt-text */
import styles from './Home.module.css'

import { useState, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {MdOutlinePersonOutline} from 'react-icons/md'
import {FiMapPin} from 'react-icons/fi'

export default function Home() {

    const [username, setUserName] = useState('')
    const [user, setUser] = useState({})
    const [recentUsers, setRecentUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
    }, [])

    const submit = (e) => {
        e.preventDefault();

        axios.get(`https://api.github.com/users/${username}`)
        .then(async (res) => {
            await setUser(res.data)
            await setRecentUsers(current => ([...current, res.data]))
            await localStorage.setItem("recentUsers", JSON.stringify(recentUsers))

        })
        .catch((err) => {
            console.log(err)
        })
    }

    const toRepos = () => {
        navigate('/user', {state: {user: user}})
    }

    const filterUsers = (userId) => {
        const filteredUsers = recentUsers.filter(function (el) {
            return el.id === userId
        })

        navigate('/user', {state: {user: filteredUsers[0]}})
    }


    return (
        <div className={styles.general_container}>
            <h1 className={styles.general_container_title}>HUBbusca</h1>
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
                <h1 className={styles.recent_searched}>Buscados recentemente:</h1>
                <div className={styles.recent_users}>
                            { recentUsers && recentUsers.map((user) => (
                                <div className={styles.infos}>
                                    <img onClick={() => filterUsers(user.id)} src={user.avatar_url} />
                                    { user.name && <h1> {user.name}</h1> }
                                    { user.login && <h2> <MdOutlinePersonOutline/> {user.login}</h2> }
                                    { user.location && <h2> <FiMapPin/> {user.location}</h2> }
                                </div>
                            ))}
                </div>
        </div>
    )
}