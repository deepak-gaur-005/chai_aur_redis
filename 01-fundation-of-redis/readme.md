<!-- 
 # Redis Learning Notes

 ## Day 1: Core Fundamentals 
 
 ### 1. Definition & Analogy
 
  - Redis = Remote Dictionary Server (In-memory key-value store). 
  - Works on RAM (Super fast). 
  - Main DB = Source of Truth (Permanent ledger). 
  - Redis = Blackboard on front counter (Temporary reference for hot data). 
  
  ### 2. RAM vs Disk & Backups 
  
  - DB stores on Disk (Permanent but slow). 
  - Redis stores in RAM (Fast but volatile). 
  - Persistence: Redis periodically saves snapshots to Disk. Reloads to RAM on startup. 
  
  ### 3. Read vs Write Flow 
  - Cache Hit: Found in Redis -> Fast response. 
  - Cache Miss: Not in Redis -> Fetch from DB -> Save to Redis -> Respond. 
  - Write Path: Writes go to Primary DB first (safe), then cache is invalidated/cleared. 
  
  ### 4. Key Use Cases 
  - Caching (saving DB reads). 
  - Session Store (shared login states across servers). 
  - OTPs with TTL-time to live (temporary, auto-deleting data). 
  - Rate Limiting (preventing API abuse using counters). 
  - Job Queues (managing background tasks via Lists). 
  
  ### 5. Keys &amp; Naming 
  - Use colons (`:`) as separators (e.g., `user:100:profile`). 
  - Prevents collision and groups keys into folders in GUI tools. 
  
  ### 6. Network Latency 
  - Keep Redis and Backend App in the same VPC/Network to avoid slow network overheads.

 -->