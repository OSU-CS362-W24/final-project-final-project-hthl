const pointSorter = require('../lib/sortPoints.js')
2

//Test for points already sorted
test ('Points already in sorted order', function(){

    //arrange
    const points = 
        [
            { x: 1, y: 2 },
            { x: 50, y: 20 },
            { x: 500, y: 20 }
        ]
    

    const sortedPoints = 
        [
            { x: 1, y: 2 },
            { x: 50, y: 20 },
            { x: 500, y: 20 }
        ]
    
    
    //act
    const result = pointSorter(points)
    
    
    //assert
    expect(result).toEqual(sortedPoints)
    }
    )
test('unsorted points', function(){
    //arrange
    const points = 
        [
            { x: 50, y: 20 },
            { x: 1, y: 2 },
            { x: 500, y: 20 }
        ]
    

    const sortedPoints = 
        [
            { x: 1, y: 2 },
            { x: 50, y: 20 },
            { x: 500, y: 20 }
        ]
    
    
    //act
    const result = pointSorter(points)
    
    
    //assert
    expect(result).toEqual(sortedPoints)
})


test('many unsorted points', function(){
    //arrange
    const points = 
        [
            { x: 50, y: 20 },
            { x: 1, y: 2 },
            { x: 500, y: 20 },
            { x: 21, y: 20 },
            { x: 2400, y: 20 },
            { x: 900, y: 20 },
            { x: 20, y: 20 },
            { x: 587, y: 20 },
            { x: 190, y: 20 },
            { x: 670, y: 20 },
            { x: 400, y: 20 },
            { x: 420, y: 20 },
            { x: 200, y: 20 },
            { x: 100, y: 20 },
            { x: 500, y: 20 },
            { x: 50, y: 20 },
            { x: 500, y: 20 },
            { x: 0, y: 20 }

        ]
    

    const sortedPoints = 
    [
        { x: 0, y: 20 },   { x: 1, y: 2 },
        { x: 20, y: 20 },  { x: 21, y: 20 },
        { x: 50, y: 20 },  { x: 50, y: 20 },
        { x: 100, y: 20 }, { x: 190, y: 20 },
        { x: 200, y: 20 }, { x: 400, y: 20 },
        { x: 420, y: 20 }, { x: 500, y: 20 },
        { x: 500, y: 20 }, { x: 500, y: 20 },
        { x: 587, y: 20 }, { x: 670, y: 20 },
        { x: 900, y: 20 }, { x: 2400, y: 20 }
      ]

    
    
    //act
    const result = pointSorter(points)
    
    //assert
    expect(result).toEqual(sortedPoints)
})



test('many unsorted points including negative values', function(){
    //arrange
    const points = 
        [
            { x: 50, y: 20 },
            { x: 1, y: 2 },
            { x: -500, y: 20 },
            { x: 21, y: 20 },
            { x: 2400, y: 20 },
            { x: 900, y: 20 },
            { x: -20, y: 20 },
            { x: 587, y: 20 },
            { x: 190, y: 20 },
            { x: 670, y: 20 },
            { x: -400, y: 20 },
            { x: 420, y: 20 },
            { x: 200, y: 20 },
            { x: -100, y: 20 },
            { x: 500, y: 20 },
            { x: -50, y: 20 },
            { x: 500, y: 20 },
            { x: 0, y: 20 }

        ]
    

    const sortedPoints = 
    [
        { x: -500, y: 20 }, { x: -400, y: 20 },
        { x: -100, y: 20 }, { x: -50, y: 20 },
        { x: -20, y: 20 },  { x: 0, y: 20 },
        { x: 1, y: 2 },     { x: 21, y: 20 },
        { x: 50, y: 20 },   { x: 190, y: 20 },
        { x: 200, y: 20 },  { x: 420, y: 20 },
        { x: 500, y: 20 },  { x: 500, y: 20 },
        { x: 587, y: 20 },  { x: 670, y: 20 },
        { x: 900, y: 20 },  { x: 2400, y: 20 }
      ]

    //act
    const result = pointSorter(points)
  
    //assert
    expect(result).toEqual(sortedPoints)
})