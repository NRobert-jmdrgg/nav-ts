import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import {
  QueryInvoiceDigestOptions,
  RelationQueryMonetary,
} from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryInvoiceDigestResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * Üzleti keresőparaméterek alapján működő lekérdező operáció. Az operáció a megadott keresőfeltételeknek
megfelelő, lapozható számla listát ad vissza a válaszban. 
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns számla lista és result érték
 */
export default async function queryInvoiceDigest(
  user: User,
  software: Software,
  options: QueryInvoiceDigestOptions,
  returnWithXml = true
) {
  // sorrend
  if (options.invoiceQueryParams.mandatoryQueryParams.invoiceIssueDate) {
    options.invoiceQueryParams.mandatoryQueryParams.invoiceIssueDate = pick(
      options.invoiceQueryParams.mandatoryQueryParams.invoiceIssueDate,
      ['dateFrom', 'dateTo']
    );
  }

  options.invoiceQueryParams.mandatoryQueryParams = pick(
    options.invoiceQueryParams.mandatoryQueryParams,
    ['invoiceIssueDate', 'insDate', 'originalInvoiceNumber']
  );

  if (options.invoiceQueryParams.additionalQueryParams) {
    options.invoiceQueryParams.additionalQueryParams = pick(
      options.invoiceQueryParams.additionalQueryParams,
      [
        'taxNumber',
        'groupMemberTaxNumber',
        'name',
        'invoiceCategory',
        'paymentMethod',
        'invoiceAppearance',
        'source',
        'curreyncy',
      ]
    );
  }

  const setRelationQueryMonetaryOrder = (
    obj: RelationQueryMonetary | undefined
  ) => {
    obj ? pick(obj, ['queryOperator', 'queryValue']) : undefined;
  };

  if (options.invoiceQueryParams.relationalQueryParams) {
    for (const key in options.invoiceQueryParams.relationalQueryParams) {
      setRelationQueryMonetaryOrder(
        options.invoiceQueryParams.relationalQueryParams[
          key as keyof typeof options.invoiceQueryParams.relationalQueryParams
        ]
      );
    }

    options.invoiceQueryParams.relationalQueryParams = pick(
      options.invoiceQueryParams.relationalQueryParams,
      [
        'invoiceDelivery',
        'paymentDate',
        'invoiceNetAmount',
        'invoiceNetAmountHUF',
        'invoiceVatAmount',
        'invoiceVatAmountHUF',
      ]
    );
  }

  if (options.invoiceQueryParams.transactionQueryParams) {
    options.invoiceQueryParams.transactionQueryParams = pick(
      options.invoiceQueryParams.transactionQueryParams,
      ['transactionId', 'index', 'invoiceOperation']
    );
  }

  options.invoiceQueryParams = pick(options.invoiceQueryParams, [
    'mandatoryQueryParams',
    'additionalQueryParams',
    'relationalQueryParams',
    'transactionQueryParams',
  ]);

  // reqest létrehozása
  const request = createRequest(
    'QueryInvoiceDigestRequest',
    user,
    software,
    pick(options, ['page', 'invoiceDirection', 'invoiceQueryParams'])
  );

  // request signature létrehozása
  request['QueryInvoiceDigestRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryInvoiceDigestRequest']['common:header']['common:requestId'],
    request['QueryInvoiceDigestRequest']['common:header']['common:timestamp'],
    user.signatureKey
  );

  const response = await sendNavRequest<QueryInvoiceDigestResponse>(
    writeToXML(request),
    'queryInvoiceDigest',
    returnWithXml
  );

  return response.data
    ? {
        header: response.data.header[0],
        result: response.data.result[0],
        Software: response.data.software[0],
        invoiceDigestResult: response.data.invoiceDigestResult[0],
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
