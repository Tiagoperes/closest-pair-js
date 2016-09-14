(function () {
  'use strict';

  // O(n)
  function getPointsOrderedByY(minX, maxX, allPointsOrderedByY) {
    return _.filter(allPointsOrderedByY, function (p) {
      return p.x >= minX && p.x < maxX;
    });
  }

  // O(2n) = O(n)
  function divide(points) {
    var half = _.floor(points.orderedByX.length / 2),
        leftByX = _.slice(points.orderedByX, 0, half),
        leftByY = getPointsOrderedByY(-Infinity, points.orderedByX[half].x, points.orderedByY), // O(n)
        rightByX = _.slice(points.orderedByX, half),
        rightByY = getPointsOrderedByY(points.orderedByX[half].x, Infinity, points.orderedByY); // O(n)

    return {
      left: {orderedByX: leftByX, orderedByY: leftByY},
      right: {orderedByX: rightByX, orderedByY: rightByY}
    };
  }

  function baseCase(points) {
    var combinations;

    if (points.length === 2) {
      return points;
    }

    combinations = [
      [points[0], points[1]],
      [points[0], points[2]],
      [points[1], points[2]]
    ];

    return _.minBy(combinations, getDistance);
  }

  function getDistance(pair) {
    return Math.sqrt(Math.pow(pair[0].x - pair[1].x, 2) + Math.pow(pair[0].y - pair[1].y, 2));
  }

  function getCandidates(orderedByY, validXInterval) {
    return _.filter(orderedByY, function (p) {
      return (p.x > validXInterval.min) && (p.x < validXInterval.max);
    });
  }

  // O(n * 15) = O(n)
  function getClosestPairInIntersection(points) {
    var minDist = Infinity,
        closestPair;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length && j - i <= 15; j++) {
        let distance = getDistance([points[i], points[j]]);
        if (distance < minDist) {
          minDist = distance;
          closestPair = [points[i], points[j]];
        }
      }
    }

    return closestPair;
  }

  // O(3n) = O(n)
  function combine(left, right, closestOnLeft, closestOnRight) {
    var closestPair = _.minBy([closestOnLeft, closestOnRight], getDistance),
        minDist = getDistance(closestPair),
        allOrderedByY = _.mergeArrays(left.orderedByY, right.orderedByY, 'y'), // O(n)
        frontierPoint = _.last(left.orderedByX),
        xInterval = {min: frontierPoint.x - minDist, max: frontierPoint.x + minDist},
        candidatesByY = getCandidates(allOrderedByY, xInterval), // O(n)
        closestInIntersection = getClosestPairInIntersection(candidatesByY); // O (n)

    if (!closestInIntersection) return closestPair;
    return _.minBy([closestPair, closestInIntersection], getDistance);
  }

  // T(n) = 2T(n/2) + O(n) + O(n) = O(n log n)
  function getClosestPairOrdered(points) {
    var subproblems, closestOnLeft, closestOnRight;

    if (points.orderedByX.length <= 3) {
      return baseCase(points.orderedByX); // O(1)
    }

    subproblems = divide(points); // O(n)
    closestOnLeft = getClosestPairOrdered(subproblems.left);
    closestOnRight = getClosestPairOrdered(subproblems.right);

    return combine(subproblems.left, subproblems.right, closestOnLeft, closestOnRight); // O(n)
  }

  // O(2(n log n) + n log n) = O(3 n log n) = O(n log n)
  function divideAndConquer(points) {
    return getClosestPairOrdered({
      orderedByX: _.orderBy(points, 'x'), // O(n log n)
      orderedByY: _.orderBy(points, 'y') // O(n log n)
    });
  }

  window.closestPair = window.closestPair || {};
  window.closestPair.divideAndConquer = divideAndConquer;
}());
