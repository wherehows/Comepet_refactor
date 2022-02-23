export const Lazy = {};

export const isLength = {};

isLength.GreaterThanOrEqual = (number) => {
  return (iter) => iter.length >= number;
};

isLength.GreaterThan = (number) => {
  return (iter) => iter.length > number;
};

isLength.LessThanOrEqual = (number) => {
  return (iter) => iter.length <= number;
};

isLength.LessThan = (number) => {
  return (iter) => iter.length < number;
};

isLength.Equal = (number) => {
  return (iter) => iter.length === number;
};

export const curry =
  (appliedFunc) =>
  (firstElement, ...remainElements) =>
    remainElements.length
      ? appliedFunc(firstElement, ...remainElements)
      : (...nextElemenets) => appliedFunc(firstElement, ...nextElemenets);

export const reduce = curry((appliedFunc, acc, iter) => {
  if (!iter) {
    acc = (iter = acc[Symbol.iterator]()).next().value;
  }

  for (const value of iter) {
    acc = appliedFunc(acc, value);
  }

  return acc;
});

export const go = (...elements) =>
  reduce((initialValue, appliedFunc) => appliedFunc(initialValue), elements);

export const pipe =
  (firstFunction, ...remainFunctions) =>
  (...elements) =>
    go(firstFunction(...elements), ...remainFunctions);

export const take = curry((limiter, iter) => {
  const res = [];

  for (const value of iter) {
    res.push(value);
    if (res.length === limiter) return res;
  }

  return res;
});

export const identity = (v) => !v;

export const find = curry((appliedFunc, iter) => {
  let cur = null;
  iter = iter[Symbol.iterator]();

  while (!(cur = iter.next()).done) {
    if (appliedFunc(cur.value)) return cur.value;
  }
});

export const getDataMadeBy = curry((appliedFunc, data) => appliedFunc(data));

Lazy.map = curry(function* (appliedFunc, iter) {
  for (const value of iter) yield appliedFunc(value);
});

Lazy.filter = curry(function* (appliedFunc, iter) {
  for (const value of iter) if (appliedFunc(value)) yield value;
});
