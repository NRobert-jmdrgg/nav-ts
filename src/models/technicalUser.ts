import { Schema, model } from 'mongoose';

const technicalUserSchema: Schema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  taxNumber: { type: String, required: true },
  exchangeKey: { type: String, required: true },
  signatureKey: { type: String, required: true },
});

export default model('TechnicalUser', technicalUserSchema);
