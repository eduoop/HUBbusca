/* eslint-disable jsx-a11y/alt-text */
import styles from "./Home.module.css";

import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MdOutlinePersonOutline } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { TiHeartFullOutline } from "react-icons/ti";
import { FiAlertTriangle } from "react-icons/fi";
export interface Users {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
export default function Home() {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState<Users>();
  const [recentUsers, setRecentUsers] = useState<Users[]>([]);
  const [makeWith, setMakeWith] = useState(true);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "") {
      setMessage("Preencha o campo");
      return false;
    }

    axios
      .get<Users>(`https://api.github.com/users/${username}`)
      .then(async (res) => {
        if (res.data.type === "User") {
          const auxRecentUsers = [...recentUsers!, res.data];

          setRecentUsers(auxRecentUsers!);
          localStorage.setItem("recentUsers", JSON.stringify(auxRecentUsers));
          setMakeWith(false);
          setMessage("");
        }
      })
      .catch((err) => {
        setMessage("Usuário não encontrado");
      });
  };

  const toRepos = () => {
    navigate("/user", { state: { user: user } });
  };

  const filterUsers = (userId: number) => {
    const filteredUsers = recentUsers!.filter(function (el: Users) {
      return el.id === userId;
    });

    navigate("/user", { state: { user: filteredUsers[0] } });
  };

  return (
    <div className={styles.general_container}>
      <h1 className={styles.general_container_title}>HUBbusca</h1>
      <div className={styles.main}>
        <div className={styles.app}>
          <form onSubmit={submit}>
            <input
              type="text"
              id="username"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              name="searchUser"
            />

            <button type="submit">Pesquisar usuário</button>
            {message && (
              <h3>
                {" "}
                {<FiAlertTriangle />} {message}
              </h3>
            )}
          </form>

          {user && (
            <main className={styles.main_container}>
              <img src={user.avatar_url} onClick={toRepos} />
              {user.name && <h1>{user.name}</h1>}
              {user.login && (
                <h2>
                  {" "}
                  <MdOutlinePersonOutline /> {user.login}
                </h2>
              )}
              {user.location && (
                <h2>
                  {" "}
                  <FiMapPin /> {user.location}
                </h2>
              )}
            </main>
          )}
        </div>
      </div>
      <h1 className={styles.recent_searched}>Buscados recentemente:</h1>
      <div className={styles.recent_users}>
        {recentUsers &&
          recentUsers.map((user) => (
            <div className={styles.infos}>
              <img onClick={() => filterUsers(user.id)} src={user.avatar_url} />
              {user.name && <h1> {user.name}</h1>}
              {user.login && (
                <h2>
                  {" "}
                  <MdOutlinePersonOutline /> {user.login}
                </h2>
              )}
              {user.location && (
                <h2>
                  {" "}
                  <FiMapPin /> {user.location}
                </h2>
              )}
            </div>
          ))}
      </div>
      {makeWith && <p>Feito com o {<TiHeartFullOutline />} para a Clicksoft</p>}
    </div>
  );
}