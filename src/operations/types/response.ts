import { Software, BasicHeader, BasicResult } from '../../baseTypes';

/**
 * Nav válasz xml struktúrák
 */

export type TokenExchangeResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
  encodedExchangeToken: [string];
  tokenValidityFrom: [Date];
  tokenValidityTo: [Date];
};

export type ManageAnnulmentResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
  transactionId: [string];
};

export type ManageInvoiceResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
  transactionId: [string];
};

export type QueryInvoiceChainDigestResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
  InvoiceChainDigestResult: [
    {
      currentPage: [number];
      availablePage: [number];
      invoiceChainElement: {
        invoiceChainDigest: [
          {
            invoiceNumber: [string];
            batchIndex: [number];
            invoiceOperation: [string];
            supplierTaxNumber: [string];
            customerTaxNumber: [string];
            insDate: [Date];
            originalRequestVersion: [string];
          }
        ];
        invoiceLines?: [
          {
            maxLineNumber: [number];
            newCreatedLines: {
              lineNumberIntervalStart: [number];
              lineNumberIntervalEnd: [number];
            }[];
          }
        ];
        invoiceReferenceData?: [
          {
            originalInvoiceNumber: [string];
            modifyWithoutMaster: [boolean];
            modificationTimestamp?: [Date];
            modificationIndex?: [number];
          }
        ];
      }[];
    }
  ];
};

export type QueryInvoiceCheckResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
  invoiceCheckResult: [boolean];
};

export type QueryInvoiceDataResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
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

export type QueryInvoiceDigestResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
  invoiceDigestResult: [
    {
      currentPage: [number];
      availablePage: [number];
      invoiceDigest?: {
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
      }[];
    }
  ];
};

export type QueryTransactionListResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
  transactionListResult: [
    {
      currentPage: [number];
      availablePage: [number];
      transaction?: {
        insDate: [Date];
        insCusUser: [string];
        source: [string];
        transactionId: [string];
        technicalAnnulment: [boolean];
        originalRequestVersion: [string];
        itemCount: [number];
      }[];
    }
  ];
};

export type QueryTransactionStatusResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
  processsingResult?: [
    {
      processingResult: {
        index: [number];
        batchIndex?: [number];
        invoiceStatus: [string];
        technicalValidationMessages?: {
          validationResultCode: [string];
          validationErrorCode: [string];
          message?: [string];
        }[];

        businessValidationMessages?: {
          validationResultCode: [string];
          validationErrorCode: [string];
          message?: [string];
          pointer?: {
            tag?: [string];
            value?: [string];
            line?: [number];
            originalInvoiceNumber?: [string];
          }[];
        }[];

        compressedContent: [boolean];
        originalRequest?: [string];
      }[];
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

export type QueryTaxpayerResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  Software: [Software];
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
          taxpayerAddressItem: {
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
          }[];
        }
      ];
    }
  ];
};
