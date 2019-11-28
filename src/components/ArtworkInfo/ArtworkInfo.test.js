import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ArtworkInfo from './ArtworkInfo'

const mockArtworkInfo = {
  id: '1',
  imageUrl: 'imageUrl',
  image_title: 'image_title'
}

describe('<ArtworkInfo />', () => {
  let container = {}
  beforeEach(() => {
    container = render(<ArtworkInfo artworkInfo={mockArtworkInfo} />)
  })

  test('Displays ArtworkInfo info passed from props correctly', () => {
    expect(
      container.queryByText(mockArtworkInfo.image_title)
    ).toBeInTheDocument()

    expect(container.getByTestId('artwork-image').getAttribute('src')).toBe(
      mockArtworkInfo.imageUrl
    )
  })
  test('Conditionally displays Image rights if present', () => {
    expect(container.queryByTestId('image-rights')).toBeNull()
    container.rerender(
      <ArtworkInfo
        artworkInfo={{ ...mockArtworkInfo, image_rights: 'image_rights' }}
      />
    )
    expect(
      container.queryByText('image_rights', { exact: false })
    ).toBeInTheDocument()
  })
})
