#!/usr/bin/env bash

sed -i "s/worker_processes\s*1;/worker_processes 3;/g" /etc/nginx/nginx.conf
