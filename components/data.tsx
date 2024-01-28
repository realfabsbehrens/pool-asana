import { getTasks } from "@/lib/mongo/tasks";

async function fetchTasks() {
  const { tasks } = await getTasks();
  if (!tasks) throw new Error("Failed to fetch tasks!");
  return tasks;
}

export default async function data() {
  const tasks = await fetchTasks();

  return (
    <ul>
      {tasks.map((tasks) => (
        <li key={tasks._id}>{tasks.name}</li>
      ))}
    </ul>
  );
}
