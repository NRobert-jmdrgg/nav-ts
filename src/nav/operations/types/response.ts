import { resSoftware, BasicHeader, BasicResult } from '../../baseTypes';

/**
 * Nav válasz xml struktúrák
 */

export type TokenExchangeResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  encodedExchangeToken: [string];
  tokenValidityFrom: [Date];
  tokenValidityTo: [Date];
};

export type ManageAnnulmentResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  transactionId: [string];
};

export type ManageInvoiceResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  transactionId: [string];
};

export type InvoiceChainDigestType = {
  invoiceNumber: [string];
  batchIndex: [number];
  invoiceOperation: [string];
  supplierTaxNumber: [string];
  customerTaxNumber: [string];
  insDate: [Date];
  originalRequestVersion: [string];
};

export type InvoiceLinesType = {
  maxLineNumber: [number];
  newCreatedLines: {
    lineNumberIntervalStart: [number];
    lineNumberIntervalEnd: [number];
  }[];
};

export type InvoiceChainElementType = {
  invoiceChainDigest: [InvoiceChainDigestType];
  invoiceLines?: [InvoiceLinesType];
  invoiceReferenceData?: [
    {
      originalInvoiceNumber: [string];
      modifyWithoutMaster: [boolean];
      modificationTimestamp?: [Date];
      modificationIndex?: [number];
    }
  ];
};

export type QueryInvoiceChainDigestResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  InvoiceChainDigestResult: [
    {
      currentPage: [number];
      availablePage: [number];
      invoiceChainElement: InvoiceChainElementType[];
    }
  ];
};

export type QueryInvoiceCheckResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  invoiceCheckResult: [boolean];
};

export type QueryInvoiceDataResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  invoiceDataResult?: [
    {
      invoiceData: [string];
      auditData: [
        {
          insDate: [Date];
          insCusUser: [string];
          source: [string];
          transactionId?: [string];
          index?: [number];
          batchIndex?: [number];
          originalRequestVersion: [string];
        }
      ];
      compressedContentIndicator: [boolean];
      electronicInvoiceHash?: [string];
    }
  ];
};

export type InvoiceDigestType = {
  invoiceNumber: [string];
  batchIndex?: [number];
  invoiceOperation: [string];
  invoiceCategory: [string];
  invoiceIssueDate: [Date];
  supplierTaxNumber: [string];
  supplierGroupMemberTaxNumber?: [string];
  supplierName: [string];
  customerTaxNumber?: [string];
  customerGroupMemberTaxNumber?: [string];
  customerName?: [string];
  paymentMethod?: [string];
  paymentDate?: [Date];
  invoiceAppearance?: [string];
  source?: [string];
  invoiceDeliveryDate?: [Date];
  currency?: [string];
  invoiceNetAmount?: [number];
  invoiceNetAmountHUF?: [number];
  invoiceVatAmount?: [number];
  invoiceVatAmountHUF?: [number];
  transactionId?: [string];
  index?: [number];
  originalInvoiceNumber?: [string];
  modificationIndex?: [number];
  insDate: [string];
  completenessIndicator?: [boolean];
};

export type QueryInvoiceDigestResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  invoiceDigestResult: [
    {
      currentPage: [number];
      availablePage: [number];
      invoiceDigest?: InvoiceDigestType[];
    }
  ];
};

export type TransactionType = {
  insDate: [Date];
  insCusUser: [string];
  source: [string];
  transactionId: [string];
  technicalAnnulment: [boolean];
  originalRequestVersion: [string];
  itemCount: [number];
};

export type QueryTransactionListResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  transactionListResult: [
    {
      currentPage: [number];
      availablePage: [number];
      transaction?: TransactionType[];
    }
  ];
};

export type TechnicalValidationMessagesType = {
  validationResultCode: [string];
  validationErrorCode: [string];
  message?: [string];
};

export type PointerType = {
  tag?: [string];
  value?: [string];
  line?: [number];
  originalInvoiceNumber?: [string];
};

export type BusinessValidationMessagesType = {
  validationResultCode: [string];
  validationErrorCode: [string];
  message?: [string];
  pointer?: PointerType[];
};

export type ProcessingResultType = {
  index: [number];
  batchIndex?: [number];
  invoiceStatus: [string];
  technicalValidationMessages?: TechnicalValidationMessagesType[];
  businessValidationMessages?: BusinessValidationMessagesType[];
  compressedContent: [boolean];
  originalRequest?: [string];
};

export type QueryTransactionStatusResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  processsingResult?: [
    {
      processingResult: ProcessingResultType[];
      originalRequestVersion: [string];
      annulmentData?: [
        {
          annulmentVerificationStatus: [string];
          annulmentDecisionDate?: [Date];
          annulmentDecisionUser?: [string];
        }
      ];
    }
  ];
};

export type TaxpayerAddressItemType = {
  taxpayerAddressType: [string];
  taxpayerAddress: [
    {
      region?: [string];
      postalCode: [string];
      city: [string];
      streetName: [string];
      publicPlaceCategory: [string];
      number?: [string];
      building?: [string];
      staircase?: [string];
      floor?: [string];
      door?: [string];
      lotNumber?: [string];
    }
  ];
};

export type QueryTaxpayerResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  infoDate?: [Date];
  taxpayerValidity?: [boolean];
  taxpayerData?: [
    {
      taxpayerName: [string];
      taxpayerShortName?: [string];
      taxNumberDetail: [
        {
          taxpayerId: [string];
          vatCode?: [string];
          countyCode?: [string];
        }
      ];

      incorporation: [string];
      vatGroupMembership?: [string];
      taxpayeraddressList?: [
        {
          taxpayerAddressItem: TaxpayerAddressItemType[];
        }
      ];
    }
  ];
};
