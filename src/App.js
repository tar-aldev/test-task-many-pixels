import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import { client } from 'graphql/apollo-init'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import PopularArtists from './pages/PopularArtists/PopularArtists'
import styled from 'styled-components'
import ArtistProfile from 'pages/ArtistProfile/ArtistProfile'

const Container = styled.div`
  padding: 1rem;
`

function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Router>
          <Switch>
            <Route path="/popular-artists">
              <PopularArtists />
            </Route>
            <Route path="/artist/:artistId">
              <ArtistProfile />
            </Route>
            <Redirect to="/popular-artists" />
          </Switch>
        </Router>
      </Container>
    </ApolloProvider>
  )
}

export default App
