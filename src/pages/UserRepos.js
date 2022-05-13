import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './UserRepos.module.css'

const User = () => {

    const [repos, setRepos] = useState([])

    const location = useLocation()
    let user = {}
    if(location.state) {
      user = location.state.user    
    }

    function hi() {
      console.log(user)
    }

    hi()

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

      <div className={styles.main}>
        <h1>{user.login}</h1>
      </div>

      {/* { repos && repos.map((repo) => (
        <p key={repo.id}>{repo.name}</p>
      )) } */}
    </div>
  )
}

export default User