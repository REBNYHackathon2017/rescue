FROM ubuntu:16.04

WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y curl \
    vim \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy code into image filesystem
COPY . /usr/src/app

# Install app dependencies
RUN npm install

EXPOSE 3002
    
CMD ["npm", "start"]