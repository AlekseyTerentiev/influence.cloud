# !/bin/bash

# Get servers list:
set - f
# Variables from GitLab server:
# Note: They can't have spaces!!
string=$DEPLOY_SERVER
array=(${string//,/ })

# Iterate servers for deploy and pull last commit
# Careful with the ; https://stackoverflow.com/a/20666248/1057052
for i in "${!array[@]}"; do
  echo "Deploy project on server ${array[i]}"
  ssh ubuntu@${array[i]} "cd ./influence_cloud/vr && git stash  && git checkout $CI_BUILD_REF_NAME && git stash && git pull origin master && yarn install && npm run build && pm2 restart all"
done
