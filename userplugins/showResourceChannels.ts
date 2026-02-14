/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
    name: "ShowResourceChannels",
    description: "shows the channels hidden behind the server resources in the channel list",
    authors: [{ id: 1003477997728313405n, name: "Death" }],
    patches: [
        {
            find: ".GUILD_DIRECTORY:null",
            replacement: [
                {
                    match: /\i\.hideResourceChannels&&/,
                    replace: "false&&"
                }
            ]
        }
    ]
});
