// Mock database types
export interface MockDbChain<T> {
  insert: (table: unknown) => MockDbChain<T>;
  values: (data: unknown) => MockDbChain<T>;
  select: () => MockDbChain<T>;
  selectDistinct: (fields: unknown) => MockDbChain<T>;
  distinctOn: () => MockDbChain<T>;
  from: (table: unknown) => MockDbChain<T>;
  where: (condition: unknown) => MockDbChain<T>;
  leftJoin: (table: unknown, condition: unknown) => MockDbChain<T>;
  innerJoin: (table: unknown, condition: unknown) => MockDbChain<T>;
  orderBy: (field: unknown) => MockDbChain<T>;
  groupBy: () => MockDbChain<T>;
  limit: (n: number) => MockDbChain<T>;
  offset: (n: number) => MockDbChain<T>;
  returning: () => MockDbChain<T>;
  update: (table: unknown) => MockDbChain<T>;
  delete: (table: unknown) => MockDbChain<T>;
  set: (data: unknown) => MockDbChain<T>;
  then: <R>(callback: (value: T[]) => R) => Promise<R>;
  onConflictDoUpdate: (config: unknown) => MockDbChain<T>;
  onConflictDoNothing: (config: unknown) => MockDbChain<T>;
  mockReturnValue: (value: T[]) => void;
  transaction: (callback: (tx: MockDbChain<T>) => Promise<void>) => Promise<void>;
  $with: () => MockDbChain<T>;
}

// Create mock database helper
export function createMockDb<T>(): MockDbChain<T> {
  let chainedValue: T[] = [];
  const mockDb: MockDbChain<T> = {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    selectDistinct: jest.fn().mockReturnThis(),
    distinctOn: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    returning: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    onConflictDoUpdate: jest.fn().mockReturnThis(),
    onConflictDoNothing: jest.fn().mockReturnThis(),
    then: jest.fn((callback) => Promise.resolve(callback(chainedValue))),
    mockReturnValue: (value: T[]) => {
      chainedValue = value;
    },
    transaction: jest.fn(async (callback) => {
      await callback(mockDb);
      return Promise.resolve();
    }),
    $with: jest.fn().mockReturnThis()
  };
  return mockDb;
}
