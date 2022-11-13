# Honeywell Custom Card for LoveLace UI by [@spencersmb](https://github.com/spencersmb)

A minimalist card design with pop-up settings for Honeywell Thermostats.
(List of supported Units coming)

[![GitHub Release][releases-shield]][releases]
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

## Layout
### Card
<img alt="Example 1" width="400px" src="https://et-email.s3.amazonaws.com/images/example-1.jpg">

### Pop-up Settings
<img alt="Example 2" width="500px" src="https://et-email.s3.amazonaws.com/images/example-2.jpg">


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

Open HACS up and tap on the `Frontend` tab at the top.

### Step 3

In the top right-hand tap the icon with 3 dots. Open it and hit `Custom Repositories`. Here we want to add the following URL for the repository
- URL: `https://github.com/spencersmb/honeywell-smb-card`.
- Category: `Lovelace`

### Step 4

Once it's added, you may need to scroll down in the current popup to see it. You will want to then click on it. A new window should open up with the full description of the new item. Tap the download button in the bottom right hand corner and it should install the new card.

### Step 5

Refresh home-assistant.



## Configuration

```yaml
- type: custom:honeywell-smb-card
  name: Main Floor
  entity: climate.thermostat
```


[commits-shield]: https://img.shields.io/github/commit-activity/m/spencersmb/custom-etha-honeywell-card/main.svg?style=for-the-badge

[commits]: https://github.com/spencersmb/custom-etha-honeywell-card/commits/main
[devcontainer]: https://code.visualstudio.com/docs/remote/containers
[discord]: https://discord.gg/5e9yvq
[discord-shield]: https://img.shields.io/discord/330944238910963714.svg?style=for-the-badge
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/c/projects/frontend
[maintenance-shield]: https://img.shields.io/maintenance/yes/2022.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/v/release/spencersmb/honeywell-smb-card?include_prereleases&sort=date&style=for-the-badge
[releases]: https://github.com/spencersmb/custom-etha-honeywell-card/releases
