<div align="center">
    <h1>VencordPlugins</h1>
    <h3>QoL vencord plugins</h3>
</div>

<br>

- [1fa](./userplugins/1fa.tsx) - hide the 2fa moderation warning because annoying
- [dontLimitMe](./userplugins/dontLimitMe.tsx) - removes the client-side limit on message sending - spam away!
- [everytwo](./userplugins/everytwo.tsx) - pings everyone in chunked messages (will flag account)
- [gatewayLogger](./userplugins/gatewayLogger.tsx) - logs all gateway messages to the console
- [inviteDefaults](./userplugins/inviteDefaults.tsx) - edit the default values when creating server invites.
- [tokenCommand](./userplugins/tokenCommand.tsx) - run command, get token. ez.

<br>

to add the plugins, first follow the steps [here](https://docs.vencord.dev/installing/custom-plugins/) up to "add your plugins" from there, run this command **in the userplugins directory**:

mac/linux:

```sh
curl -L https://github.com/VillainsRule/VencordPlugins/archive/refs/heads/main.zip -o - | bsdtar -xf - --strip-components=2 "VencordPlugins-main/userplugins"
```

windows:

idk ask chatgpt

enjoy!

<br>
<h5 align="center">made with 💖 by VillainsRule</h5>
