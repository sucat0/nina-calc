module.exports = {
    ...require("@sucat0/prettier-config"),
    "plugins": ["prettier-plugin-svelte"],
    "overrides": [{"files": "*.svelte", "options": {"parser": "svelte"}}]
}