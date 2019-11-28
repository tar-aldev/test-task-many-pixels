import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_ARTIST_DETAILS } from 'graphql/artists/queries'
import styled from 'styled-components'
import ArtworkInfo from 'components/ArtworkInfo/ArtworkInfo'

const ProfileContainer = styled.div`
  padding: 1rem;
  text-align: center;
`
const ImagesContainer = styled.div`
  display: grid;
  gap: 8px 8px;

  @media (min-width: 100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const Button = styled.button`
  text-decoration: none;
  border: 2px solid #426cf5;
  color: #426cf5;
  padding: 8px 16px;
  font-size: 1.2em;
  background-color: transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.6s;
  &:hover {
    color: #ffffff;
    background-color: #426cf5;
  }
`
const Navigation = styled.div`
  display: flex;
`

const ArtistProfile = () => {
  const { artistId } = useParams()
  const history = useHistory()

  const { data: selectedArtistData, loading, error } = useQuery(
    GET_ARTIST_DETAILS,
    {
      variables: {
        id: artistId
      }
    }
  )
  const onGoBack = () => {
    history.push('/popular-artists')
  }

  return (
    <ProfileContainer>
      <Navigation>
        <Button onClick={onGoBack}>Back to artists</Button>
      </Navigation>

      {loading && <p data-testid="loading-indicator">Loading....</p>}
      {selectedArtistData && (
        <>
          <h4>{selectedArtistData.artist.name}</h4>
          <h6>{selectedArtistData.artist.bio}</h6>

          <ImagesContainer>
            {selectedArtistData.artist.artworks.map(artwork => (
              <ArtworkInfo key={artwork.id} artworkInfo={artwork} />
            ))}
          </ImagesContainer>
        </>
      )}
    </ProfileContainer>
  )
}

export default ArtistProfile
