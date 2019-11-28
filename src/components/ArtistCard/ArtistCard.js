import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Card = styled.div`
  border: none;
  border-radius: 6px;
  box-shadow: 0 4px 8px 0 rgba(66, 108, 245, 0.2);
  color: #426cf5;
  display: flex;
  justify-content: space-between;
  height: 200px;
  &:hover {
    cursor: pointer;
  }
`
const CardTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
`

const ListItem = styled.p`
  margin-bottom: 0.2em;
`
const CardImage = styled.div`
  border-radius: inherit;
  & > img {
    border-radius: inherit;
    max-height: 200px;
    max-width: 200px;
  }
`

const CardDescription = styled.div`
  padding: 0.2em;
`

const ArtistCard = ({ artistInfo, onArtistSelected }) => {
  const handleArtistSelected = () => {
    onArtistSelected(artistInfo.id)
  }
  return (
    <Card data-testid="card" onClick={handleArtistSelected}>
      <CardDescription>
        <CardTitle>{artistInfo.name}</CardTitle>
        <ListItem>{artistInfo.formatted_nationality_and_birthday}</ListItem>
        <ListItem>{artistInfo.formatted_artworks_count}</ListItem>
      </CardDescription>
      <CardImage>
        <img
          data-testid="card-image"
          src={artistInfo.imageUrl}
          alt="example-art-work"
        />
      </CardImage>
    </Card>
  )
}

ArtistCard.propTypes = {
  artistInfo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    formatted_nationality_and_birthday: PropTypes.string,
    formatted_artworks_count: PropTypes.string,
    imageUrl: PropTypes.string
  }),
  onArtistSelected: PropTypes.func.isRequired
}

export default ArtistCard
