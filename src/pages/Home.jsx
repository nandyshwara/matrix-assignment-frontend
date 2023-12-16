import React from 'react'
import CandidateTable from '../components/candidateTable/CandidateTable'
import Navbar from '../components/Navbar/Navbar'

function Home({ user, setRender, setUser }) {
  return (
    <div>
        <Navbar user={user} setRender={setRender} setUser={setUser}/>
        <CandidateTable/>
    </div>
  )
}

export default Home