import { Schema, model } from 'mongoose';

const invoiceSchema: Schema = new Schema(
  {
    invoiceNumber: { type: String, required: true },
    transactionId: Number,
    invoiceData: { type: String, required: true },
    auditData: {
      insDate: { type: Date, required: true },
      insCusUser: { type: String, required: true },
      source: { type: String, required: true },
      transactionId: String,
      index: Number,
      batchIndex: Number,
    },
    batchIndex: Number, // Számla vagy módosító okirat sorszáma
    invoiceOperation: { type: String, required: true }, // Számlaművelet típusa
    invoiceCategory: { type: String, required: true }, // Számla típusa
    invoiceIssueDate: { type: Date, required: true }, // Számla vagy módosító okirat kiállítási dátuma
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'Partner',
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Partner',
    },
    paymentMethod: String, // Fizetési mód
    paymentDate: Date, // Fizetési határidő
    invoiceAppearance: String, // A számla megjelenési formája;
    source: String, //  Az adatszolgáltatás forrása;
    invoiceDeliveryDate: Date, // A számla teljesítési dátuma;
    currency: String, // A számla pénzneme
    invoiceNetAmount: Number, // A számla nettó összege a számla pénznemében
    invoiceNetAmountHUF: Number, // A számla nettó összege forintban;
    invoiceVatAmount: Number, //  A számla áfa összege a számla pénznemében
    invoiceVatAmountHUF: Number, // A számla áfa összege forintban;
    index: Number, // A számla sorszáma a kérésen belül
    originalInvoiceNumber: String, // Az eredeti számla sorszáma, amelyre a módosítás vonatkozik
    modificationIndex: Number, // A számlára vonatkozó módosító okirat egyedi sorszáma
    insDate: { type: String, required: true }, // A rendszerbe történő beérkezés időpontja UTC időben
    completenessIndicator: Boolean, // Az adatszolgáltatás maga az elektronikus számla
  },
  // options
  {
    statics: {
      findByInvoiceNumber(invoiceNumber) {
        return this.find({ invoiceNumber: invoiceNumber });
      },
      findByTransactionId(id) {
        return this.find({ transactionId: id });
      },
    },
  }
);

export default model('Invoice', invoiceSchema);

export type InvoiceSchemaType = {
  invoiceNumber: string;
  transactionId?: number;
  invoiceData: string;
  auditData: {
    insDate: Date;
    insCusUser: string;
    source: string;
    transactionId: String;
    index?: number;
    batchIndex?: number;
  };
  batchIndex?: number; // Számla vagy módosító okirat sorszáma
  invoiceOperation: string;
  invoiceCategory: string;
  invoiceIssueDate: Date;
  supplier: {
    type: Schema.Types.ObjectId;
    ref: 'Partner';
  };
  customer: {
    type: Schema.Types.ObjectId;
    ref: 'Partner';
  };
  paymentMethod?: string; // Fizetési mód
  paymentDate?: Date; // Fizetési határidő
  invoiceAppearance?: string; // A számla megjelenési formája;
  source?: string; //  Az adatszolgáltatás forrása;
  invoiceDeliveryDate?: Date; // A számla teljesítési dátuma;
  currency?: string; // A számla pénzneme
  invoiceNetAmount?: number; // A számla nettó összege a számla pénznemében
  invoiceNetAmountHUF?: number; // A számla nettó összege forintban;
  invoiceVatAmount?: number; //  A számla áfa összege a számla pénznemében
  invoiceVatAmountHUF?: number; // A számla áfa összege forintban;
  index?: number; // A számla sorszáma a kérésen belül
  originalInvoiceNumber?: string; // Az eredeti számla sorszáma, amelyre a módosítás vonatkozik
  modificationIndex?: number; // A számlára vonatkozó módosító okirat egyedi sorszáma
  insDate: string;
  completenessIndicator?: boolean; // Az adatszolgáltatás maga az elektronikus számla
};
