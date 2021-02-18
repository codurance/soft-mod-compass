FROM node:10-slim

# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4 gnupg2 ca-certificates

# Install required dependencies
# See: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker
RUN apt-get update \
   && apt-get install -y wget gnupg \
   && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
   && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
   && apt-get update \
   && apt-get install -y google-chrome-stable \
     fonts-ipafont-gothic \
     fonts-wqy-zenhei \
     fonts-thai-tlwg \
     fonts-kacst \
     fonts-freefont-ttf \
     libxss1 \
#     missing lib for pupeteer
     libxtst6 \
     --no-install-recommends \
   && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY ./server .
RUN ls -la -R

COPY ./node_modules ./node_modules

EXPOSE 8080

CMD node ./index.js
