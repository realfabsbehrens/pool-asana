// import clientPromise from "@/lib/mongodb";

// Mock data to be returned
const responseData = {
  template: "form_metadata_v0",
  metadata: {
    title: "Create new resource",
    submit_button_text: "Submit",
    on_submit_callback: "https://www.example.com/create/action/onsubmit",
    on_change_callback: "https://www.example.com/create/action/onchange",
    fields: [
      {
        type: "single_line_text",
        id: "single_line_text_full_width",
        name: "Single-line text field",
        value: "",
        is_required: true,
        placeholder: "Type something...",
        width: "full",
      },
      {
        type: "multi_line_text",
        id: "multi_line_text",
        name: "Multi-line text field",
        value: "",
        is_required: false,
        placeholder: "Type something...",
      },
      {
        type: "rich_text",
        id: "rich_text",
        name: "Rich text field",
        is_required: false,
        value: "",
      },
      {
        type: "dropdown",
        id: "dropdown_half_width",
        name: "Dropdown field",
        is_required: false,
        options: [
          {
            id: "1",
            label: "Option 1",
            icon_url: "https://www.fillmurray.com/16/16",
          },
          {
            id: "2",
            label: "Option 2",
            icon_url: "https://www.fillmurray.com/16/16",
          },
        ],
        width: "half",
      },
      {
        type: "typeahead",
        id: "typeahead_half_width",
        name: "Typeahead field",
        is_required: false,
        typeahead_url: "https://www.example.com/typeahead",
        placeholder: "Search for something...",
        width: "half",
      },
      {
        type: "date",
        id: "date",
        name: "Date field",
        placeholder: "MM/DD/YYYY",
        is_required: false,
      },
      {
        type: "datetime",
        id: "datetime",
        name: "Date & time field",
        placeholder: "MM/DD/YYYY HH:MM am/pm",
        is_required: false,
      },
      {
        type: "checkbox",
        id: "checkbox",
        name: "Checkbox field",
        is_required: true,
        options: [
          {
            id: "1",
            label: "Choice 1",
          },
          {
            id: "2",
            label: "Choice 2",
          },
        ],
      },
      {
        type: "radio_button",
        id: "radio_button",
        name: "Radio button field",
        value: "1",
        is_required: true,
        options: [
          {
            id: "1",
            label: "Choice 1",
          },
          {
            id: "2",
            label: "Choice 2",
          },
        ],
      },
    ],
  },
};

export default async (req, res) => {
  try {
    console.log(JSON.stringify.req);
    res.json(responseData);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
