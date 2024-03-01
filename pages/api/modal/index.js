// import clientPromise from "@/lib/mongodb";

// Mock data to be returned
const responseData = {
  template: "form_metadata_v0",
  metadata: {
    title: "Create new resource",
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
        type: "dropdown",
        id: "dropdown_half_width_1",
        name: "Dropdown field",
        is_required: false,
        options: [
          {
            id: "1",
            label: "Option 1",
          },
          {
            id: "2",
            label: "Option 2",
          },
        ],
        width: "half",
      },
      {
        type: "dropdown",
        id: "dropdown_half_width_2",
        name: "Dropdown field",
        is_required: false,
        options: [
          {
            id: "1",
            label: "Option 1",
          },
          {
            id: "2",
            label: "Option 2",
          },
        ],
        width: "half",
      },
    ],
  },
};

export default async (req, res) => {
  try {
    res.json(responseData);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
