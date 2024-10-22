interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x: 1;
  y: 2;
}

type Point2 = {
  x: number;
  y: number;
};

class SomePoint2 implements Point2 {
  x: 1;
  y: 2;
}

type PartialPoint = { x: number } | { y: number };

let a: PartialPoint = { x: 1 };

// FIXME: can not implement a union type
class SomePartialPoint implements PartialPoint {
  x: 1;
  y: 2;
}
