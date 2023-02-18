import React from 'react'
import styled from 'styled-components'
import HeaderMenu from './HeaderMenu'
import ListOfInvoices from './ListOfInvoices'

const Home = () => {
  return (
    <Container>
      <HeaderMenu />
      <ListOfInvoices />
    </Container>
  )
}

export default Home

const Container = styled.div`
  width: 100%;
`