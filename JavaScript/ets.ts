.organization - variables: & organization - variables
ORGANIZATION: "支付中心"

  .branch - variables: & branch - variables
DEFAULT_BRANCH: master

  .proxy - variables: & proxy - variables
PROXY: http://proxygate2.ctripcorp.com:8080
HTTP_PROXY: $PROXY
HTTPS_PROXY: $PROXY
NO_PROXY: ".ctripcorp.com"

  .cache - variables: & cache - variables
CACHE_KEY: ${ CI_COMMIT_REF_SLUG } -${ CI_COMMIT_SHORT_SHA }

.maven - variables: & maven - variables
MAVEN_VERSION: <no value >
  MAVEN_OPTS: -Xmx4096m - Xms4096m
ARTIFACTORY_MAVEN_TOKEN:
value: **********
  masked: true
ARTIFACTORY_MAVEN_USER: "trip-maven-reader"

  .sonar - variables: & sonar - variables
SONAR_HOST: 'http://sonarqube.ci.release.ctripcorp.com'
SONAR_LOGIN:
value: **********
  masked: true

    .node - variables: & node - variables
NODE_OPTIONS: "--max-old-space-size=4096"
ARTIFACTORY_NPM_TOKEN:
value: **********
  masked: true

    .image - variables: & image - variables
DOCKER_HOST: "tcp://docker:2375"
DOCKER_TLS_CERTDIR: ""
REGISTRY: "hub.cloud.ctripcorp.com"
IMAGE_PROJECT: "gitlab-ci"
IMAGE_REPO: "${REGISTRY}/${IMAGE_PROJECT}/${APP_ID}"
IMAGE_TAG: "${CI_COMMIT_REF_SLUG}-${CI_COMMIT_SHORT_SHA}-${CI_JOB_ID}"
REGISTRY_USER: "app-pebble"
REGISTRY_TOKEN:
value: **********
  masked: true

    .tcr - image - variables: & tcr - image - variables
TCR_REGISTRY_USER: trip - scm - ci - writer
TCR_REGISTRY_TOKEN:
value: **********
  masked: true
TCR_REGISTRY: tcr.artifactory.release.ctripcorp.com
IMAGE_REPO: ${ TCR_REGISTRY } /${IMAGE_PROJECT}/${ APP_ID }

.gitlab - variables: & gitlab - variables
GITLAB_HOST: http://git.dev.sh.ctripcorp.com
GITLAB_TOKEN:
value: **********
  masked: true
IMAGE_SERVICE_TOKEN:
value: **********
  masked: true

    .ibu - aws - variables: & ibu - aws - variables
AWS_ACCESS_KEY_ID:
    : value: **********
    : masked: true
AWS_SECRET_ACCESS_KEY:
    : value: **********
    : masked: true

  .dind - service: & dind - service
    - alias: docker
name: hub.cloud.ctripcorp.com / devops / docker - dind - 20.10.24: latest
command:
- dockerd
  - --host=tcp://127.0.0.1:2375 
- --storage - driver=overlay2
  - --insecure - registry=hub.cloud.ctripcorp.com
    - --tls=false

      .alma - dind - service: & alma - dind - service
        - alias: docker
name: hub.cloud.ctripcorp.com / devops / docker - dind - 20.10.24: latest
command:
- dockerd
  - --host=tcp://127.0.0.1:2375
- --storage - driver=overlay2
  - --insecure - registry=hub.cloud.ctripcorp.com
    - --tls=false

      .captain - variables: & captain - variables
CAPTAIN_HOST: "http://captain.release.ctripcorp.com"
CAPTAIN_TOKEN:
value: **********
  masked: true

    .captain - ci - variables: & captain - ci - variables
CAPTAIN_CI_DOWNLOAD_URL: http://git.dev.sh.ctripcorp.com/captain/captain-ci/-/jobs/artifacts/master/raw/captain-ci?job=Build

.ctrip - auto - devops: & ctrip - auto - devops |
  download_captain_ci() {
  if [$# - gt 0] && ["$1" = "shell_mode"]; then
  OUTPUT_FILE = "$CI_PROJECT_DIR/captain-ci"
      echo "Downloading captain-ci to unique directory: $OUTPUT_FILE"
    else
  OUTPUT_FILE = "/bin/captain-ci"
      echo "Downloading captain-ci to: $OUTPUT_FILE"
  fi
  if !wget "$CAPTAIN_CI_DOWNLOAD_URL" - O "$OUTPUT_FILE" - q; then
      echo "Error: Failed to download captain-ci."
  if [-n "$RANDOM_DIR"]; then
  rm - rf "$RANDOM_DIR"
  fi
  return 1
  fi
  chmod + x "$OUTPUT_FILE"
    echo "Downloaded and made executable: $OUTPUT_FILE"
}

cleanup_shell_mode_dirs() {
    echo "Cleaning up (keep only top-level *.json)..."
  if [-z "${CI_PROJECT_DIR:-}"] || [! -d "$CI_PROJECT_DIR"]; then
      echo "CI_PROJECT_DIR is not set or not a directory, skip."
  return 0
  fi
    find "$CI_PROJECT_DIR" - mindepth 2 - type f - delete
    find "$CI_PROJECT_DIR" - maxdepth 1 - type f! - iname '*.json' - delete
      find "$CI_PROJECT_DIR" - mindepth 1 - type l - delete
        find "$CI_PROJECT_DIR" - depth - mindepth 1 - type d - empty - delete
    if [-d "$CI_PROJECT_DIR.tmp"]; then
  rm - rf "$CI_PROJECT_DIR.tmp"
      echo "Removed $CI_PROJECT_DIR.tmp directory"
  fi
    echo "Cleanup done (kept only top-level *.json if any)."
}


.npm - config - set: & npm - config - set |
  npm_set_artifactory() {
    npm config set - g registry = https://artifactory.release.ctripcorp.com/artifactory/api/npm/trip-npm-prod/
    npm config set - g //artifactory.release.ctripcorp.com/artifactory/api/npm/trip-npm-prod/:username=trip-npm-reader
    npm config set - g //artifactory.release.ctripcorp.com/artifactory/api/npm/trip-npm-prod/:_password=$ARTIFACTORY_NPM_TOKEN
    npm config set - g strict - ssl=false
    npm config set registry = https://artifactory.release.ctripcorp.com/artifactory/api/npm/trip-npm-prod/
    npm config set //artifactory.release.ctripcorp.com/artifactory/api/npm/trip-npm-prod/:username=trip-npm-reader
    npm config set //artifactory.release.ctripcorp.com/artifactory/api/npm/trip-npm-prod/:_password=$ARTIFACTORY_NPM_TOKEN
    npm config set strict - ssl=false
}

.pip - variables: & pip - variables
PIP_INDEX_URL: "https://artifactory.release.ctripcorp.com/artifactory/api/pypi/trip-pypi-prod/simple"
PIP_TRUSTED_HOST: "artifactory.release.ctripcorp.com"


variables:
GIT_DEPTH: 5
IS_DOWN_GRADE: "false"
FORCE_COLOR: "true"
NPM_CONFIG_FUND: "false"
NPM_CONFIG_AUDIT: "false"
ADBLOCK: "true"
SUPPRESS_SUPPORT: "true"
DISABLE_OPENCOLLECTIVE: "true"

PayPreBuildAIAnalysis:
stage: PayPreBuildAIAnalysis
image: hub.cloud.ctripcorp.com / devops / almalinux - nodejs20: latest
tags:
- official - uat
cache:
- key: $CI_COMMIT_REF_SLUG - $CI_COMMIT_SHORT_SHA
paths:
- node_modules
  - pay_cicd_base
  - scripts
policy: pull - push
script:
- ./ node_modules /.bin / pay - cicd - cli prebuild
rules:                                    # 原来的 rules 删掉，换成下面两行
  - if: '$CI_PIPELINE_SOURCE == "push" && ($CI_COMMIT_BRANCH == "master" || $CI_COMMIT_BRANCH == "release")'
when: on_success
  - when: never            
