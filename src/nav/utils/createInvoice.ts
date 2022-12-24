import {
  invoiceReferenceType,
  InvoiceHeadType,
  LinesType,
  ProductFeeSummaryType,
  InvoiceSummaryType,
  AddressType,
  TaxNumberType,
  VatRateType,
} from '../operations/types/invoiceData';
import { pick } from 'lodash';
import writeToXML from './writeToXML';
import { utf8ToBase64 } from './base64';

export default function createInvoice(
  invoiceHead: InvoiceHeadType,
  invoiceSummary: InvoiceSummaryType,
  invoiceReference?: invoiceReferenceType,
  invoiceLines?: LinesType,
  porductFeeSummary?: ProductFeeSummaryType[]
): string {
  const fixAddressTypeOrder = (obj: AddressType): AddressType => {
    obj = pick(obj, ['simpleAddress', 'detailedAddress']);
    if (obj.simpleAddress) {
      obj.simpleAddress = pick(obj.simpleAddress, [
        'countryCode',
        'region',
        'postalCode',
        'city',
        'additionalAddressDetail',
      ]);
    }

    if (obj.detailedAddress) {
      obj.detailedAddress = pick(obj.detailedAddress, [
        'countryCode',
        'region',
        'postalCode',
        'city',
        'streetName',
        'publicPlaceCategory',
        'number',
        'building',
        'staircase',
        'floor',
        'door',
        'lotNumber',
      ]);
    }
    return obj;
  };

  const fixTaxNumberTypeOrder = (obj: TaxNumberType): TaxNumberType => {
    return pick(obj, ['taxpayerId', 'vatCode', 'countyCode']);
  };

  const fixVatRateTypeOrder = (obj: VatRateType): VatRateType => {
    obj = pick(obj, [
      'vatPercentage',
      'vatContent',
      'vatExemption',
      'vatOutOfScope',
      'vatDomesticReverseCharge',
      'marginSchemeIndicator',
      'vatAmountMismatch',
      'noVatCharge',
    ]);

    if (obj.vatExemption) {
      obj.vatExemption = pick(obj.vatExemption, ['case', 'reason']);
    }

    if (obj.vatOutOfScope) {
      obj.vatOutOfScope = pick(obj.vatOutOfScope, ['case', 'reason']);
    }

    if (obj.vatAmountMismatch) {
      obj.vatAmountMismatch = pick(obj.vatAmountMismatch, ['vatRate', 'case']);
    }

    return obj;
  };

  // invoiceHead order fix
  invoiceHead = pick(invoiceHead, [
    'supplierInfo',
    'customerInfo',
    'fiscalRepresentativeInfo',
    'invoiceDetail',
  ]);

  // supplier info
  invoiceHead.supplierInfo = pick(invoiceHead.supplierInfo, [
    'supplierTaxNumber',
    'groupMemberTaxNumber',
    'communityVatNumber',
    'supplierName',
    'supplierAddress',
    'supplierBankAccountNumber',
    'individualExemption',
    'exciseLicenceNum',
  ]);

  invoiceHead.supplierInfo.supplierTaxNumber = fixTaxNumberTypeOrder(
    invoiceHead.supplierInfo.supplierTaxNumber
  );

  if (invoiceHead.supplierInfo.groupMemberTaxNumber) {
    invoiceHead.supplierInfo.groupMemberTaxNumber = fixTaxNumberTypeOrder(
      invoiceHead.supplierInfo.groupMemberTaxNumber
    );
  }

  invoiceHead.supplierInfo.supplierAddress = fixAddressTypeOrder(
    invoiceHead.supplierInfo.supplierAddress
  );

  // customerinfo
  if (invoiceHead.customerInfo) {
    invoiceHead.customerInfo = pick(invoiceHead.customerInfo, [
      'customerVatStatus',
      'customerVatData',
      'customerName',
      'customerAddress',
      'customerBankAccountNumber',
    ]);

    if (invoiceHead.customerInfo.customerVatData) {
      invoiceHead.customerInfo.customerVatData.customerTaxNumber = pick(
        invoiceHead.customerInfo.customerVatData.customerTaxNumber,
        ['taxpayerId', 'vatCode', 'countyCode', 'groupMemberTaxNumber']
      );

      if (
        invoiceHead.customerInfo.customerVatData.customerTaxNumber
          .groupMemberTaxNumber
      ) {
        invoiceHead.customerInfo.customerVatData.customerTaxNumber.groupMemberTaxNumber =
          fixTaxNumberTypeOrder(
            invoiceHead.customerInfo.customerVatData.customerTaxNumber
              .groupMemberTaxNumber
          );
      }
    }

    if (invoiceHead.customerInfo.customerAddress) {
      invoiceHead.customerInfo.customerAddress = fixAddressTypeOrder(
        invoiceHead.customerInfo.customerAddress
      );
    }
  }

  // fiscalRepresentativeInfo
  if (invoiceHead.fiscalRepresentativeInfo) {
    pick(invoiceHead.fiscalRepresentativeInfo, [
      'fiscalRepresentativeTaxNumber',
      'fiscalRepresentativeName',
      'fiscalRepresentativeAddress',
      'fiscalRepresentativeBankAccountNumber',
    ]);

    invoiceHead.fiscalRepresentativeInfo.fiscalRepresentativeTaxNumber =
      fixTaxNumberTypeOrder(
        invoiceHead.fiscalRepresentativeInfo.fiscalRepresentativeTaxNumber
      );

    invoiceHead.fiscalRepresentativeInfo.fiscalRepresentativeAddress =
      fixAddressTypeOrder(
        invoiceHead.fiscalRepresentativeInfo.fiscalRepresentativeAddress
      );
  }

  // invoiceDetail
  invoiceHead.invoiceDetail = pick(invoiceHead.invoiceDetail, [
    'invoiceCategory',
    'invoiceDeliveryDate',
    'invoiceDeliveryPeriodStart',
    'invoiceDeliveryPeriodEnd',
    'invoiceAccountingDeliveryDate',
    'periodicalSettlement',
    'smallBusinessIndicator',
    'currencyCode',
    'exchangeRate',
    'utilitySettlementIndicator',
    'selfBillingIndicator',
    'paymentMethod',
    'paymentDate',
    'cashAccountingIndicator',
    'invoiceAppearance',
    'conventionalInvoiceInfo',
    'additionalInvoiceData',
  ]);

  if (invoiceHead.invoiceDetail.conventionalInvoiceInfo) {
    pick(invoiceHead.invoiceDetail.conventionalInvoiceInfo, [
      'orderNumbers',
      'deliveryNotes',
      'shippingDates',
      'contractNumbers',
      'supplierCompanyCodes',
      'customerCompanyCodes',
      'dealerCodes',
      'costCenters',
      'projectNumbers',
      'generalLedgerAccountNumbers',
      'glnNumbersSupplier',
      'glnNumbersCustomer',
      'materialNumbers',
      'itemNumbers',
      'ekaerIds',
    ]);
  }

  if (invoiceHead.invoiceDetail.additionalInvoiceData) {
    invoiceHead.invoiceDetail.additionalInvoiceData =
      invoiceHead.invoiceDetail.additionalInvoiceData.map((aid) =>
        pick(aid, ['dataName', 'dataDescription', 'dataValue'])
      );
  }

  // invoiceSummray
  invoiceSummary = pick(invoiceSummary, [
    'summaryNormal',
    'summarySimplified',
    'summaryGrossData',
  ]);

  if (invoiceSummary.summaryNormal) {
    invoiceSummary.summaryNormal = pick(invoiceSummary.summaryNormal, [
      'summaryByVatRate',
      'invoiceNetAmount',
      'invoiceNetAmountHUF',
      'invoiceVatAmount',
      'invoiceVatAmountHUF',
    ]);

    invoiceSummary.summaryNormal.summaryByVatRate =
      invoiceSummary.summaryNormal.summaryByVatRate.map((sbvr) => {
        sbvr = pick(sbvr, [
          'vatRate',
          'vatRateNetData',
          'vatRateVatData',
          'vatRateGrossData',
        ]);

        sbvr.vatRate = fixVatRateTypeOrder(sbvr.vatRate);

        sbvr.vatRateNetData = pick(sbvr.vatRateNetData, [
          'vatRateNetAmount',
          'vatRateNetAmountHUF',
        ]);

        sbvr.vatRateVatData = pick(sbvr.vatRateVatData, [
          'vatRateVatAmount',
          'vatRateVatAmountHUF',
        ]);

        if (sbvr.vatRateGrossData) {
          sbvr.vatRateGrossData = pick(sbvr.vatRateGrossData, [
            'vatRateGrossAmount',
            'vatRateGrossAmountHUF',
          ]);
        }

        return sbvr;
      });
  }

  if (invoiceSummary.summarySimplified) {
    invoiceSummary.summarySimplified = invoiceSummary.summarySimplified.map(
      (ss) => {
        ss = pick(ss, [
          'vatRate',
          'vatContentGrossAmount',
          'vatContentGrossAmountHUF',
        ]);

        ss.vatRate = fixVatRateTypeOrder(ss.vatRate);

        return ss;
      }
    );
  }

  if (invoiceSummary.summaryGrossData) {
    invoiceSummary.summaryGrossData = pick(invoiceSummary.summaryGrossData, [
      'invoiceGrossAmount',
      'invoiceGrossAmountHUF',
    ]);
  }

  // invoiceReference
  if (invoiceReference) {
    invoiceReference = pick(invoiceReference, [
      'originalInvoiceNumber',
      'modifyWithoutMaster',
      'modificationIndex',
    ]);
  }

  // invoiceLines
  if (invoiceLines) {
    invoiceLines = pick(invoiceLines, ['mergedItemIndicator', 'line']);

    if (invoiceLines.line) {
      invoiceLines.line = invoiceLines.line.map((line) => {
        line = pick(line, [
          'lineNumber',
          'lineModificationReference',
          'referencesToOtherLines',
          'advanceData',
          'productCodes',
          'lineExpressionIndicator',
          'lineNatureIndicator',
          'lineDescription',
          'quantity',
          'unitOfMeasure',
          'unitOfMeasureOwn',
          'unitPrice',
          'unitPriceHUF',
          'lineDiscountData',
          'lineAmountsNormal',
          'lineAmountsSimplified',
          'intermediatedService',
          'aggregateInvoiceLineData',
          'newTransportMean',
          'depositIndicator',
          'obligatedForProductFee',
          'GPCExcise',
          'dieselOilPurchase',
          'netaDeclaration',
          'productFeeClause',
          'lineProductFeeContent',
          'conventionalLineInfo',
          'additionalLineData',
        ]);

        if (line.lineModificationReference) {
          line.lineModificationReference = pick(
            line.lineModificationReference,
            ['lineNumberReference', 'lineOperation']
          );
        }

        if (line.advanceData) {
          line.advanceData = pick(line.advanceData, [
            'advanceIndicator',
            'advancePaymentData',
          ]);

          if (line.advanceData.advancePaymentData) {
            line.advanceData.advancePaymentData = pick(
              line.advanceData.advancePaymentData,
              [
                'advanceOriginalInvoice',
                'advancePaymentDate',
                'advanceExchangeRate',
              ]
            );
          }
        }

        if (line.lineDiscountData) {
          line.lineDiscountData = pick(line.lineDiscountData, [
            'discountDescription',
            'discountValue',
            'discountRate',
          ]);
        }

        if (line.lineAmountsNormal) {
          line.lineAmountsNormal = pick(line.lineAmountsNormal, [
            'lineNetAmountData',
            'lineVatRate',
            'lineVatData',
            'lineGrossAmountData',
          ]);

          line.lineAmountsNormal.lineNetAmountData = pick(
            line.lineAmountsNormal.lineNetAmountData,
            ['lineNetAmount', 'lineNetAmountHUF']
          );

          line.lineAmountsNormal.lineVatRate = fixVatRateTypeOrder(
            line.lineAmountsNormal.lineVatRate
          );

          if (line.lineAmountsNormal.lineVatData) {
            line.lineAmountsNormal.lineVatData = pick(
              line.lineAmountsNormal.lineVatData,
              ['lineVatAmount', 'lineVatAmountHUF']
            );
          }

          if (line.lineAmountsNormal.lineGrossAmountData) {
            line.lineAmountsNormal.lineGrossAmountData = pick(
              line.lineAmountsNormal.lineGrossAmountData,
              ['lineGrossAmountNormal', 'lineGrossAmountNormalHUF']
            );
          }
        }

        if (line.lineAmountsSimplified) {
          line.lineAmountsSimplified = pick(line.lineAmountsSimplified, [
            'lineVatRate',
            'lineGrossAmountSimplified',
            'lineGrossAmountSimplifiedHUF',
          ]);

          line.lineAmountsSimplified.lineVatRate = fixVatRateTypeOrder(
            line.lineAmountsSimplified.lineVatRate
          );
        }

        if (line.aggregateInvoiceLineData) {
          line.aggregateInvoiceLineData = pick(line.aggregateInvoiceLineData, [
            'lineExchangeRate',
            'lineDeliveryDate',
          ]);
        }

        if (line.newTransportMean) {
          line.newTransportMean = pick(line.newTransportMean, [
            'brand',
            'serialNum',
            'engineNum',
            'firstEntryIntoService',
            'vehicle',
            'vessel',
            'aircraft',
          ]);

          if (line.newTransportMean.vehicle) {
            line.newTransportMean.vehicle = pick(
              line.newTransportMean.vehicle,
              ['engineCapacity', 'enginePower', 'kms']
            );
          }

          if (line.newTransportMean.vessel) {
            line.newTransportMean.vessel = pick(line.newTransportMean.vessel, [
              'length',
              'activityReferred',
              'sailedHours',
            ]);
          }

          if (line.newTransportMean.aircraft) {
            line.newTransportMean.aircraft = pick(
              line.newTransportMean.aircraft,
              ['takeOffWeight', 'airCargo', 'operationHours']
            );
          }
        }

        return line;
      });
    }
  }

  if (porductFeeSummary) {
    porductFeeSummary = porductFeeSummary.map((pfs) => {
      pfs = pick(pfs, [
        'productFeeOperation',
        'productFeeData',
        'ProductChargeSum',
        'PaymentEvidenceDocumentData',
      ]);

      pfs.productFeeData = pfs.productFeeData.map((pfd) => {
        pfd = pick(pfd, [
          'productFeeCode',
          'productFeeQuantity',
          'productFeeMeasuringUnit',
          'productFeeRate',
          'productFeeAmount',
        ]);

        pfd.productFeeCode = pick(pfd.productFeeCode, [
          'productCodeCategory',
          'productCodeValue',
          'productCodeOwnValue',
        ]);

        return pfd;
      });

      if (pfs.PaymentEvidenceDocumentData) {
        pfs.PaymentEvidenceDocumentData = pick(
          pfs.PaymentEvidenceDocumentData,
          [
            'evidenceDocumentNo',
            'evidenceDocumentDate',
            'obligatedName',
            'obligatedAddress',
            'obligatedTaxNumber',
          ]
        );

        pfs.PaymentEvidenceDocumentData.obligatedAddress = fixAddressTypeOrder(
          pfs.PaymentEvidenceDocumentData.obligatedAddress
        );

        pfs.PaymentEvidenceDocumentData.obligatedTaxNumber =
          fixTaxNumberTypeOrder(
            pfs.PaymentEvidenceDocumentData.obligatedTaxNumber
          );
      }
      return pfs;
    });
  }

  const xml = writeToXML(
    {
      invoiceReference: invoiceReference,
      invoiceHead: invoiceHead,
      invoiceLines: invoiceLines,
      productFeeSummary: porductFeeSummary,
      invoiceSummary: invoiceSummary,
    },
    'InvoiceData'
  );

  return utf8ToBase64(xml);
}
