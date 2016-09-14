(function () {
  'use strict';

  function randomizePoint(min, max) {
    return {
      x: _.random(min.x, max.x),
      y: _.random(min.y, max.y)
    }
  }

  function generateRandomArrayOfPoints(min, max, numberOfPoints) {
    var points = [],
        i = 0;

    while (i < numberOfPoints) {
      let p = randomizePoint(min, max);
      if (!_.find(points, p)) {
        points.push(p);
        i++;
      }
    }

    return points;
  }

  function generateTestCases(min, max, numberOfPoints, numberOfTestCases) {
    var testCases = [];
    for (let i = 0; i < numberOfTestCases; i++) {
      let pointArray = generateRandomArrayOfPoints(min, max, numberOfPoints);
      let solution = closestPair.bruteForce(pointArray);
      testCases.push({points: pointArray, solution: solution});
    }
    return testCases;
  }

  function testCasesAsJSON(min, max, numberOfPoints, numberOfTestCases) {
    var tcases = generateTestCases(min, max, numberOfPoints, numberOfTestCases);
    console.log(JSON.stringify(tcases));
  }

  window.closestPair = window.closestPair || {};
  closestPair.testCasesAsJSON = testCasesAsJSON;
  closestPair.generateRandomArrayOfPoints = generateRandomArrayOfPoints;
}());
