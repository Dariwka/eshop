module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      accessToken: process.env.NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN,
      sites: [
        {
          name: "kosmedikbackend",
          id: "971e42a1-bf89-4ae3-9b8f-7745b3f5d383",
          buildHook:
            "https://api.netlify.com/build_hooks/64f59652d7589422ec229079",
          branch: "production", // optional
        },
      ],
    },
  },
});
