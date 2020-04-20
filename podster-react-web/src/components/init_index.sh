#!/bin/bash

for dir in ./*/
do
    if [[ -d $dir ]]
    then
        file="${dir}index.js"
        name=$(echo $dir | sed 's|[/.]||g')
        TEMPLATE="import React from 'react';

const ${name} = () => (
  <div>
    <h1>${name}</h1>
  </div>
);

export default ${name};"
        echo "$TEMPLATE" > $file
    fi
done
echo "OK!"
