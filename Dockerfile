# --- Build Stage ---
    FROM oven/bun:1 AS builder

    WORKDIR /app
    
    # Copy package file dulu biar cache optimal
    COPY package.json bun.lockb* ./
    
    # Install deps (pakai bun)
    RUN bun install
    
    # Copy semua source
    COPY . .
    
    # Build Astro
    RUN bun run build
    
    # --- Runtime Stage ---
    FROM oven/bun:1 AS runner
    
    WORKDIR /app
    
    # Copy hanya hasil build dan package.json (buat install prod deps kalau perlu)
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/bun.lockb* ./
    
    # Install prod deps doang
    RUN bun install --production
    
    ENV PORT=3000
    EXPOSE 3000
    
    CMD ["bun", "./dist/server/entry.mjs"]    