function piece(position, type, clickHandler) {
  return {
    position, 
    pattern: getPattern(type),
    type,
    onClick: ()=>clickHandler({position, type})
  }
    
}

function getPattern(pieceType){
  return {
    'knight':'knight-pat',
    'archer':'archer-pat'
  }[pieceType]
}

export default piece