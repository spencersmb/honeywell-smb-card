# HA-Honeywell Custom Card for LoveLace UI by [@spencersmb](https://github.com/spencersmb)

A minimalist card design with pop-up settings for Honeywell Thermostats.
(List of supported Units coming)

[![GitHub Release][releases-shield]][releases]

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

![Project Maintenance][maintenance-shield]

[![GitHub Activity][commits-shield]][commits]
## Options

| Name              | Type    | Requirement  | Description                          | Default     |
| ----------------- | ------- |--------------|--------------------------------------| ----------- |
| type              | string  | **Required** | `custom:honeywell-smb-card`          |
| name              | string  | **Required** | Floor Level Name |
| entity            | string  | **Required** | Home Assistant entity ID.|

## HACS Installation

### Step 1

Make sure the [HACS](https://github.com/hacs/integration) component is installed and working.

### Step 2

Search for `honeywell-smb-card` and add it through HACS

### Step 3

The next step is to register these resources with the Home Assistant interface. This is done by navigating to the Resources page by following below link:

![HACS Integration](https://my.home-assistant.io/badges/lovelace_resources.svg)

- Add Resource
- url: `/hacsfiles/honeywell-smb-card/honeywell-smb-card.js`
- Select `JavaScript Module` as the Resource Type
- Click `Create`

### Step 4

Refresh home-assistant.

## Manual Installation

### Step 1

Vist the [honeywell-smb-card](https://github.com/spencersmb/custom-etha-honeywell-card/releases) and download `Honeywell-SMB-Card.zip`

### Step 2

Open the zip and copy the 3 js files to `www/community/honeywell-smb-card` folder in your Home Assistant configuration directory.

### Step 3

The next step is to register these resources with the Home Assistant interface. This is done by navigating to the Resources page by following below link:

![HACS Integration](https://my.home-assistant.io/badges/lovelace_resources.svg)
- Add Resource
- url: `local/community/honeywell-smb-card/honeywell-smb-card.js`
- Select `JavaScript Module` as the Resource Type
- Click `Create`

## [Troubleshooting](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins)

NB This will not work with node 9.x if you see the following errors try installing node 8.10.0

```yarn install
yarn install v1.3.2
[1/4] 🔍  Resolving packages...
warning rollup-plugin-commonjs@10.1.0: This package has been deprecated and is no longer maintained. Please use @rollup/plugin-commonjs.
[2/4] 🚚  Fetching packages...
error @typescript-eslint/eslint-plugin@2.6.0: The engine "node" is incompatible with this module. Expected version "^8.10.0 || ^10.13.0 || >=11.10.1".
error Found incompatible module
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
```

[commits-shield]: https://img.shields.io/github/commit-activity/m/spencersmb/custom-etha-honeywell-card/main.svg?style=for-the-badge

[commits]: https://github.com/spencersmb/custom-etha-honeywell-card/commits/main
[devcontainer]: https://code.visualstudio.com/docs/remote/containers
[discord]: https://discord.gg/5e9yvq
[discord-shield]: https://img.shields.io/discord/330944238910963714.svg?style=for-the-badge
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/c/projects/frontend
[maintenance-shield]: https://img.shields.io/maintenance/yes/2022.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/v/release/spencersmb/custom-etha-honeywell-card?style=for-the-badge&display_name=release&include_prereleases
[releases]: https://github.com/spencersmb/custom-etha-honeywell-card/releases
