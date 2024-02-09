// clientPromise importieren von Globas
import clientPromise from ".";

// value initieren
let client;
let db;
let tasks;

export async function init() {
  if (!db) {
    try {
      console.log("Vor dem await clientPromise in init");
      client = await clientPromise;
      console.log("Nach dem await clientPromise in init");
      db = client.db("poool");
      tasks = db.collection("projects");
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
    console.log("Vor dem Aufruf von init in deleteTasksByAsanaGid");
    await init();
    console.log("Nach dem Aufruf von init in deleteTasksByAsanaGid");
    console.log("Deleting task with Asana GID:", asanaGid);
    const result = await tasks.deleteOne({ asanaGID: asanaGid });
    console.log("Deletion result:", result);
    return { success: result.deletedCount > 0 };
  } catch (error) {
    console.error("Failed to delete tasks:", error.message);
    return { error: "Failed to delete tasks!" };
  }
}
