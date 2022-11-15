export default class Software {
  softwareId: string;
  softwareName: string;
  softwareOperation: string;
  softwareMainVersion: string;
  softwareDevName: string;
  softwareDevContact: string;
  softwareDevCountryCode?: string;
  softwareDevTaxNumber?: string;

  /**
   * Software adatok object
   * @param {string} softwareId software id
   * @param {string} softwareName software neve
   * @param {string} softwareOperation software operáció
   * @param {string} softwareMainVersion software verzió
   * @param {string} softwareDevName software fejlesztő neve
   * @param {string} softwareDevContact software fejlesző elérhetőség
   * @param {string} softwareDevCountryCode software fejlezstő ország kódja
   * @param {string} softwareDevTaxNumber software fejlesztő adószáma
   */
  constructor(
    softwareId: string,
    softwareName: string,
    softwareOperation: string,
    softwareMainVersion: string,
    softwareDevName: string,
    softwareDevContact: string,
    softwareDevCountryCode?: string,
    softwareDevTaxNumber?: string
  ) {
    this.softwareId = softwareId;
    this.softwareName = softwareName;
    this.softwareOperation = softwareOperation;
    this.softwareMainVersion = softwareMainVersion;
    this.softwareDevName = softwareDevName;
    this.softwareDevContact = softwareDevContact;
    this.softwareDevCountryCode = softwareDevCountryCode;
    this.softwareDevTaxNumber = softwareDevTaxNumber;
  }
  *[Symbol.iterator]() {
    for (let i in this) {
      yield this[i];
    }
  }
}
