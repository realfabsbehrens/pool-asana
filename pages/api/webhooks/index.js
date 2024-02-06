const Asana = require("asana");

let client = Asana.ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.ASANAKEY;

let webhooksApiInstance = new Asana.WebhooksApi();
let body = {
  data: {
    resource: "1206375681112048",
    target: "https://pool-asana.vercel.app/api/webhooks",
  },
}; // Object | The webhook workspace and target.
let opts = {
  opt_fields:
    "active,created_at,filters,filters.action,filters.fields,filters.resource_subtype,last_failure_at,last_failure_content,last_success_at,resource,resource.name,target",
};
webhooksApiInstance.createWebhook(body, opts).then(
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
