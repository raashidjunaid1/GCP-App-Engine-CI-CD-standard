# tl;dr
Testing CI CD with GCP Cloud Build and app engine for standard env

## Steps to follow: 
* Create a git repo with your server
* add a app.yaml file for your app in this case it is a nodejs app:
```
runtime: nodejs12
```
* you can add environment variables to app.yaml like so, we will replace the ENV_1_VALUE with actual value in the pipeline:
``` 
env_variables:
  API_KEY: "ENV_1_VALUE"
```
* add a cloudbuild.yaml (you can name these different for different environments):
```
steps:
- name: 'ubuntu'
  args: ['bash', './setEnvironmentVariables.sh']
  env:
  - '_RANDOM_VALUE=$_RANDOM_VALUE'
- name: 'gcr.io/cloud-builders/npm'
  args: ['install']
- name: "gcr.io/cloud-builders/gcloud"
  args: ["app", "deploy"]
timeout: "1600s"
```
* also include the environment variable, (note _RANDOM_VALUE)
* Note the first step, we will use that to update the env values in app.yaml
* setEnvironmentVariables.sh :
```
echo "value : $RANDOM_VALUE"
sed -i -e  "s/ENV_1_VALUE/$_RANDOM_VALUE/g" app.yaml
```
* sed command just replaces ENV_1_VALUE in app.yaml with $_RANDOM_VALUE which we will set in under the triggers section in GCP Cloud Build
* push this to git
* follow this GCP guide to [enable gcp apis](https://cloud.google.com/source-repositories/docs/quickstart-triggering-builds-with-source-repositories)
* once the apis have been enabled, navigate to Cloud Build
* create a new trigger
* set the repo, and specify the cloudbuild.yaml
* under variable set the value for _RANDOM_VALUE, note user variables need to be appended with _ as per GCP docs
* click save or something like that
* and click on run 

_hopefully it works smoothly_
