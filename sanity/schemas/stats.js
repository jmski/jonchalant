export default {
  name: "stats",
  title: "Platform Stats",
  type: "document",
  fields: [
    {
      name: "platform",
      type: "string",
      title: "Platform Name",
      description: "e.g., TikTok, Instagram, YouTube",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "followers",
      type: "number",
      title: "Follower Count",
      description: "Total followers/subscribers",
      initialValue: 0,
    },
    {
      name: "totalViews",
      type: "number",
      title: "Total Views",
      description: "Lifetime views across all content",
      initialValue: 0,
    },
    {
      name: "avgEngagementRate",
      type: "number",
      title: "Average Engagement Rate (%)",
      description: "Average engagement percentage",
      initialValue: 0,
    },
    {
      name: "monthlyGrowth",
      type: "number",
      title: "Monthly Growth (%)",
      description: "Growth percentage this month",
      initialValue: 0,
    },
    {
      name: "profileUrl",
      type: "url",
      title: "Profile URL",
      description: "Link to the platform profile",
    },
    {
      name: "updatedAt",
      type: "datetime",
      title: "Last Updated",
      description: "When these stats were last updated",
      initialValue: new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: "platform",
      followers: "followers",
    },
    prepare(selection) {
      const { title, followers } = selection;
      return {
        title: title,
        subtitle: `${followers || 0} followers`,
      };
    },
  },
};
