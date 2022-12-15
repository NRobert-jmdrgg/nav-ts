import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryTaxpayerOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryTaxpayerResponse } from './types/response';
import writeToXML from '../utils/writeToXML';

/**
 * belföldi adószám validáló operáció, mely a számlakiállítás folyamatába építve képes
a megadott adószám valódiságáról és érvényességéről a NAV adatbázisa alapján adatot szolgáltatni.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @returns adószám adatai és result érték
 */
export default async function queryTaxpayer(
  user: User,
  software: Software,
  options: QueryTaxpayerOptions,
  returnWithXml = true
) {
  // request létrehozása
  const request = createRequest(
    'QueryTaxpayerRequest',
    user,
    software,
    options
  );

  // request signature létrehozása
  request['QueryTaxpayerRequest']['common:user']['common:requestSignature']._ =
    createRequestSignature(
      request['QueryTaxpayerRequest']['common:header']['common:requestId'],
      request['QueryTaxpayerRequest']['common:header']['common:timestamp'],
      user.signatureKey
    );

  const response = await sendNavRequest<QueryTaxpayerResponse>(
    writeToXML(request),
    'queryTaxpayer',
    returnWithXml
  );

  return response.parsedResponse
    ? {
        header: response.parsedResponse.header[0],
        result: response.parsedResponse.result[0],
        Software: response.parsedResponse.software[0],
        infoDate: response.parsedResponse.infoDate?.[0],
        taxpayerValidity: response.parsedResponse.taxpayerValidity?.[0],
        taxpayerData: response.parsedResponse.taxpayerData?.[0],
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
