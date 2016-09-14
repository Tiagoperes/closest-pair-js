(function () {
  'use strict';

  const MIN = -100000,
        MAX = 100000;

  function getDistance(pair) {
    return Math.sqrt(Math.pow(pair[0].x - pair[1].x, 2) + Math.pow(pair[0].y - pair[1].y, 2));
  }

  function execute() {
    for (let i = 0; i < closestPair.testCases.length; i++) {
      var test = closestPair.testCases[i],
          startedAt = new Date().getTime(),
          solution = closestPair.divideAndConquer(test.points),
          timeTaken = new Date().getTime() - startedAt;

      console.log('---------------------------');
      console.log('Experiment ' + (i + 1));
      console.log('Input size: ' + test.points.length);
      console.log('Solution found: ' + JSON.stringify(solution) + '; distance: ' + getDistance(solution));
      console.log('Correct solution: ' + JSON.stringify(test.solution) + '; distance: ' + getDistance(test.solution));
      console.log('Time taken: ' + timeTaken + 'ms');
    }
  }

  function solveRandom(size, bf, printPoints) {
    var pgStartedAt = new Date().getTime(),
        points = closestPair.generateRandomArrayOfPoints({x: MIN, y: MIN}, {x: MAX, y: MAX}, size),
        bfStartedAt = new Date().getTime(),
        bfSolution = bf === false || closestPair.bruteForce(points),
        bfEndedAt = new Date().getTime(),
        dcSolution = closestPair.divideAndConquer(points),
        dcEndedAt = new Date().getTime();

    if (bf !== false) console.log('Brute force solution: ' + JSON.stringify(bfSolution) + '; distance: ' + getDistance(bfSolution));
    console.log('D&C solution: ' + JSON.stringify(dcSolution) + '; distance: ' + getDistance(dcSolution));
    console.log('Time taken for point generation: ' + (bfStartedAt - pgStartedAt) + 'ms');
    if (bf !== false) console.log('Time taken for brute force: ' + (bfEndedAt - bfStartedAt) + 'ms');
    console.log('Time taken for D&C: ' + (dcEndedAt - bfEndedAt) + 'ms');
    console.log('-----------------------------------------');
    if (printPoints) {
      console.log('points:');
      console.log(JSON.stringify(points));
      console.log('-----------------------------------------');
    }
  }

  window.closestPair = window.closestPair || {};
  window.closestPair.execute = execute;
  window.closestPair.solveRandom = solveRandom;
}());
