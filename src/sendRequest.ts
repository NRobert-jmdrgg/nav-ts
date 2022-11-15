import writeToXML from './utils/writeToXML';
import axios from 'axios';
import xml2js from 'xml2js';
import dotenv from 'dotenv';
import { InvoiceRequest } from './baseTypes';
import { TokenExchangeResponse } from './operations/types/response';
dotenv.config();

/**
 * Nav online számla API Request küldése.
 * @param {T extends BasicOnlineInvoiceRequest} request az operációhoz tartozó request object
 * @param {string} operation operáció
 * @returns {Object | null} response object
 */
export default async function sendRequest(
  request: InvoiceRequest,
  operation: string
): Promise<TokenExchangeResponse | null> {
  const xml = writeToXML(request);
  const xmlparser = new xml2js.Parser();
  let parsedResponse = null;

  try {
    const response = await axios.post(
      `${process.env.API_TEST_URL}${process.env.VERSION}${operation}`,
      xml,
      { headers: { 'Content-Type': 'application/xml' } }
    );

    const xmlNoNamespaceResponse = response.data.replace(/ns2:|ns3:/g, '');
    parsedResponse = await xmlparser.parseStringPromise(xmlNoNamespaceResponse);
  } catch (e) {
    console.log(e);
  }

  return parsedResponse;
}
