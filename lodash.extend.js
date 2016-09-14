(function () {
  'use strict';

  function getProperty(element, property) {
    return element[property] || element;
  }

  _.set(_, 'mergeArrays', function (a, b, property) {
    var i = 0, j = 0, merged = [];

    while (i < a.length || j < b.length) {
      while (i < a.length && (j >= b.length || getProperty(a[i], property) < getProperty(b[j], property))) {
        merged.push(a[i]);
        i++;
      }
      if (j < b.length) {
        merged.push(b[j]);
        j++;
      }
    }

    return merged;
  });

}());
