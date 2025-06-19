export const mockTask = {
  id: 'test-id-1' as UUID,
  title: "Test Task",
  description: "This is a test task",
  status: false,
  urgent: false,
  important: false,
  authId: "user-1",
  createdAt: new Date("2023-01-01T00:00:00Z"),
  updatedAt: new Date("2023-01-01T00:00:00Z")
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export const mockUser = {
  id: "user-123"
}
