import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceChainDigestOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryInvoiceChainDigestResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';
import { isCallExpression } from 'typescript';

/**
 * Az operáció a megadott keresőfeltételeknek megfelelő, lapozható számlalistát ad vissza a válaszban. A lista elemei a megadott alapszámlához tartozó számlalánc elemei
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @returns számlalánc és result érték
 */
export default async function queryInvoiceChainDigest(
  user: User,
  software: Software,
  options: QueryInvoiceChainDigestOptions,
  returnWithXml?: boolean
) {
  // sorrend
  options.invoiceChainQuery = pick(options.invoiceChainQuery, [
    'invoiceNumber',
    'invoiceDirection',
    'taxNumber',
  ]);

  // request létrehozása
  const request = createRequest(
    'QueryInvoiceChainDigestRequest',
    user,
    software,
    pick(options, ['page', 'invoiceChainQuery'])
  );

  // request signature létrehozása
  request['QueryInvoiceChainDigestRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryInvoiceChainDigestRequest']['common:header'][
      'common:requestId'
    ],
    request['QueryInvoiceChainDigestRequest']['common:header'][
      'common:timestamp'
    ],
    user.signatureKey
  );

  const response = await sendNavRequest<QueryInvoiceChainDigestResponse>(
    writeToXML(request),
    'queryInvoiceChainDigest',
    returnWithXml
  );

  // array fix
  if (response.parsedResponse?.InvoiceChainDigestResult.invoiceChainElement) {
    if (
      !Array.isArray(
        response.parsedResponse.InvoiceChainDigestResult.invoiceChainElement
      )
    ) {
      response.parsedResponse.InvoiceChainDigestResult.invoiceChainElement = [
        response.parsedResponse.InvoiceChainDigestResult.invoiceChainElement,
      ];
    }

    response.parsedResponse.InvoiceChainDigestResult.invoiceChainElement =
      response.parsedResponse.InvoiceChainDigestResult.invoiceChainElement.map(
        (ice) => {
          if (ice.invoiceLines) {
            if (!Array.isArray(ice.invoiceLines.newCreatedLines)) {
              ice.invoiceLines.newCreatedLines = [
                ice.invoiceLines.newCreatedLines,
              ];
            }
          }
          return ice;
        }
      );
  }

  return response.parsedResponse
    ? {
        ...response.parsedResponse.InvoiceChainDigestResult,
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
