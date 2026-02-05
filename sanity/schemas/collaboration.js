export default {
  name: "collaboration",
  title: "Collaboration",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    {
      name: "collabType", // 👈 Renamed from "type" to avoid confusion
      type: "string",
      title: "Type", // You can keep the UI title as "Type"
      options: { list: ["Service", "Past Collab"] },
    },
    { name: "description", type: "text", title: "Description" },
    { name: "image", type: "image", title: "Image" },
    { name: "link", type: "url", title: "External Link (optional)" },
  ],
};
