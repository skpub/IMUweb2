#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 \
     --username "$DB_USER" \
     --dbname "$DB_NAME" \
     -v admin_uuid="$ADMIN_UUID" \
     -v admin_username="$ADMIN_USERNAME" <<-EOSQL
    INSERT INTO users (id, username, permission)
    VALUES (:'admin_uuid', :'admin_username', 0);
EOSQL
