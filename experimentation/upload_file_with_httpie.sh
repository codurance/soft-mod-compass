#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"


FILE=$DIR/img.png
# FILE=$DIR/text.txt
URL=http://5968187b6f2a38081989c8216ddf1dae.m.pipedream.net

http \
    -f POST \
    $URL \
    yo@$FILE \
    asdf@$FILE
