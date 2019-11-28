import gql from 'graphql-tag'

export const GET_POPULAR_ARTISTS = gql`
  query GetPopularArtists {
    popular_artists {
      artists {
        id
        name
        formatted_nationality_and_birthday
        formatted_artworks_count
        imageUrl
      }
    }
  }
`

export const GET_ARTIST_DETAILS = gql`
  query GetPopularArtists($id: String!) {
    artist(id: $id) {
      id
      name
      bio
      formatted_artworks_count
      artworks {
        id
        imageUrl
        image_title
        image_rights
      }
    }
  }
`
