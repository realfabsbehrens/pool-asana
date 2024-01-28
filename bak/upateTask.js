exports = async function (changeEvent) {
  const Asana = require("asana");

  let client = Asana.ApiClient.instance;
  let token = client.authentications["token"];
  token.accessToken =
    "2/1203216604170451/1206375764716005:034f587a2512920f738a1dd89879eaa6";
  let tasksApiInstance = new Asana.TasksApi();

  let opts = {
    opt_fields:
      "actual_time_minutes,approval_status,assignee,assignee.name,assignee_section,assignee_section.name,assignee_status,completed,completed_at,completed_by,completed_by.name,created_at,created_by,custom_fields,custom_fields.asana_created_field,custom_fields.created_by,custom_fields.created_by.name,custom_fields.currency_code,custom_fields.custom_label,custom_fields.custom_label_position,custom_fields.date_value,custom_fields.date_value.date,custom_fields.date_value.date_time,custom_fields.description,custom_fields.display_value,custom_fields.enabled,custom_fields.enum_options,custom_fields.enum_options.color,custom_fields.enum_options.enabled,custom_fields.enum_options.name,custom_fields.enum_value,custom_fields.enum_value.color,custom_fields.enum_value.enabled,custom_fields.enum_value.name,custom_fields.format,custom_fields.has_notifications_enabled,custom_fields.is_formula_field,custom_fields.is_global_to_workspace,custom_fields.is_value_read_only,custom_fields.multi_enum_values,custom_fields.multi_enum_values.color,custom_fields.multi_enum_values.enabled,custom_fields.multi_enum_values.name,custom_fields.name,custom_fields.number_value,custom_fields.people_value,custom_fields.people_value.name,custom_fields.precision,custom_fields.resource_subtype,custom_fields.text_value,custom_fields.type,dependencies,dependents,due_at,due_on,external,external.data,followers,followers.name,hearted,hearts,hearts.user,hearts.user.name,html_notes,is_rendered_as_separator,liked,likes,likes.user,likes.user.name,memberships,memberships.project,memberships.project.name,memberships.section,memberships.section.name,modified_at,name,notes,num_hearts,num_likes,num_subtasks,parent,parent.created_by,parent.name,parent.resource_subtype,permalink_url,projects,projects.name,resource_subtype,start_at,start_on,tags,tags.name,workspace,workspace.name",
  };

  let task_gid = changeEvent.fullDocument.asanaGID;
  // add new inserted documents to asana and retrieve  gid

  let statusID;

  switch (changeEvent.fullDocument.status) {
    case "Offen":
      statusID = "1206451226784044";
      break;
    case "In Arbeit":
      statusID = "1206451226784045";
      break;
    case "On Hold":
      statusID = "1206451226784046";
      break;
    case "Freigabe Projektleiter":
      statusID = "1206451226784047";
      break;
    default:
      statusID = "1206451226784044";
  }

  let body = {
    data: {
      name: changeEvent.fullDocument.name,
      assignee: changeEvent.fullDocument.assignee,
      due_on: changeEvent.fullDocument.termin,
      projects: ["1206375681112048"],
      workspace: "1203216507389836",
      custom_fields: {
        1206451226784043: `${statusID}`,
        1206451201234070: changeEvent.fullDocument.nummer,
        1206451200869135: changeEvent.fullDocument.project,
      },
    },
  };

  tasksApiInstance.updateTask(body, task_gid, opts).then(
    (result) => {
      console.log(
        "API called successfully. Returned data: " +
          JSON.stringify(result.data, null, 2)
      );
    },
    (error) => {
      console.error(error.response);
    }
  );
};
