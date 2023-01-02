import { Schema, model } from 'mongoose';

const logSchema = new Schema(
  {
    requestXml: String,
    responseXml: String,
    error: {
      funcCode: String, // feldolgozási eredmény
      errorCode: String, // a feldolgozási hibakód
      message: String, // Feldolgozási üzenet
      notification: {
        notificationCode: String, // Értesítés kód
        notificationText: String, // Értesítés szöveg
      },
      // egyéb értesítés
      technicalValidationMessages: [
        {
          validationResultCode: String, // Technikai validáció eredménye;
          validationErrorCode: String, // Validációs hibakód;
          message: String, // Feldolgozási üzenet;
        },
      ],
    },
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' },
  },
  { timestamps: true }
);

export default model('Log', logSchema);

export type logType = {
  requestXml?: string;
  responseXml?: string;
  error?: {
    funcCode?: string; // feldolgozási eredmény
    errorCode?: string; // a feldolgozási hibakód
    message?: string; // Feldolgozási üzenet
    notification: {
      notificationCode?: string; // Értesítés kód
      notificationText?: string; // Értesítés szöveg
    };
    // egyéb értesítés
    technicalValidationMessages: {
      validationResultCode?: string; // Technikai validáció eredménye;
      validationErrorCode?: string; // Validációs hibakód;
      message?: string; // Feldolgozási üzenet;
    }[];
  };
  invoice?: string;
};
