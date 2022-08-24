export abstract class Either<L, R> {
  abstract fold(left: (left: L) => L, right: (right: R) => R): L | R;
}

export class Left<L, R> extends Either<L, R> {
  constructor(private readonly l: L) {
    super();
  }
  fold(left: (left: L) => L, right: (right: R) => R): L {
    return left(this.l);
  }
}

export class Right<L, R> extends Either<L, R> {
  constructor(private readonly r: R) {
    super();
  }
  fold(left: (left: L) => L, right: (right: R) => R): R {
    return right(this.r);
  }
}
