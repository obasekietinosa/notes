import React from 'react'
import './Footer.css'
import ContainerRow from 'Components/Utilities/Layout/Containers/ContainerRow'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <ContainerRow>
          <div className="col-12 text-center">
            <p>
              &copy; 2020, WeTalkSound
            </p>
          </div>
        </ContainerRow>
      </div>
    </footer>
  )
}