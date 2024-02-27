import { insertTask } from "@/lib/mongodb";
import { updateTask } from "@/lib/mongodb";

const Asana = require("asana");

let client = Asana.ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.ASANAKEY;

let taskData = {
  name: "Name fehlt!",
  assignee: "nicht zugewiesen",
  workspace: "Workplace",
  asanaGID: "",
  nummer: "Task123",
  project: "ProjectXYZ",
  status: "In Progress",
  termin: "2024-02-11",
};

export async function getAsanaTask(asanaGID) {
  return new Promise((resolve, reject) => {
    let tasksApiInstance = new Asana.TasksApi();
    let opts = {
      opt_fields:
        "name,assignee.name,notes,due_on,custom_fields.name,custom_fields.enum_value.name,custom_fields.text_value",
    };

    tasksApiInstance.getTask(asanaGID, opts).then(
      (result) => {
        console.log(
          "Asana API called successfully. Returned data: " +
            JSON.stringify(result.data, null, 2)
        );
        resolve(result); // Hier wird das Promise erfolgreich aufgelöst.
      },
      (error) => {
        console.error(error.response.body);
        reject(error); // Hier wird das Promise abgelehnt, wenn ein Fehler auftritt.
      }
    );
  });
}

export async function getAndInsertTask(asanaGID) {
  try {
    const response = await getAsanaTask(asanaGID);

    if (response.data.gid) {
      const asanaGID = response.data.gid;

      let taskData = {
        name: "Name fehlt!",
        assignee: "nicht zugewiesen",
        workspace: "Workplace",
        asanaGID: asanaGID,
        nummer: "Task123",
        project: "ProjectXYZ",
        status: "In Progress",
        termin: "2024-02-11",
      };

      await insertTask(taskData);
    }
  } catch (error) {
    console.error(error.response.body);
  }
}

export async function getAndUpdateTask(asanaGID) {
  try {
    // Adding a 2-second delay before calling getAsanaTask

    const response = await getAsanaTask(asanaGID);

    if (response.data.gid) {
      const asanaGID = response.data.gid;

      let taskData = {
        name: "Name fehlt!",
        assignee: "nicht zugewiesen",
        workspace: "Workplace",
        asanaGID: asanaGID,
        nummer: "Task123",
        project: "ProjectXYZ",
        status: "In Progress",
        termin: "2024-02-11",
      };

      await updateTask(taskData);
    }
  } catch (error) {
    console.error(error.response.body);
  }
}
