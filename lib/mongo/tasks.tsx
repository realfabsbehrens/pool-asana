// clientPromise importieren von Globas
import clientPromise from ".";

// value initieren
let client;
let db;
let tasks;

async function init() {
  if (!db) {
    try {
      client = await clientPromise;
      db = await client.db("poool");
      tasks = await db.collection("projects");
      console.log("Database connected");
    } catch (error) {
      console.error(
        "Failed to establish connection to the database:",
        error.message
      );
      throw error; // Re-throw the error to signal initialization failure
    }
  }
}

(async () => {
  await init();
})();

//////////////
/// MOVIES //
////////////

export async function getTasks() {
  try {
    if (!tasks) await init();
    const result = await tasks
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();

    return { tasks: result };
  } catch (error) {
    return { error: "Failed to fetch movies!" };
  }
}

// Neue Funktion zum Löschen von Aufgaben mit einer bestimmten asana_gid
export async function deleteTasksByAsanaGid(asanaGid) {
  try {
    await init();
    console.log("Deleting task with Asana GID:", asanaGid);
    const result = await tasks.deleteOne({ asanaGID: asanaGid });
    console.log("Deletion result:", result);
    return { success: result.deletedCount > 0 };
  } catch (error) {
    console.error("Failed to delete tasks:", error.message);
    return { error: "Failed to delete tasks!" };
  }
}
