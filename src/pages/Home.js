/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import styles from './Home.module.css'
import Loader from "../layouts/Loader"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {

    const [username, setUserName] = useState('')
    const [user, setUser] = useState({})
    const [recentUsers, setRecentUsers] = ([])
    const [removeLoading, setRemoveLoading] = useState(true)
    const navigate = useNavigate()


    const submit = (e) => {
        e.preventDefault();
        setRemoveLoading(false)

        axios.get(`https://api.github.com/users/${username}`)
        .then(async (res) => {
            await setUser(res.data)
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
                        <p>{user.name}</p>
                        <p>{user.login}</p>
                        <p>{user.location}</p>
                    </main>
                }
            </div>
       </div>
    )
}