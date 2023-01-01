import { Schema, model } from 'mongoose';

const logSchema = new Schema({
  requestXml: String,
  responseXml: String,
  error: String,
  timestamp: Date,
  invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' },
});

export default model('Log', logSchema);
