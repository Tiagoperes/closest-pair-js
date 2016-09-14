(function () {
  'use strict';

  function getDistance(p, q) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
  }

  function bruteForce(points) {
    var minDist = Infinity,
        closest;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        let dist = getDistance(points[i], points[j]);
        if (dist < minDist) {
          minDist = dist;
          closest = [points[i], points[j]];
        }
      }
    }

    _.set(closest, 'distance', minDist);
    return closest;
  }

  window.closestPair = window.closestPair || {};
  closestPair.bruteForce = bruteForce;
}());
