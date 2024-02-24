import { insertTask } from "@/lib/mongodb";

const Asana = require("asana");

let client = Asana.ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.ASANAKEY;

let taskData = {
  name: "Name fehlt!",
  assignee: "John Doe",
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
      opt_fields: "assignee,html_notes,name,notes",
    };

    tasksApiInstance.getTask(asanaGID, opts).then(
      (result) => {
        console.log(result.data.name);
        console.log(
          "API called successfully. Returned data: " +
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

export async function getAndDeleteTask(asanaGID) {
  try {
    const response = await getAsanaTask(asanaGID);
    console.log(response);
    if (response.data.name) {
      let taskData = {
        name: response.data.name,
        assignee: "John Doe",
        workspace: "Workplace",
        asanaGID: response.data.gid,
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
