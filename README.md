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

Make sure the [HACS](https://github.com/hacs/integration) component is installed and working.

### Step 2

Tap the HACS menu in the sidebar top open HACS. Look for the `Frontend` tab and click it.

### Step 3

In the top right-hand corner there should be an icon with 3 dots. Open it and a pop-up should appear that is title `Custom Repositories`. Here we want to add the following URL for the repository
- URL: `https://github.com/spencersmb/custom-etha-honeywell-card`.
- Category: `Lovelace`

![HACS Integration](https://my.home-assistant.io/badges/lovelace_resources.svg)
- Add Resource
- url: `local/community/honeywell-smb-card/honeywell-smb-card.js`
- Select `JavaScript Module` as the Resource Type
- Click `Create`

### Step 4
Restart home-assistant.

## Example

### Home.yaml file


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
