export default {
  name: 'mediaKitData',
  title: 'Media Kit Data',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Media Kit Statistics',
      readOnly: true,
    },
    {
      name: 'totalFollowers',
      title: 'Total Followers',
      type: 'string',
      description: 'e.g., "150K+"',
    },
    {
      name: 'followerChange',
      title: 'Follower Change YoY',
      type: 'string',
      description: 'e.g., "+15% YoY"',
    },
    {
      name: 'avgMonthlyViews',
      title: 'Avg Monthly Views',
      type: 'string',
      description: 'e.g., "2.5M"',
    },
    {
      name: 'viewsChange',
      title: 'Views Change YoY',
      type: 'string',
      description: 'e.g., "+22% YoY"',
    },
    {
      name: 'engagementRate',
      title: 'Engagement Rate %',
      type: 'string',
      description: 'e.g., "4.8%"',
    },
    {
      name: 'engagementChange',
      title: 'Engagement Change',
      type: 'string',
      description: 'e.g., "+0.5% YoY"',
    },
    {
      name: 'activeSubscribers',
      title: 'Active Subscribers',
      type: 'string',
      description: 'e.g., "85K"',
    },
    {
      name: 'subscriberChange',
      title: 'Subscriber Change',
      type: 'string',
      description: 'e.g., "+18% YoY"',
    },
    {
      name: 'platforms',
      title: 'Platform Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Platform Name' },
            { name: 'handle', type: 'string', title: 'Handle' },
            { name: 'followers', type: 'string', title: 'Followers' },
            { name: 'avgViews', type: 'string', title: 'Avg Views per Post' },
            { name: 'category', type: 'string', title: 'Content Category' },
          ],
        },
      ],
    },
    {
      name: 'contentCategories',
      title: 'Content Category Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Category Name' },
            { name: 'percentage', type: 'number', title: 'Percentage' },
            { name: 'description', type: 'string', title: 'Description' },
          ],
        },
      ],
    },
  ],
}
