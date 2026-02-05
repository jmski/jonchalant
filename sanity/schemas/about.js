export default {
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    { name: "headline", type: "string", title: "Headline" },
    { name: "tagline", type: "string", title: "Tagline" },
    {
      name: "bio",
      type: "array",
      title: "Full Biography",
      of: [
        {
          name: "bioSection", // 👈 ADD THIS
          type: "object",
          title: "Bio Section", // 👈 ADD THIS for better UI
          fields: [
            { name: "heading", type: "string", title: "Section Heading" },
            { name: "content", type: "text", title: "Content" },
          ],
        },
      ],
    },
    {
      name: "philosophy",
      type: "array",
      title: "Philosophy Points",
      of: [
        {
          name: "philosophyItem", // 👈 ADD THIS
          type: "object",
          title: "Philosophy Item",
          fields: [
            { name: "principle", type: "string", title: "Principle" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
    },
    {
      name: "expertise",
      type: "array",
      title: "Areas of Expertise",
      of: [
        {
          name: "expertiseArea", // 👈 ADD THIS
          type: "object",
          title: "Expertise Area",
          fields: [
            {
              name: "category",
              type: "string",
              title: "Category",
              options: {
                list: [
                  "Dance & Movement",
                  "Content Creation",
                  "Hobby Expertise",
                  "Business",
                ],
              },
            },
            {
              name: "skills",
              type: "array",
              title: "Skills",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
  ],
};
