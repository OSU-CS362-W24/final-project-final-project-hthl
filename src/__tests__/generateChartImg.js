const generate = require('../lib/generateChartImg');

  test('line chart generated with one input', async function () {
    const type = 'line';
    const data = [{ x: 0, y: 0 }];
    const [xLabel, yLabel] = ['x', 'y'];
    const title = 'Line chart';
    const color = '#fef65b'
    const blob = await generate(type, data, xLabel, yLabel, title, color);
    console.log(blob);
    expect(blob).not.toHaveLength(0);
  });
  test('line chart generated without title', async function () {
    const type = 'line';
    const data = [{ x: 0, y: 0 }, {x: 10, y : 10}];
    const [xLabel, yLabel] = ['x', 'y'];
    const title = null;
    const color = '#fef65b'
    const blob = await generate(type, data, xLabel, yLabel, title, color);
    console.log(blob);
    expect(blob).not.toHaveLength(0);
  });
  test('scatter chart generated without color input', async function () {
    const type = 'scatter';
    const data = [{ x: 0, y: 0 }, {x: 10, y : 10}];
    const [xLabel, yLabel] = ['x', 'y'];
    const title = 'scatter chart';
    const color = null;
    const blob = await generate(type, data, xLabel, yLabel, title, color);
    console.log(blob);
    expect(blob).not.toHaveLength(0);
  });
  test('scatter chart generated with positive and negative inputs',async function(){
    const type = 'scatter';
    const data = [{ x: 0, y: 0 }, {x:-2, y : -10}, {x: 10, y : 5}];
    const [xLabel, yLabel] = ['x', 'y'];
    const title = 'Scatter'
    const color = '#fef65b'
    const blob = await generate(type, data, xLabel, yLabel, title, color);
    console.log(blob);
    expect(blob).not.toHaveLength(0);
  })
  test('scatter chart generated with positive and negative inputs',async function(){
    const type = 'scatter';
    const data = [{ x: 0, y: 0 }, {x:-2, y : -10}, {x: 10, y : 5}];
    const [xLabel, yLabel] = ['x', 'y'];
    const title = 'Scatter'
    const color = '#fef65b'
    const blob = await generate(type, data, xLabel, yLabel, title, color);
    console.log(blob);
    expect(blob).not.toHaveLength(0);
  });
  test('scatter chart generated with decimal input',async function(){
    const type = 'scatter';
    const data = [{ x: 2.3, y: 1.2 }, {x:-2.2, y : -10.3}, {x: 10.2, y : 5.4}];
    const [xLabel, yLabel] = ['x', 'y'];
    const title = 'Scatter'
    const color = '#fef65b'
    const blob = await generate(type, data, xLabel, yLabel, title, color);
    console.log(blob);
    expect(blob).not.toHaveLength(0);
  });
  test('bar chart generated with decimal input',async function(){
    const type = 'bar';
    const data = [{ x: 2.3, y: 1.2 }, {x:-2.2, y : -10.3}, {x: -10.2, y : 5.4}];
    const [xLabel, yLabel] = ['x', 'y'];
    const title = 'bar'
    const color = '#fef65b'
    const blob = await generate(type, data, xLabel, yLabel, title, color);
    console.log(blob);
    expect(blob).not.toHaveLength(0);
  });


