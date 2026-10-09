FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY express ./express

# Captured logs and payloads live here, mount a volume to keep them.
ENV HIVE_DIR=/data
RUN mkdir -p /data && chown node:node /data
VOLUME ["/data"]

# The honeypot stores malware. It does not need to be root to do it.
USER node

ENV PORT=3001
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "express/server.js"]
