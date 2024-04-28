// components/Webhook.js
import React from "react";

export default function Webhook({ webhooks }) {
  return (
    <div>
      {webhooks.map((webhook, index) => (
        <div
          className={`${
            webhook.active ? "bg-green-200" : "bg-red-200"
          } p-5 my-5 `}
          key={index}
        >
          <h3>Webhook ID: {webhook.gid}</h3>
          {webhook.filters.map((filter, filterIndex) => (
            <div key={filterIndex}>
              <p>Aktion: {filter.action}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
