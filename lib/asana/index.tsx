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
        "actual_time_minutes,approval_status,assignee,assignee.name,assignee_section,assignee_section.name,assignee_status,completed,completed_at,completed_by,completed_by.name,created_at,created_by,custom_fields,custom_fields.asana_created_field,custom_fields.created_by,custom_fields.created_by.name,custom_fields.currency_code,custom_fields.custom_label,custom_fields.custom_label_position,custom_fields.date_value,custom_fields.date_value.date,custom_fields.date_value.date_time,custom_fields.description,custom_fields.display_value,custom_fields.enabled,custom_fields.enum_options,custom_fields.enum_options.color,custom_fields.enum_options.enabled,custom_fields.enum_options.name,custom_fields.enum_value,custom_fields.enum_value.color,custom_fields.enum_value.enabled,custom_fields.enum_value.name,custom_fields.format,custom_fields.has_notifications_enabled,custom_fields.is_formula_field,custom_fields.is_global_to_workspace,custom_fields.is_value_read_only,custom_fields.multi_enum_values,custom_fields.multi_enum_values.color,custom_fields.multi_enum_values.enabled,custom_fields.multi_enum_values.name,custom_fields.name,custom_fields.number_value,custom_fields.people_value,custom_fields.people_value.name,custom_fields.precision,custom_fields.resource_subtype,custom_fields.text_value,custom_fields.type,dependencies,dependents,due_at,due_on,external,external.data,followers,followers.name,hearted,hearts,hearts.user,hearts.user.name,html_notes,is_rendered_as_separator,liked,likes,likes.user,likes.user.name,memberships,memberships.project,memberships.project.name,memberships.section,memberships.section.name,modified_at,name,notes,num_hearts,num_likes,num_subtasks,parent,parent.created_by,parent.name,parent.resource_subtype,permalink_url,projects,projects.name,resource_subtype,start_at,start_on,tags,tags.name,workspace,workspace.name",
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

      console.log(taskData);
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
