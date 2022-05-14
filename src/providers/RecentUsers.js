import React from 'react'

export const RecentUsersContext = React.createContext({})

export const RecentUsersProvider = (props) => {

    const recentSearched = ['jo caetano', 'pedro', 'gui felix']

    return (
        <RecentUsersContext.Provider value={[recentSearched]}>
            {props.childrem}
        </RecentUsersContext.Provider>
    )
}
