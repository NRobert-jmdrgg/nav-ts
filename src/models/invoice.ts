import { Schema, model } from 'mongoose';

const invoiceSchema: Schema = new Schema({
  invoiceNumber: String,
  transactionId: Number,
  invoiceData: String,
  auditData: {
    insDate: Date,
    insCusUser: String,
    source: String,
    transactionId: String,
    index: Number,
    batchIndex: Number,
  },
  batchIndex: Number, // Számla vagy módosító okirat sorszáma
  invoiceOperation: String, // Számlaművelet típusa
  invoiceCategory: String, // Számla típusa
  invoiceIssueDate: Date, // Számla vagy módosító okirat kiállítási dátuma
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
  insDate: String, // A rendszerbe történő beérkezés időpontja UTC időben
  completenessIndicator: Boolean, // Az adatszolgáltatás maga az elektronikus számla
});

export default model('Invoice', invoiceSchema);
