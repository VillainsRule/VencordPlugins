import definePlugin from "@utils/types";

export default definePlugin({
    name: "DontLimitMe",
    description: "removes the limit on message sending. spam away!",
    authors: [{ name: 'Death', id: 1003477997728313405n }],
    patches: [
        {
            find: "cancelQueueMetricTimers",
            replacement: {
                match: /this\.maxSize=[a-zA-Z]+,/,
                replace: "this.maxSize=Number.MAX_SAFE_INTEGER,"
            }
        }
    ]
});
