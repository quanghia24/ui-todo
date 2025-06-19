import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema/task.schema";
import { eq, sql, asc, desc } from "drizzle-orm";
import * as taskActions from "@/db/queries/task.queries";
import { mockTask, UUID } from "__tests__/mocks/task.mock";

// Mock the database
jest.mock("@/db/drizzle", () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Task Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTasksBelongToUserId", () => {
    it("should return tasks for a given user ID with correct ordering", async () => {
      const userId = "user123";
      const mockTasks = [ mockTask, {...mockTask, id: 'test-id-2' as UUID}];

      (db.select as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockResolvedValue(mockTasks),
          }),
        }),
      });

      const result = await taskActions.getAllTasksBelongToUserId(userId);

      expect(db.select).toHaveBeenCalled();
      expect(result).toEqual(mockTasks);
      // expect(db.select().from(tasks).where().toHaveBeenCalledWith(eq(tasks.authId, userId));
      // expect(db.select().from(tasks).where().orderBy).toHaveBeenCalledWith(
      //   asc(tasks.status),
      //   desc(tasks.urgent),
      //   desc(tasks.important),
      //   desc(tasks.updatedAt)
      // );
    });
  });

  describe("createNewTask", () => {
    it("should create a new task with required fields", async () => {
      const userId = "user123";
      const title = "New Task";
      const description = "Task description";
      const mockTask = { id: "1", authId: userId, title, description };

      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockTask]),
        }),
      });

      const result = await taskActions.createNewTask(userId, title, description);

      expect(db.insert).toHaveBeenCalledWith(tasks);
      // expect(db.insert().values).toHaveBeenCalledWith({
      //   title,
      //   description,
      //   authId: userId,
      // });
      expect(result).toEqual(mockTask);
    });

    it("should create a new task with default empty description", async () => {
      const userId = "user123";
      const title = "New Task";
      const mockTask = { id: "1", authId: userId, title, description: "" };

      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockTask]),
        }),
      });

      const result = await taskActions.createNewTask(userId, title);

      // expect(db.insert().values).toHaveBeenCalledWith({
      //   title,
      //   description: "",
      //   authId: userId,
      // });
      expect(result).toEqual(mockTask);
    });
  });

  describe("updateTask", () => {
    it("should update task with all fields", async () => {
      const taskId = "task123";
      const updates = {
        title: "Updated Task",
        description: "Updated description",
        status: true,
        urgent: true,
        important: true,
      };
      const mockTask = { id: taskId, ...updates };

      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([mockTask]),
          }),
        }),
      });

      const result = await taskActions.updateTask(
        taskId,
        updates.title,
        updates.description,
        updates.status,
        updates.urgent,
        updates.important
      );

      expect(db.update).toHaveBeenCalledWith(tasks);
      // expect(db.update().set).toHaveBeenCalledWith({
      //   updatedAt: sql`NOW()`,
      //   ...updates,
      // });
      // expect(db.update().set().where).toHaveBeenCalledWith(eq(tasks.id, taskId));
      expect(result).toEqual([mockTask]);
    });

    it("should update task with partial fields", async () => {
      const taskId = "task123";
      const title = "Updated Task";
      const mockTask = { id: taskId, title };

      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([mockTask]),
          }),
        }),
      });

      const result = await taskActions.updateTask(taskId, title, "", false, false, false);

      // expect(db.update().set).toHaveBeenCalledWith({
      //   updatedAt: sql`NOW()`,
      //   title,
      // });
      expect(result).toEqual([mockTask]);
    });
  });

  describe("removeTask", () => {
    it("should remove a task by ID", async () => {
      const taskId = "task123";
      const mockResult = [{ id: taskId }];

      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue(mockResult),
        }),
      });

      const result = await taskActions.removeTask(taskId);

      expect(db.delete).toHaveBeenCalledWith(tasks);
      // expect(db.delete().where).toHaveBeenCalledWith(eq(tasks.id, taskId));
      // expect(db.delete().where().returning).toHaveBeenCalledWith({ id: tasks.id });
      expect(result).toEqual(mockResult);
    });
  });
});