/**
 * Operáció opció típusok
 */

export type annulmentOperation = {
  index: number; // A technikai érvénytelenítés pozíciója a kérésen belül
  annulmentOperation: 'ANNUL'; // A kért technikai érvénytelenítési művelet megjelölése
  invoiceAnnulment: string; // A technikai érvénytelenítés adatai BASE64 kódolásban
};

export type ManageAnnulmentOptions = {
  exchangeToken: string; // Adatszolgáltatási token (tokenExchange)
  annulmentOperations: {
    annulmentOperation: annulmentOperation[];
  };
};

type InvoiceOperation = 'CREATE' | 'MODIFY' | 'STORNO';

export type ManageInvoiceOptions = {
  exchangeToken: string; // Adatszolgáltatási token (tokenExchange)
  invoiceOperations: {
    compressedContent: boolean; // Tömörített tartalom jelzése a feldolgozási folyamat számára
    invoiceOperation: {
      index: number; // A számla pozíciója a kérésen belül
      invoiceOperation: InvoiceOperation; // A számlaművelet megjelölése
      invoiceData: string; // A számla adatai BASE64 kódolásban
      // Számlaállomány hash-lenyomata
      // Ha a completenessIndicator értéke true, az egyetlen elfogadott érték az SHA3-512.
      // Ha a completenessIndicator jelölő értéke false, az elfogadott értékek: SHA3-512, SHA-256.
      electronicInvoiceHash?: string;
    }[];
  };
};

type InvoiceDirection = 'OUTBOUND' | 'INBOUND';

export type QueryInvoiceChainDigestOptions = {
  page: number; // A lekérdezni kívánt lap száma
  invoiceChainQuery: {
    invoiceNumber: string; // A keresett számla száma
    invoiceDirection: InvoiceDirection; // A keresés iránya, a keresés elvégezhető kiállítóként és vevőként is
    taxNumber?: string; //A kiállító/vevő adószáma
  };
};

type InvoiceNumberQuery = {
  invoiceNumber: string; // A keresett számla száma
  invoiceDirection: InvoiceDirection; // A keresés iránya, a keresés elvégezhető kiállítóként és vevőként is
  batchIndex?: number; // A módosító okirat sorszáma kötegelt módosítás esetén
  supplierTaxNumber?: string; // A kiállító adószáma vevő oldali keresés esetén;
};

export type QueryInvoiceCheckOptions = {
  invoiceNumberQuery: InvoiceNumberQuery;
};

export type QueryInvoiceDataOptions = {
  invoiceNumberQuery: InvoiceNumberQuery;
};

export type RelationQueryMonetary = {
  queryOperator: 'EQ' | 'GT' | 'GTE' | 'LT' | 'LTE'; // Relációs kereső operátor
  queryValue: string; // A keresett érték
};

type DateTimeIntervalParamType = {
  dateTimeFrom: string; // Számla feldolgozásának időbélyeges, nagyobb vagy egyenlő keresőparamétere UTC idő szerint
  dateTimeTo: string; // Számla feldolgozásának időbélyeges, kisebb vagy egyenlő keresőparamétere UTC idő szerint
};

export type QueryInvoiceDigestOptions = {
  page: number; // A lekérdezni kívánt lap száma
  invoiceDirection: InvoiceDirection; // A keresés iránya, a keresés elvégezhető kiállítóként és vevőként is
  invoiceQueryParams: {
    mandatoryQueryParams: {
      invoiceIssueDate?: {
        dateFrom: string; // Számla kiállításának nagyobb vagy egyenlő keresőparamétere
        dateTo: string; // Számla kiállításának kisebb vagy egyenlő keresőparamétere
      };
      insDate?: DateTimeIntervalParamType;
      originalInvoiceNumber?: string; // Számlalánc keresőparaméter az alapszámla számával
    };
    additionalQueryParams?: {
      taxNumber?: string; // A számla kiállítójának vagy vevőjének adószáma;
      groupMemberTaxNumber?: string; // A számla kiállítójának vagy vevőjének csoporttag adószáma
      name?: string; // A számla kiállítójának vagy vevőjének keresőparamétere szó eleji egyezőségre
      invoiceCategory?: 'NORMAL' | 'SIMPLIFIED' | 'AGGREGATE'; // A számla típusa
      paymentMethod?: 'TRANSFER' | 'CASH' | 'CARD' | 'VOUCHER' | 'OTHER'; // Fizetés módja
      invoiceAppearance?: 'PAPER' | 'ELECTRONIC' | 'EDI' | 'UNKNOWN'; // A számla megjelenési formája
      source?: 'WEB' | 'XML' | 'MGM' | 'OPG'; // Az adatszolgálatás forrása
      curreyncy?: string; // A számla pénzneme
    };
    relationalQueryParams?: {
      invoiceDelivery?: RelationQueryMonetary;
      paymentDate?: RelationQueryMonetary;
      invoiceNetAmount?: RelationQueryMonetary;
      invoiceNetAmountHUF?: RelationQueryMonetary;
      invoiceVatAmount?: RelationQueryMonetary;
      invoiceVatAmountHUF?: RelationQueryMonetary;
    };
    transactionQueryParams?: {
      transactionId?: string; // A keresett tranzakció azonosítója
      index?: string; // A keresett számla sorszáma a tranzakción belül;
      invoiceOperation?: InvoiceOperation; // Számlaművelet keresőparamétere
    };
  };
};

export type QueryTransactionListOptions = {
  page: number; // A lekérdezésre kívánt lap száma
  insDate: DateTimeIntervalParamType;
  requestStatus?: 'RECEIVED' | 'PROCESSING' | 'SAVED' | 'FINISHED' | 'NOTIFIED'; // Az adatszolgáltatás maga az elektronikus számla
};

export type QueryTransactionStatusOptions = {
  transactionId: string; // A lekérdezni kívánt tranzakció azonosítója
  returnOriginalRequest?: boolean; // Az eredeti tartalom lekérdezésének jelölője;
};

export type QueryTaxpayerOptions = {
  taxNumber: string; // A lekérdezni kívánt magyar adószám első 8 jegye
};
