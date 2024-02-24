const Asana = require("asana");

let client = Asana.ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.ASANAKEY;

export async function getAsanaTask(asanaGID) {
  let tasksApiInstance = new Asana.TasksApi();
  let opts = {
    opt_fields: "assignee,html_notes,name,notes",
  };
  tasksApiInstance.getTask(asanaGID, opts).then(
    (result) => {
      console.log(
        "API called successfully. Returned data: " +
          JSON.stringify(result.data, null, 2)
      );
    },
    (error) => {
      console.error(error.response.body);
    }
  );
}
