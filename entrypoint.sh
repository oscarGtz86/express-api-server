#!/bin/bash
################################################################
# Written by: Oscar Escamilla                                  #
# Purpose: API server entrypoint                               #
# Date: 04.02.2022                                             #
################################################################

#set -e

################
# function logger
################
# {
#     echo "[$(date +"%Y-%m-%d %T")] $1"
# }

# Setting user
# USER_ID=${LOCAL_USER_ID:-9001}
# logger "Starting with UID : $USER_ID"

# id -nu $USER_ID
# if [[ $? != 0 ]]; then
#     logger "create user"
#     useradd --shell /bin/bash -u $USER_ID -o -c "" -m user
# else
#     logger "user already"
# fi

# export HOME=/home/user

# if [[ "$1" = 'run' ]]; then
#     /usr/local/bin/gosu user npm start
# else
#     logger "Params: $@"
#     exec /usr/local/bin/gosu user "$@"
# fi

if [[ "$1" = 'run' ]]; then
    npm start
else
    logger "Params: $@"
    exec "$@"
fi