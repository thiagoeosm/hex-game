import React, { useState, useEffect } from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';

const initialPieces = [
  {position:{q: 0, r:1, s:-1},pattern:'knight-pat',type:'piece'},
  {position:{q: 0, r:-1, s:1},pattern:'knight-pat',type:'piece'},
]

function GridStateGenerator() {
  const [clicked, setClicked] = useState({});
  const [lastClicked, setLastClicked] = useState({});
  const [hexagons, setHexagons] = useState(GridGenerator.hexagon(3)
    .map(hex => {return {position:{q:hex.q, r:hex.r, s:hex.s}, pattern:'', type:'ground', onClick:() => {
        setClicked({position: {q:hex.q, r:hex.r, s:hex.s}, type:'ground'})
      }
    }})
    .filter(hex => !isOccupied(hex.position, initialPieces.map(piece => piece.position)))
    .concat(initialPieces.map(piece => {return {...piece, onClick:() => {
      setClicked({position: {q: piece.position.q, r:piece.position.r, s:piece.position.s}, type:'piece'})
    }}}))
    
  )

  useEffect(() => {
    if(lastClicked.type=='piece' && clicked.type=='ground') movePiece()
    setLastClicked(clicked)
  }, [clicked]);

  useEffect(() => {
    console.log(lastClicked)
  }, [lastClicked]);

  function isOccupied(hexPosition, positions){
    return !!positions.find(position => hexPosition.q==position.q && hexPosition.r==position.r && hexPosition.s==position.s)
  }

  function isSamePosition(a, b){
    return (a.q==b.q && a.r==b.r && a.s==b.s)
  }

  function movePiece(){
    setHexagons(hexagons.map(hex => {
      if(isSamePosition(hex.position, clicked.position)){
        return {...hex, type:'piece', pattern:'knight-pat', onClick:()=>{setClicked({...hex, type:'piece'})}}
      }
      if(isSamePosition(hex.position, lastClicked.position)){
        return {...hex, type:'ground', pattern:'', onClick:()=>{setClicked({...hex, type:'ground'})}}
      }
      return hex
    }))
  }


  return (
      <HexGrid width={1200} height={1000}>
      <Layout size={{ x: 7, y: 7 }}>
        { hexagons.map((hex, i) => <Hexagon key={i} q={hex.position.q} r={hex.position.r} s={hex.position.s} fill={hex.pattern} onClick={hex.onClick}/>) }
      </Layout>
      <Pattern id="knight-pat" link="data:image/png;base64,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" size={{x:7, y:7}} />
    </HexGrid>
  );
}

export default GridStateGenerator