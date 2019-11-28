import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_POPULAR_ARTISTS } from 'graphql/artists/queries'
import ArtistCard from 'components/ArtistCard/ArtistCard'
import styled from 'styled-components'

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`

const PopularArtists = () => {
  const { data: popularArtistsData, loading, error } = useQuery(
    GET_POPULAR_ARTISTS
  )
  const history = useHistory()

  const onArtistSelected = artistId => {
    history.push(`artist/${artistId}`)
  }

  if (loading) {
    return <p data-testid="loading-indicator">Loading...</p>
  }

  return (
    <List>
      {popularArtistsData.popular_artists.artists.map(artistInfo => (
        <ArtistCard
          key={artistInfo.id}
          artistInfo={artistInfo}
          onArtistSelected={onArtistSelected}
        />
      ))}
    </List>
  )
}

PopularArtists.propTypes = {}

export default PopularArtists
