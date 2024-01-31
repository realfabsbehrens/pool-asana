import { getTasks } from "@/lib/mongo/tasks";

interface Task {
  _id: string;
  name: string;
  // Add other properties as needed
}

async function fetchTasks(): Promise<Task[]> {
  const { tasks } = await getTasks();
  if (!tasks) throw new Error("Failed to fetch tasks!");
  return tasks;
}

export default async function data() {
  const tasks: Task[] = await fetchTasks();

  return (
    <ul>
      {tasks.map((tasks) => (
        <li key={tasks._id}>{tasks.name}</li>
      ))}
    </ul>
  );
}
