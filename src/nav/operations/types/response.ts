import { resSoftware, BasicHeader, BasicResult } from '../../baseTypes';

/**
 * Nav válasz xml struktúrák
 */

export type TokenExchangeResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  encodedExchangeToken: [string]; // Az elkódolt adatszolgáltatási token
  tokenValidityFrom: [Date]; //  Az adatszolgáltatási token érvényességének kezdete
  tokenValidityTo: [Date]; // Az adatszolgáltatási token érvényességének vége
};

export type ManageAnnulmentResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  transactionId: [string]; // A befogadott adatszolgáltatás azonosítója
};

export type ManageInvoiceResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  transactionId: [string]; // A befogadott adatszolgáltatás azonosítója
};

export type InvoiceChainDigestType = {
  invoiceNumber: [string]; // Számla vagy módosító okirat sorszáma
  batchIndex: [number]; // A módosító okirat sorszáma kötegelt módosítás esetén
  invoiceOperation: [string]; // Számlaművelet
  supplierTaxNumber: [string]; // Számla kiállítójának adószáma
  customerTaxNumber: [string]; // A vevő adószáma
  insDate: [Date]; // A számlaadat-szolgáltatás mentésének időpontja;
  originalRequestVersion: [string]; // Az adatszolgáltatás requestVersion értéke
};

export type InvoiceLinesType = {
  maxLineNumber: [number]; // A sorok száma közül a legmagasabb, amit a számla tartalmaz
  newCreatedLines: {
    lineNumberIntervalStart: [number]; // Hozzáadott számla sor intervallum kezdete
    lineNumberIntervalEnd: [number]; // Hozzáadott számla sor intervallum inkluzív vége
  }[];
};

export type InvoiceChainElementType = {
  invoiceChainDigest: [InvoiceChainDigestType];
  invoiceLines?: [InvoiceLinesType];
  invoiceReferenceData?: [
    {
      originalInvoiceNumber: [string]; // Az eredeti számla sorszáma, amelyre a módosítás vonatkozik
      modifyWithoutMaster: [boolean]; // Alapszámla nélküli módosítás jelölése;
      modificationTimestamp?: [Date]; // A módosítás időbélyege
      modificationIndex?: [number]; // A számlára vonatkozó módosító okirat egyedi sorszáma
    }
  ];
};

export type QueryInvoiceChainDigestResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  InvoiceChainDigestResult: [
    {
      currentPage: [number]; // A jelenleg lekérdezett lap értéke
      availablePage: [number]; // Az elérhető legnagyobb lap értéke
      invoiceChainElement: InvoiceChainElementType[];
    }
  ];
};

export type QueryInvoiceCheckResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  invoiceCheckResult: [boolean]; // Az ellenőrzés logikai értékét tartalmazza
};

export type QueryInvoiceDataResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  invoiceDataResult?: [
    {
      invoiceData: [string]; // A számla adatai BASE64 kódolásban;
      auditData: [
        {
          insDate: [Date]; // A számlaadat-szolgáltatás mentésének időpontja
          insCusUser: [string]; // A számlaadat-szolgáltatást beküldő technikai felhasználó neve
          source: [string]; // A számlaadat-szolgáltatás forrása
          transactionId?: [string]; // A számlaadat-szolgáltatás tranzakcióazonosítója, ha az gépi interfészen került beküldésre
          index?: [number]; //  A számlaadat-szolgáltatás tranzakciójának indexe
          batchIndex?: [number]; // A módosító okirat száma a kötegen belül
          originalRequestVersion: [string]; // Az adatszolgáltatás requestVersion értéke
        }
      ];
      compressedContentIndicator: [boolean]; // Jelöli, ha az invoiceData tartalmát a BASE64 dekódolást követően még ki kell tömöríteni az olvasáshoz
      electronicInvoiceHash?: [string]; // Elektronikus számla- vagy módosító okirat állomány hash-lenyomata
    }
  ];
};

export type InvoiceDigestType = {
  invoiceNumber: [string]; // Számla vagy módosító okirat sorszáma
  batchIndex?: [number]; // Számla vagy módosító okirat sorszáma
  invoiceOperation: [string]; // Számlaművelet típusa
  invoiceCategory: [string]; // Számla típusa
  invoiceIssueDate: [Date]; // Számla vagy módosító okirat kiállítási dátuma
  supplierTaxNumber: [string]; // Számla kiállítójának adószáma;
  supplierGroupMemberTaxNumber?: [string]; // Számla kiállítójának áfacsoport azonosító száma
  supplierName: [string]; // A számla kiállítójának neve;
  customerTaxNumber?: [string]; // A vevő adószáma
  customerGroupMemberTaxNumber?: [string]; // A vevő áfacsoport azonosító száma
  customerName?: [string]; // A vevő neve
  paymentMethod?: [string]; // Fizetési mód
  paymentDate?: [Date]; // Fizetési határidő
  invoiceAppearance?: [string]; // A számla megjelenési formája;
  source?: [string]; //  Az adatszolgáltatás forrása;
  invoiceDeliveryDate?: [Date]; // A számla teljesítési dátuma;
  currency?: [string]; // A számla pénzneme
  invoiceNetAmount?: [number]; // A számla nettó összege a számla pénznemében
  invoiceNetAmountHUF?: [number]; // A számla nettó összege forintban;
  invoiceVatAmount?: [number]; //  A számla áfa összege a számla pénznemében
  invoiceVatAmountHUF?: [number]; // A számla áfa összege forintban;
  transactionId?: [string]; // Az adatszolgáltatás tranzakcióazonosítója;
  index?: [number]; // A számla sorszáma a kérésen belül
  originalInvoiceNumber?: [string]; // Az eredeti számla sorszáma, amelyre a módosítás vonatkozik
  modificationIndex?: [number]; // A számlára vonatkozó módosító okirat egyedi sorszáma
  insDate: [string]; // A rendszerbe történő beérkezés időpontja UTC időben
  completenessIndicator?: [boolean]; // Az adatszolgáltatás maga az elektronikus számla
};

export type QueryInvoiceDigestResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  invoiceDigestResult: [
    {
      currentPage: [number]; // A jelenleg lekérdezett lap értéke;
      availablePage: [number]; // Az elérhető legnagyobb lap értéke
      invoiceDigest?: InvoiceDigestType[];
    }
  ];
};

export type TransactionType = {
  insDate: [Date]; // A számlaadat-szolgáltatás mentésének időpontja
  insCusUser: [string]; // A számlaadat-szolgáltatást beküldő technikai felhasználó neve
  source: [string]; // A számlaadat-szolgáltatás forrása
  transactionId: [string]; // A számlaadat-szolgáltatás tranzakcióazonosítója;
  requestStatus: [string]; // A tranzakció státusza
  technicalAnnulment: [boolean]; // Jelöli, hogy a tranzakció technikai érvénytelenítést tartalmaz
  originalRequestVersion: [string]; // A számlaadat-szolgáltatás requestVersion értéke
  itemCount: [number]; // A számlaadat-szolgáltatás tételeinek száma
};

export type QueryTransactionListResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  transactionListResult: [
    {
      currentPage: [number]; // A jelenleg lekérdezett lap értéke
      availablePage: [number]; // Az elérhető legnagyobb lap értéke
      transaction?: TransactionType[];
    }
  ];
};

export type TechnicalValidationMessagesType = {
  validationResultCode: [string]; // Technikai validáció eredménye;
  validationErrorCode: [string]; // Validációs hibakód;
  message?: [string]; // Feldolgozási üzenet;
};

export type PointerType = {
  tag?: [string]; // Tag hivatkozás
  value?: [string]; //  Érték hivatkozás
  line?: [number]; // Sorhivatkozás
  originalInvoiceNumber?: [string]; // Kötegelt számla művelet esetén az eredeti számla sorszáma, melyre a módosítás vonatkozik
};

export type BusinessValidationMessagesType = {
  validationResultCode: [string]; // Üzleti validáció eredménye;
  validationErrorCode: [string]; // Validációs hibakód;
  message?: [string]; // Feldolgozási üzenet;
  pointer?: PointerType[];
};

export type ProcessingResultType = {
  index: [number]; // A számlaadatszolgáltatás; tranzakciójának indexe;
  batchIndex?: [number]; // Kötegelt módosítás esetén a számla sorszáma a kötegen belül
  invoiceStatus: [string]; //  A számla feldolgozási; státusza;
  technicalValidationMessages?: TechnicalValidationMessagesType[];
  businessValidationMessages?: BusinessValidationMessagesType[];
  compressedContent: [boolean]; // Jelöli, ha az originalRequest tartalmát a BASE64 dekódolást követően még ki kell tömöríteni az olvasáshoz;
  originalRequest?: [string]; // Az eredeti számlaadat;
};

export type QueryTransactionStatusResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  processsingResult?: [
    {
      processingResult: ProcessingResultType[];
      originalRequestVersion: [string]; // Az adatszolgáltatás; requestVersion értéke;
      annulmentData?: [
        {
          annulmentVerificationStatus: [string]; // A technikai érvénytelenítő kérések jóváhagyási státusza
          annulmentDecisionDate?: [Date]; // A technikai érvénytelenítés jóváhagyásának vagy elutasításának időpontja UTC időben
          annulmentDecisionUser?: [string]; // A technikai érvénytelenítést jóváhagyó vagy elutasító felhasználó neve
        }
      ];
    }
  ];
};

export type TaxpayerAddressItemType = {
  taxpayerAddressType: [string]; // Adózói címtípus
  taxpayerAddress: [
    {
      countryCode: [string]; // Országkód ISO 3166 alpha-2 szabvány szerint
      region?: [string]; // Tartománykód ISO 3166 alpha-2 szabvány szerint
      postalCode: [string]; // Irányítószám
      city: [string]; // város
      streetName: [string]; // Közterület neve
      publicPlaceCategory: [string]; // Közterület jellege
      number?: [string]; // Házszám
      building?: [string]; // Épület
      staircase?: [string]; // Lépcsőház
      floor?: [string]; // Emelet
      door?: [string]; // Ajtó
      lotNumber?: [string]; // Helyrajzi szám
    }
  ];
};

export type QueryTaxpayerResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  infoDate?: [Date]; // A lekérdezett adószám utolsó változásának időpontja
  taxpayerValidity?: [boolean]; // A lekérdezett adószám érvényességének státusza (ha az adószám létezik)
  taxpayerData?: [
    {
      taxpayerName: [string]; // A lekérdezett adózó neve
      taxpayerShortName?: [string]; // Az adózó rövid neve;
      taxNumberDetail: [
        {
          taxpayerId: [string]; //Az adóalany adó törzsszáma;
          vatCode?: [string]; // Áfakód az adóalanyiság típusának jelzésére
          countyCode?: [string]; // Megyekód
        }
      ];

      incorporation: [string]; // Gazdasági típus
      vatGroupMembership?: [string]; // Az adózó áfacsoport tagsága
      taxpayeraddressList?: [
        {
          taxpayerAddressItem: TaxpayerAddressItemType[];
        }
      ];
    }
  ];
};
