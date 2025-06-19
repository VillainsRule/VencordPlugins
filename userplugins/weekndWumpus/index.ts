/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    source: {
        description: "Source to replace the vibing mp3 with",
        type: OptionType.STRING,
        default: "https://files.catbox.moe/udwvp9.mp3",
        restartNeeded: false
    }
});

export default definePlugin({
    name: "Weeknd Wumpus",
    description: "have wumpus vibe to our lord and savior, The Weeknd",
    authors: [{ id: 1003477997728313405n, name: "Death" }],
    settings,
    patches: [
        {
            find: ".navigator.mediaDevices.enumerateDevices()",
            replacement: [{
                match: /\.src=(\i)/,
                replace: ".src=this.name==='vibing_wumpus'?$self.settings.store.source:$1"
            }]
        }
    ]
});
