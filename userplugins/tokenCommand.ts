/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, sendBotMessage } from "@api/Commands";
import definePlugin from "@utils/types";
import { findStoreLazy } from "@webpack";

export default definePlugin({
    name: "TokenCommand",
    description: "run command, get token. ez.",
    authors: [{ id: 1003477997728313405n, name: "Death", }],
    commands: [
        {
            name: "token",
            description: "run command, get token. ez.",
            inputType: ApplicationCommandInputType.BUILT_IN,
            options: [],
            execute: (_, ctx) => {
                const store = findStoreLazy("AuthenticationStore");
                sendBotMessage(ctx.channel.id, {
                    content: "`" + "``\n" + store.getToken() + "\n`" + "``" // discord markdown had a stroke
                });
            },
        },
    ]
});
