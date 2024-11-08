import definePlugin from "@utils/types";

export default definePlugin({
    name: "1FA",
    description: "never get bothered about 2fa moderation again!",
    authors: [
        {
            id: 1003477997728313405n,
            name: "Death",
        },
    ],
    patches: [
        {
            find: "APPLICATION_SUBSCRIPTION_EXPIRATION:",
            replacement: [{
                match: /GUILD_MFA_WARNING:return/,
                replace: "GUILD_MFA_WARNING:return;return"
            }]
        }
    ]
});
