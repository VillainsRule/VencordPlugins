// https://github.com/Vendicated/Vencord/pull/2300
// adapted: inlined author
// all credit goes to https://github.com/programminglaboratorys

/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./style.css";

import { generateId, sendBotMessage } from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { Embed, Message } from "discord-types/general";

import { AutoModRule } from "./automod";
import { settingsAboutComponent, TestInputBoxComponent } from "./UI";

const useAutomodRulesStore = findByPropsLazy("useAutomodRulesList");

let currentGuild: string | null = null;

interface EMessage extends Message {
    echoed: boolean;
}

interface IMessageCreate {
    type: "MESSAGE_CREATE";
    optimistic: boolean;
    isPushNotification: boolean;
    channelId: string;
    message: EMessage;
}


const settings = definePluginSettings({
    testBox: {
        type: OptionType.BOOLEAN,
        description: "enable Automod Test box",
        default: true,
        restartNeeded: true
    },
    echoIt: {
        type: OptionType.BOOLEAN,
        description: "echo Automod embed",
        default: true
    }
});

export default definePlugin({
    name: "betterAutomod",
    authors: [{ name: "i am me", id: 984392761929256980n }],
    description: "echo AutoMod logs real time and let's you test your AutoMod rules",
    settings: settings,
    settingsAboutComponent: settingsAboutComponent,
    patches: [
        {
            find: ".Messages.GUILD_SETTINGS_AUTOMOD_MESSAGE_FILTER_DESCRIPTION",
            replacement: [
                {
                    match: /\.textBadge.+?}\),/,
                    replace: "$& $self.renderInputBox(),"
                }
            ],
            predicate: () => settings.store.testBox
        }
    ],
    renderInputBox: () => {
        const { rulesByTriggerType }: { rulesByTriggerType: AutoModRule[][]; } = useAutomodRulesStore.useAutomodRulesList(currentGuild);
        if (rulesByTriggerType.length === 0 || !rulesByTriggerType[1] || rulesByTriggerType[1].length === 0) return null;
        return <TestInputBoxComponent currentRules={rulesByTriggerType[1]} />;
    },
    flux: {
        async MESSAGE_CREATE({ optimistic, type, message }: IMessageCreate) {
            if (!settings.store.echoIt) return;
            if (optimistic || type !== "MESSAGE_CREATE") return;
            if (message.state === "SENDING") return;
            if (message.type !== 24) return; // automod embed
            if (message?.echoed) return;

            message.embeds.forEach((embed: Embed) => {
                if (embed.type !== "auto_moderation_message") { return; }
                embed.fields.forEach((field: { name: string, value: string; }) => {
                    if (field.name !== "channel_id") { return; }
                    message.echoed = true;
                    sendBotMessage(field.value, {
                        ...message,
                        bot: false,
                        flags: /* ephemeral */ 1 << 6,
                        channel_id: field.value,
                        id: generateId(),
                    });
                });
            });
        },
        async GUILD_SETTINGS_INIT({ guildId, section }: { section: string; guildId: string; }) {
            if (section !== "GUILD_AUTOMOD") return;
            currentGuild = guildId;
        }
    }
});
