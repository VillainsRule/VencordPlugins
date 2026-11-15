<div align="center">
    <h1>VencordPlugins</h1>
    <h3>a compilation of vencord plugins</h3>
</div>

<br>

there are 3 cool things in here:
1. [plugins from PRs](./from-pr/) - names are [pr number]-[plugin name].ts(x?)
2. [removed plugins](./removed/) - plugins as-is when removed from vencord
3. [things i made](./userplugins/) - the various userplugins i've created

<br>

also, here's some cool plugins from equicord:

- [bypassPinPrompt](https://github.com/Equicord/Equicord/tree/main/src/equicordplugins/bypassPinPrompt) by thororen
- [cancelFriendRequest](https://github.com/Equicord/Equicord/tree/main/src/equicordplugins/pendingFriendRequest) by omaw
- [copyStatusUrls](https://github.com/Equicord/Equicord/blob/main/src/equicordplugins/copyStatusUrls/index.ts) by sadan
- [inRole](https://github.com/Equicord/Equicord/tree/main/src/equicordplugins/inRole) by nin0
- [newPluginManager](https://github.com/Equicord/Equicord/tree/main/src/equicordplugins/newPluginsManager) by sqaaakoi
- [saveFavoriteGIFs](https://github.com/Equicord/Equicord/tree/main/src/equicordplugins/saveFavoriteGIFs) by thororen

<br>

to add the plugins in this repository, first follow the steps [here](https://docs.vencord.dev/installing/custom-plugins/) up to "add your plugins" from there, run this command **in the userplugins directory**:

```sh
curl -L https://github.com/VillainsRule/VencordPlugins/archive/refs/heads/main.zip -o - | bsdtar -xf - --strip-components=2 "VencordPlugins-main/userplugins"
```

(i don't know the windows one, i don't use windows)

<br><br>
<h5 align="center">made with ❤️</h5>
