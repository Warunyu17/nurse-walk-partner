import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/move-for-health';

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 * 
 * Optimized for Vercel Serverless:
 * - Reduced pool size (serverless doesn't share connections across invocations well)
 * - Lower timeouts for faster fail-fast
 * - Force IPv4 to avoid IPv6 DNS resolution delays
 * - Heartbeat to keep connection alive within the same invocation
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose;

if (!cached) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // Return cached connection if it's still alive
    if (cached.conn) {
        // Verify connection is still active
        if (mongoose.connection.readyState === 1) {
            return cached.conn;
        }
        // Connection was lost, reset cache
        cached.conn = null;
        cached.promise = null;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 5,                  // Smaller pool for serverless
            minPoolSize: 1,                  // Keep at least 1 connection ready
            serverSelectionTimeoutMS: 3000,  // Fail fast: 3s instead of 30s
            connectTimeoutMS: 3000,          // Connection timeout: 3s
            socketTimeoutMS: 30000,          // Close sockets after 30s of inactivity
            heartbeatFrequencyMS: 10000,     // Check connection health every 10s
            family: 4,                       // Force IPv4 (avoids IPv6 DNS delays)
            retryWrites: true,
            retryReads: true,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('MongoDB connected successfully');
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
