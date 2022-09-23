# Objectives - Google Sheet x GTM
This is a prototype project to use Google sheet API to interact with GTM using GTM API, expect to:
- parse the specs and CRUD tags, events, and triggers to GTM
- parse the specs to check if tags, events, and triggers are correctly configured
- use pre-recorded Puppeteer scripts to automate the event triggering sequence

Currently, the project is under development in two parts.

# Before running the code
## To use Google API
- in the Google cloud console, create a service account; invite the service account to the google sheet you want use
- add keys and, download the JSON file, rename it into `token.json` for authentication under the root folder
## To use GTM API
- in the Google cloud console, create a service account and enable GTM API; invite the account to GTM
- add keys and download the JSON file, rename it into `gtm_client_secrets.json` under the root folder
# Google Sheet API
- to use the API in the dev environment, please add

  a. `SPREADSHEET_ID`

  b. `DATALAYER_TITLE`

  c. `SHEET_NAME`

in a `.env` file.
The methodology looks for `DATALAYER_TITLE` in the given sheet and parses the valid specs as JSON syntax.

Depending on the needs, you can modify the `google-sheet.service.ts` function to parse the google sheet cell string.

<details>
<summary>My Format</summary>

    window.dataLayer.push({
      "event" : "component_impression",
      "site_category": "$site_category",
      "component_name": "$component_name",
      "position": "$position"
    })
</details>

# GTM API
According to GTM API, the format could be a lot of options, but I'll give an example

<details>
<summary>The format to create a tag</summary>

    {
      "name": "Event - Test Tag",
      "type": "gaawe",
      "parameter": [
        {
          "type": "boolean",
          "key": "sendEcommerceData",
          "value": "<trueOrFalse>"
        },
        {
          "type": "template",
          "key": "eventName",
          "value": "<eventName>"
        },
        {
          "type": "tagReference",
          "key": "measurementId",
          "value": "<containerId>"
        }],
        "monitoringMetadata": {
            "type": "map"
          },
        "consentSettings": {
            "consentStatus": "notSet"
          },
        "firingTriggerId": ["<triggerId>"]
    }

</details>

