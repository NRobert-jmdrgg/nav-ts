export type TaxNumberType = {
  taxpayerId: [string];
  vatCode?: [string];
  countyCode?: [string];
};

export type SimpleAddressType = {
  countryCode: [string];
  region?: [string];
  postalCode: [string];
  city: [string];
  additionalAddressDetail: [string];
};

export type DetailedAddressType = {
  countryCode: [string];
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
};

export type AddressType = {
  simpleAddress?: [SimpleAddressType];
  detailedAddress?: [DetailedAddressType];
};

export type CustomerVatDataType = {
  customerTaxNumber: [
    {
      taxpayerId: [string];
      vatCode?: [string];
      countyCode?: [string];
      groupMemberTaxNumber?: [TaxNumberType];
    }
  ];
};

export type ConventionalInvoiceInfoType = {
  orderNumbers: [{ orderNumber: string[] }];
  deliveryNotes: [{ deliveryNote: string[] }];
  shippingDates: [{ shippingDate: string[] }];
  contractNumbers: [{ contractNumber: string[] }];
  supplierCompanyCodes: [{ supplierCompanyCode: string[] }];
  customerCompanyCodes: [{ customerCompanyCode: string[] }];
  dealerCodes: [{ dealerCode: string[] }];
  costCenters: [{ costCenter: string[] }];
  projectNumbers: [{ projectnumber: string[] }];
  generalLedgerAccountNumbers: [{ generalLedgerAccountNumber: string[] }];
  glnNumbersSupplier: [{ glnNumber: string[] }];
  glnNumbersCustomer: [{ glnNumber: string[] }];
  materialNumbers: [{ materialNumber: string[] }];
  itemNumbers: [{ itemNumber: string[] }];
  ekaerIds: [{ ekaerId: string[] }];
};

export type AdditionalDataType = {
  dataName: [string];
  dataDescription: [string];
  dataValue: [string];
};

export type invoiceReferenceType = {
  originalInvoiceNumber: [string];
  modifyWithoutMaster: [boolean];
  modificationIndex: [number];
};

export type SupplierInfoType = {
  supplierTaxNumber: [TaxNumberType];
  groupMemberTaxNumber?: [TaxNumberType];
  communityVatNumber?: [string];
  supplierName: [string];
  supplierAddress: [AddressType];
  supplierBankAccountNumber?: [string];
  individualExemption?: [boolean];
  exciseLicenceNum?: [string];
};

export type CustomerVatStatusType = 'DOMESTIC' | 'OTHER' | 'PRIVATE_PERSON';

export type CustomerInfoType = {
  customerVatStatus: [CustomerVatStatusType];
  customerVatData?: [CustomerVatDataType];
  customerName?: [string];
  customerAddress?: [AddressType];
  customerBankAccountNumber?: [string];
};

export type FiscalRepresentativeInfoType = {
  fiscalRepresentativeTaxNumber: [TaxNumberType];
  fiscalRepresentativeName: [string];
  fiscalRepresentativeAddress: [AddressType];
  fiscalRepresentativeBankAccountNumber?: [string];
};

export type InvoiceCategoryType = 'NORMAL' | 'SIMPLIFIED' | 'AGGREGATE';

export type PaymentMethodType =
  | 'TRANSFER'
  | 'CASH'
  | 'CARD'
  | 'VOUCHER'
  | 'OTHER';

export type InvoiceAppearanceType = 'PAPER' | 'ELECTRONIC' | 'EDI' | 'UNKNOWN';

export type InvoiceDetailType = {
  invoiceCategory: [InvoiceCategoryType];
  invoiceDeliveryDate: [Date];
  invoiceDeliveryPeriodStart?: [Date];
  invoiceDeliveryPeriodEnd?: [Date];
  invoiceAccountingDeliveryDate?: [Date];
  periodicalSettlement?: [boolean];
  smallBusinessIndicator?: [boolean];
  currencyCode: [string];
  exchangeRate: [number];
  utilitySettlementIndicator?: [boolean];
  selfBillingIndicator?: [boolean];
  paymentMethod?: [PaymentMethodType];
  paymentDate?: [Date];
  cashAccountingIndicator?: [boolean];
  invoiceAppearance: [InvoiceAppearanceType];
  conventionalInvoiceInfo?: [ConventionalInvoiceInfoType];
  additionalInvoiceData?: AdditionalDataType[];
};

export type InvoiceHeadType = {
  supplierInfo: [SupplierInfoType];
  customerInfo?: [CustomerInfoType];
  fiscalRepresentativeInfo?: [FiscalRepresentativeInfoType];
  invoiceDetail: [InvoiceDetailType];
};

export type LineOperationType = 'CREATE' | 'MODIFY';

export type LineModificationReferenceType = {
  lineNumberReference: [number];
  lineOperation: [LineOperationType];
};

export type AdvancePaymentDataType = {
  advanceOriginalInvoice: [string];
  advancePaymentDate: [string];
  advanceExchangeRate: [string];
};

export type AdvanceDataType = {
  advanceIndicator: [boolean];
  advancePaymentData?: [AdvancePaymentDataType];
};

export type LineNatureIndicatorType = 'PRODUCT' | 'SERVICE' | 'OTHER';

export type LineDiscountDataType = {
  discountDescription?: [string];
  discountValue?: [number];
  discountRate?: [number];
};

export type VatExemptionType = {
  case: ['AAM' | 'TAM' | 'KBAET' | 'KBAUK' | 'EAM' | 'NAM' | 'UNKNOWN'];
  reason: [string];
};

export type VatOutOfScopeType = {
  case: ['ATK' | 'EUFAD37' | 'EUFADE' | 'EUE' | 'HO' | 'UNKNOWN'];
  reason: [string];
};

export type MarginSchemeType =
  | 'TRAVEL_AGENCY'
  | 'SECOND_HAND'
  | 'ARTWORK'
  | 'ANTIQUES';

export type VatAmountMismatchType = {
  vatRate: [string];
  case: [string];
};

export type VatRateType = {
  vatPercentage?: [number];
  vatContent?: [number];
  vatExemption?: [VatExemptionType];
  vatOutOfScope?: [VatOutOfScopeType];
  vatDomesticReverseCharge?: [boolean];
  marginSchemeIndicator?: [MarginSchemeType];
  vatAmountMismatch?: [VatAmountMismatchType];
  noVatCharge?: [boolean];
};

export type LineamountsNormalType = {
  lineNetAmountData: [
    {
      lineNetAmount: [number];
      lineNetAmountHUF: [number];
    }
  ];
  lineVatRate: [VatRateType];
  lineVatData?: [
    {
      lineVatAmount: [number];
      lineVatAmountHUF: [number];
    }
  ];
  lineGrossAmountData?: [
    {
      lineGrossAmountNormal: [number];
      lineGrossAmountNormalHUF: [number];
    }
  ];
};

export type NewTransportMeanType = {
  brand?: [string];
  serialNum?: [string];
  engineNum?: [string];
  firstEntryIntoService?: [Date];
  vehicle?: [
    {
      engineCapacity: [number];
      enginePower: [number];
      kms: [number];
    }
  ];
  vessel?: [
    {
      length: [number];
      activityReferred: [boolean];
      sailedHours: [number];
    }
  ];
  aircraft?: [
    {
      takeOffWeight: [number];
      airCargo: [boolean];
      operationHours: [number];
    }
  ];
};

export type TakeOverReasonType =
  | '01'
  | '02_aa'
  | '02_ab'
  | '02_b'
  | '02_c'
  | '02_d'
  | '02_ea'
  | '02_eb'
  | '02_fa'
  | '02_fb'
  | '02_ga'
  | '02_gb';

export type ProductStreamType =
  | 'BATTERY'
  | 'PACKAGING'
  | 'OTHER_PETROL'
  | 'ELECTRONIC'
  | 'TIRE'
  | 'COMMERCIAL'
  | 'PLASTIC'
  | 'OTHER_CHEMICAL'
  | 'PAPER';

export type ProductFeeClauseType = {
  productFeeTakeoverData?: [
    {
      takeoverReason: [TakeOverReasonType];
      takeoverAmount?: [number];
    }
  ];
  customerDeclaration?: [
    {
      productStream: [ProductStreamType];
      productWeight?: [number];
    }
  ];
};

export type DieselOilPurchaseType = {
  purchaseLocation: [SimpleAddressType];
  purchaseDate: [Date];
  vehicleRegistrationNumber: [string];
  dieselOilQuantity?: [number];
};

export type AggregateInvoiceLineData = {
  lineExchangeRate?: [number];
  lineDeliveryDate: [Date];
};

export type LineAmountsSimplified = {
  lineVatRate: [VatRateType];
  lineGrossAmountSimplified: [number];
  lineGrossAmountSimplifiedHUF: [number];
};

export type ProductCodeType = {
  productCodeCategory: [
    | 'VTSZ'
    | 'SZJ'
    | 'KN'
    | 'AHK'
    | 'CSK'
    | 'KT'
    | 'EJ'
    | 'TESZOR'
    | 'OWN'
    | 'OTHER'
  ];
  productCodeValue?: [string];
  productCodeOwnValue?: [string];
};

export type UnitOfMeasureType =
  | 'PIECE'
  | 'KILOGRAM'
  | 'TON'
  | 'KWH'
  | 'DAY'
  | 'HOUR'
  | 'MINUTE'
  | 'MONTH'
  | 'LITER'
  | 'KILOMETER'
  | 'CUBIC_METER'
  | 'METER'
  | 'LINEAR_METER'
  | 'CARTON'
  | 'PACK'
  | 'OWN ';

export type ProductFeeMeasuringUnitType = 'DARAB' | 'KG';

export type ProductFeeDataType = {
  productFeeCode: [ProductCodeType];
  productFeeQuantity: [number];
  productFeeMeasuringUnit: [ProductFeeMeasuringUnitType];
  productFeeRate: [number];
  productFeeAmount: [number];
};

export type LineType = {
  lineNumber: [number];
  lineModificationReference?: [LineModificationReferenceType];
  referencesToOtherLines?: [
    {
      referenceToOtherLine: number[];
    }
  ];
  advanceData?: [AdvanceDataType];
  productCodes?: [
    {
      productCode: ProductCodeType[];
    }
  ];
  lineExpressionIndicator: [boolean];
  lineNatureIndicator?: [LineNatureIndicatorType];
  lineDescription?: [string];
  quantity?: [number];
  unitOfMeasure?: [UnitOfMeasureType];
  unitOfMeasureOwn?: [string];
  unitPrice?: [number];
  unitPriceHUF?: [number];
  lineDiscountData?: [LineDiscountDataType];
  lineAmountsNormal?: [LineamountsNormalType];
  lineAmountsSimplified?: [LineAmountsSimplified];
  intermediatedService?: [boolean];
  aggregateInvoiceLineData?: [AggregateInvoiceLineData];
  newTransportMean?: [NewTransportMeanType];
  depositIndicator?: [boolean];
  obligatedForProductFee?: [boolean];
  GPCExcise?: [number];
  dieselOilPurchase?: [DieselOilPurchaseType];
  netaDeclaration?: [boolean];
  productFeeClause?: [ProductFeeClauseType];
  lineProductFeeContent?: [ProductFeeDataType];
  conventionalLineInfo?: [ConventionalInvoiceInfoType];
  additionalLineData?: [AdditionalDataType];
};

export type InvoiceLinesType = {
  mergedItemIndicator: [boolean];
  line?: LineType[];
};

export type SummaryByVatRateType = {
  vatRate: [VatRateType];
  vatRateNetData: [
    {
      vatRateNetAmount: [number];
      vatRateNetAmountHUF: [number];
    }
  ];
  vatRateVatData: [
    {
      vatRateVatAmount: [number];
      vatRateVatAmountHUF: [number];
    }
  ];
  vatRateGrossData?: [
    {
      vatRateGrossAmount: [number];
      vatRateGrossAmountHUF: [number];
    }
  ];
};

export type SummaryNormalType = {
  summaryByVatRate: SummaryByVatRateType[];
  invoiceNetAmount: [number];
  invoiceNetAmountHUF: [number];
  invoiceVatAmount: [number];
  invoiceVatAmountHUF: [number];
};

export type SummaryGrossDataType = {
  invoiceGrossAmount: [number];
  invoiceGrossAmountHUF: [number];
};

export type SummarySimplifiedType = {
  vatRate: [VatRateType];
  vatContentGrossAmount: [number];
  vatContentGrossAmountHUF: [number];
};

export type InvoiceSummaryType = {
  summaryNormal?: [SummaryNormalType];
  summarySimplified?: SummarySimplifiedType[];
  summaryGrossData?: [SummaryGrossDataType];
};

export type ProductFeeOperationType = 'REFUND' | 'DEPOSIT';

export type ProductFeeSummaryType = {
  productFeeOperation: [ProductFeeOperationType];
  productFeeData: ProductFeeDataType[];
  ProductChargeSum: [number];
  PaymentEvidenceDocumentData?: [
    {
      evidenceDocumentNo: [string];
      evidenceDocumentDate: [Date];
      obligatedName: [string];
      obligatedAddress: [AddressType];
      obligatedTaxNumber: [TaxNumberType];
    }
  ];
};

export type InvoiceType = {
  invoiceReference?: [invoiceReferenceType];
  invoiceHead: [InvoiceHeadType];
  invoiceLines?: [InvoiceLinesType];
  productFeeSummary?: ProductFeeSummaryType[];
  invoiceSummary: [InvoiceSummaryType];
};

export type BatchInvoiceType = {
  batchIndex: [number];
  invoice: [InvoiceType];
};

export type InvoiceMainType = {
  invoice?: [InvoiceType];
  batchInvoice?: BatchInvoiceType[];
};

export type InvoiceData = {
  invoiceNumber: [string];
  invoiceIssueDate: [Date];
  completenessIndicator: [boolean];
  invoiceMain: [InvoiceMainType];
};
