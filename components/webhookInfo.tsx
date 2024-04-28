// components/ClientInfoButton.js
import React, { useState, useEffect } from "react";
import Webhook from "./webhooks";

export default function ClientInfoButton() {
  const [webhooks, setWebhooks] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization:
          "Bearer 2/1203216604170451/1206375764716005:034f587a2512920f738a1dd89879eaa6",
      },
    };

    fetch(
      "https://app.asana.com/api/1.0/webhooks?workspace=1203216507389836&opt_fields=active,filters.action&opt_pretty=false",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setWebhooks(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return <Webhook webhooks={webhooks} />;
}
