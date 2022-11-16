export type ManageAnnulmentOptions = {
  exchangeToken: string;
  annulmentOperations: {
    annumentOperation: [
      {
        index: number;
        annulmentOperation: 'ANNUL';
        invoiceAnnulment: string;
      }
    ];
  };
};

type InvoiceOperation = 'CREATE' | 'MODIFY' | 'STORNO';

export type ManageInvoiceOptions = {
  exchangeToken: string;
  invoiceOperations: {
    compressedContent: boolean;
    invoiceOperation: [
      {
        index: number;
        invoiceOperation: InvoiceOperation;
        invoiceData: string;
        electronicInvoiceHash?: string;
      }
    ];
  };
};

type InvoiceDirection = 'OUTBOUND' | 'INBOUND';

export type QueryInvoiceChainDigestOptions = {
  page: number;
  invoiceChainQuery: {
    invoiceNumber: string;
    invoiceDirection: InvoiceDirection;
    taxNumber?: string;
  };
};

type InvoiceNumberQuery = {
  invoiceNumber: string;
  invoiceDirection: InvoiceDirection;
  batchIndex?: number;
  supplierTaxNumber?: string;
};

export type QueryInvoiceCheckOptions = {
  invoiceNumberQuery: InvoiceNumberQuery;
};

export type QueryInvoiceDataOptions = {
  invoiceNumberQuery: InvoiceNumberQuery;
};

type RelationQueryMonetary = {
  queryOperator: 'EQ' | 'GT' | 'GTE' | 'LT' | 'LTE';
  queryValue: Date;
};

type DateTimeIntervalParamType = {
  dateTimeFrom: string;
  dateTimeTo: string;
};

export type QueryInvoiceDigestOptions = {
  page: number;
  invoiceDirection: InvoiceDirection;
  invoiceQueryParams: {
    mandatoryQueryParams: {
      invoiceIssueDate?: {
        dateFrom: Date;
        dateTo: Date;
      };
      insDate?: DateTimeIntervalParamType;
      originalInvoiceNumber?: string;
    };
    additionalQueryParams?: {
      taxNumber?: string;
      groupMemberTaxNumber?: string;
      name?: string;
      invoiceCategory?: 'NORMAL' | 'SIMPLIFIED' | 'AGGREGATE';
      paymentMethod?: 'TRANSFER' | 'CASH' | 'CARD' | 'VOUCHER' | 'OTHER';
      invoiceAppearance?: 'PAPER' | 'ELECTRONIC' | 'EDI' | 'UNKNOWN';
      source?: 'WEB' | 'XML' | 'MGM' | 'OPG';
      curreyncy?: string;
    };
    relationalQueryParams?: {
      invoiceDelivery?: RelationQueryMonetary;
      paymentDate?: RelationQueryMonetary;
      invoiceNetAmount?: RelationQueryMonetary;
      invoiceNetAmountHUF?: RelationQueryMonetary;
      invoiceVatAmount?: RelationQueryMonetary;
      invoiceVatAmountHUF?: RelationQueryMonetary;
    };
    transactionQueryParams?: {
      transactionId?: string;
      index?: string;
      invoiceOperation?: InvoiceOperation;
    };
  };
};

export type QueryTransactionListOptions = {
  page: number;
  insDate: DateTimeIntervalParamType;
  requestStatus?: 'RECEIVED' | 'PROCESSING' | 'SAVED' | 'FINISHED' | 'NOTIFIED';
};

export type QueryTransactionStatusOptions = {
  transactionId: string;
  returnOriginalRequest?: boolean;
};

export type QueryTaxpayerOptions = {
  taxNumber: string;
};
