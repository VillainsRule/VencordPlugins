/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { findComponentByCodeLazy } from "@webpack";

const inboxButton = findComponentByCodeLazy('location:"inbox-button",');

import "./style.css";

import definePlugin from "@utils/types";

export default definePlugin({
    name: "NoTopBar",
    description: "removes the top bar and the inbox down",
    authors: [{ name: "Death", id: 1003477997728313405n }],
    dependencies: ["VencordToolbox"],
    patches: [
        {
            find: "toolbar:function",
            replacement: {
                match: /\]\}\)\}\(\),transparent:/,
                replace: ",$self.InboxButton()]})}(),transparent:"
            }
        }
    ],
    InboxButton: inboxButton
});
