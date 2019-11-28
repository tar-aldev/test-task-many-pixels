import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  & > img {
    width: 100%;
    vertical-align: top;
  }
`

const ArtworkInfo = ({ artworkInfo }) => {
  const { id, imageUrl, image_title, image_rights } = artworkInfo

  return (
    <Wrapper>
      <img data-testid="artwork-image" src={imageUrl} alt="" />
      <p>{image_title}</p>
      {image_rights && <p data-testid="image-rights">Rights: {image_rights}</p>}
    </Wrapper>
  )
}

ArtworkInfo.propTypes = {
  artworkInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    image_title: PropTypes.string.isRequired,
    image_rights: PropTypes.string
  })
}

export default ArtworkInfo
