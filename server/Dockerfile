
FROM node:20
WORKDIR /src/index
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    python3 \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . /src/index
ENV SERVER_PORT=$SERVER_PORT
EXPOSE $SERVER_PORT
CMD npm start