import React from 'react'
import styled from 'styled-components'
import GraphPieChart from './GraphPieChart'

const Graphic = () => {
  return (
    <Container>
      <GraphPieChart />
    </Container>
  )
}

export default Graphic

const Container = styled.div`
  padding-left: 92px;
  width: 100%;
`