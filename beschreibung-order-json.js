// Dateibeschreibung Bestellung bei RECUP
//
// Format   : JSON
// Encoding : UTF-8
// Version  : 2020-01-17T16:00:36Z
// Autor    : Carlo Zottmann <carlo.zottmann@recup.de>

---

{
  // <String> ID der Filiale im System des Kunden
  locationIdentifier: 'PO12345',

  // <String> Bestellnummer im System des Kunden
  orderId: 'O23456',

  // <String> Timestamp der Bestellung, ISO-8601
  orderTime: "2019-10-04T10:10:05Z",

  // <Array> Liste der bestellten Artikel
  orderItems: [
    {
      // <String> RECUP-Artikel-ID
      articleNumber: "ART-123",

      // <Integer> Anzahl
      quantity: 1
    },
    {
      // <String> RECUP-Artikel-ID
      articleNumber: "ART-124",

      // <Integer> Anzahl
      quantity: 5
    }
  ],

  // <Object> Lieferadresse
  shippingDetails: {
    // <String> Name der Firma
    company: "Musterfirma GmbH",

    // <String> Ansprechpartner Vorname
    firstName: "Max",

    // <String> Ansprechpartner Nachname
    lastName: "Mustermann",

    // <String> Adresse Straße
    street: "Mustermannstraße 92",

    // <String> Adresse Postleitzahl
    zipCode: "99999",

    // <String> Adresse Stadt
    city: "Musterstadthausendorf"
  },

  // <String> Eindeutige Datei-Nr. (optional)
  fileId: '1'
}
