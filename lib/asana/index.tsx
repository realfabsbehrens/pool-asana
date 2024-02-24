import { insertTask } from "@/lib/mongodb";

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
export async function getAndDeleteTask(asanaGID) {
  try {
    // Adding a 2-second delay before calling getAsanaTask
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await getAsanaTask(asanaGID);

    if (response.data.gid) {
      const asanaGID = response.data.gid;
      const assignee = response.data.assignee.name;
      const status = response.data.custom_fields.find(
        (field) => field.name === "Status"
      ).enum_value.name;
      const kunde = response.data.custom_fields.find(
        (field) => field.name === "Kunde & Projekt"
      ).text_value;
      const nummer = response.data.custom_fields.find(
        (field) => field.name === "Ticketnummer"
      ).text_value;
      const tickettext = response.data.notes;
      const termin = response.data.due_on;
      const name = response.data.name;

      let taskData = {
        name: name,
        assignee: assignee,
        workspace: "Workplace",
        asanaGID: asanaGID,
        nummer: nummer,
        project: kunde,
        status: status,
        termin: termin,
      };

      await insertTask(taskData);
    }
  } catch (error) {
    console.error(error.response.body);
  }
}
