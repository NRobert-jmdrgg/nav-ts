export type AnnulmentOperation = {
  index: number;
  annulmentOperation: string;
  invoiceAnnulment: string;
};

export type InvoiceOperation = {
  index: number;
  invoiceOperation: string;
  invoiceData: string;
  electronicInvoiceHash?: string;
};
