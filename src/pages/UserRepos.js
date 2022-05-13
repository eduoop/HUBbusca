/* eslint-disable react/jsx-no-target-blank */
import axios from 'axios'
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './UserRepos.module.css'

import {AiOutlineCloseCircle} from 'react-icons/ai'
import {MdOutlinePersonOutline} from 'react-icons/md'
import {FiMapPin} from 'react-icons/fi'

const User = () => {

    const [repos, setRepos] = useState([])

    const location = useLocation()
    let user = {}
    if(location.state) {
      user = location.state.user    
    }

    useEffect(() => {
        axios.get(user.repos_url)
        .then((res) => {
            console.log(res.data)
            setRepos(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link to="/" className={styles.toHome}><AiOutlineCloseCircle className={styles.back_icon}/></Link>

        <div className={styles.image_container}>
          <img src={user.avatar_url} alt='user'></img>
        </div>

        {user.name &&  <h1>{user.name}</h1>}
        <div className={styles.infos}>
          <h2> <MdOutlinePersonOutline className={styles.icons}/> {user.login}</h2>
          {user.location && <h2> <FiMapPin className={styles.icons}/> {user.location}</h2>}
          <h3>id: {user.id}</h3>
        </div>

        <div className={styles.follow}>
          <p>Seguidores: {user.followers}</p>
          <p>Seguindo: {user.following}</p>
        </div>
      </main>

      <section className={styles.section_container}>
        <h2>Repositórios: ({user.public_repos})</h2>

        <div className={styles.repos_container}>
          { repos && repos.map((repo) => (
          <a className={styles.repos} href={`https://github.com/${user.login}/${repo.name}`} target='_blank'>
            <ul>
                <li key={repo.id}>{repo.name}</li>
            </ul>
            {repo.description && <h2>{repo.description}</h2>}
            {repo.language ? <p>{repo.language}</p> : <p>Vazio</p>}
            {repo.created_at && <span>{repo.created_at}</span>}
          </a>
        )) }
        </div>
      </section>
      {/* { repos && repos.map((repo) => (
        <p key={repo.id}>{repo.name}</p>
      )) } */}
    </div>
  )
}

export default User