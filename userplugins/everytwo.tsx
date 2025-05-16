/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, ApplicationCommandOptionType, sendBotMessage } from "@api/Commands";
import { sendMessage } from "@utils/discord";
import definePlugin from "@utils/types";
import { ChannelStore, GuildMemberStore, SelectedChannelStore, SelectedGuildStore, UserStore } from "@webpack/common";
import { GuildMember } from "discord-types/general";

export default definePlugin({
    name: "everytwo",
    authors: [{ name: "Death", id: 1003477997728313405n }],
    description: "mentions everyone but a lot. your account will be flagged as spam. i'm not responsible for stupidity.",
    patches: [
        {
            find: ".LAUNCHABLE_APPLICATIONS;",
            replacement: [
                {
                    match: /&(\i)\(\)\((\i),\i\(\)\.test\)&&(\i)\.push\(\i\(\)\)/g,
                    replace: "$&,$1()($2,/everytwo/.test)&&$3.push({text:'@everytwo',description:'mention everyone the funny way?'})"
                },
            ],
        },
        {
            find: "MENTION_HERE:",
            replacement: {
                match: /(LAUNCHABLE_APPLICATIONS)/,
                replace: "MENTION_HERE: ()=>({test: 'everytwo',text: '@everytwo',description: 'mention everyone the funny way?'}),$1"
            }
        },
        {
            find: "inQuote:",
            replacement: {
                match: /\|Clyde/,
                replace: "$&|everytwo"
            }
        }
    ],

    commands: [
        {
            name: "everytwo",
            description: "ping everyone with different messages",
            inputType: ApplicationCommandInputType.BUILT_IN,
            options: [
                {
                    name: "per-message",
                    description: "# per message",
                    type: ApplicationCommandOptionType.NUMBER,
                    required: false
                },
            ],
            execute: (args, ctx) => {
                if (!ctx.guild) {
                    return sendBotMessage(ctx.channel.id, { content: "Make sure that you are in a server." });
                }

                const guildId = SelectedGuildStore.getGuildId();
                if (guildId === null) {
                    const dmUsers = ChannelStore.getChannel(SelectedChannelStore.getChannelId()).recipients;
                    return dmUsers.map(u => `<@${u}>`).join(" ");
                }

                let members = GuildMemberStore.getMembers(guildId);
                members = members.filter(m => {
                    const user = UserStore.getUser(m.userId);
                    return user.bot === false;
                });

                if (!args[0] || !args[0].value)
                    return sendMessage(ctx.channel.id, { content: members.map(m => `<@${m.userId}>`).join(" ") });

                const result: GuildMember[][] = [];
                for (let i = 0; i < members.length; i += Number(args[0].value)) {
                    const chunk: GuildMember[] = members.slice(i, i + Number(args[0].value));
                    result.push(chunk);
                }

                result.forEach(chunk => {
                    sendMessage(ctx.channel.id, { content: chunk.map(m => `<@${m.userId}>`).join("") });
                });
            }
        }
    ]
});
