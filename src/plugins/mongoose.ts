import { FastifyInstance, FastifyPluginAsync } from 'fastify';
// import mongoose from 'mongoose';

const connectDB: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  try {
    // await mongoose.connect(process.env.DB_CONNECT_URI as string);
    // fastify.log.info('DB is Connecting...');
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
