# COVID-19 dataset frontend

There is new data for the COVID-19 Target Prioritisation tool, using data from our 21.02 release - see [#1324](https://github.com/opentargets/platform/issues/1324) for more information.

Based on a review of the notes in [#1160](https://github.com/opentargets/platform/issues/1160) and the ot_covid19-frontend codebase (specifically the `update.js` file), the process to refresh the data is:

* Download the latest release data in JSON (`.zip`) format
* Rename the file to `targets_integrated_data-rev_10.zip`
* Upload the `.zip` file in the open-targets-covid-prioritisation bucket
* Update the `current_revision.json` to be: 
<pre>
{
"current_revision": "targets_integrated_data-rev_10"
}
</pre>


Three things are important in the deploy process:

* The file type must be `.zip` as `.gzip` files will not be processed correctly. If the file type in the Google Cloud bucket is `.gzip`, you will see the following console log error:</li>

![Screenshot](https://user-images.githubusercontent.com/7490258/108068035-7f97ff00-7059-11eb-96a1-2ff51d371295.png)

* The JSON file contained in the `.zip` file must have a `.json` extension. If the file does not have a `.json` extension, you will see the following console log error:

![Screenshot](https://user-images.githubusercontent.com/7490258/108068211-b110ca80-7059-11eb-8568-39a2c6b15c18.png)

* Google caches the [current_revision.json file](https://storage.googleapis.com/open-targets-covid-prioritisation/current_revision.json) for a default of 3600 seconds, which can cause issues with the console log showing the incorrect version. 
To fix this, you can re-upload the `current_revision.json` file and adjust the `Cache-Control` metadata and set to `no-cache`.
