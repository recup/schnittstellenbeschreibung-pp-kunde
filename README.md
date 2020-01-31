# Schnittstellenbeschreibung RECUP Partner-Plattform ⇄ Kunden

Version: 2020-01-31  
Autor: Carlo Zottmann, it@recup.de


## Generelles

Der Datenaustausch zwischen Kunden und RECUP erfolgt asynchron über einen
SFTP-Server. Der Server wird bereitgestellt von RECUP.

RECUP betreibt zwei SFTP-Server: Entwicklung/Staging und Production.
Bestellungen etc. aus dem Test-/Entwicklungsbetrieb müssen von beiden Parteien
getrennt von Daten aus dem Live-Betrieb behandelt werden.

Beim Aufsetzen der Schnittstellen wird RECUP dem Kunden zusammen mit den
SFTP-Zugangsdaten die zu verwendende Version der Schnittstellenbeschreibung
mitteilen.


## Anlieferung von Bestellungen

Der Kunde legt Bestellungen als JSON-Files auf dem Server ab, deren Verarbeitung
erfolgt periodisch durch RECUP. Nach Bearbeitung wird RECUP das jeweilige File
aus dem Eingangsordner entfernen.

Jede Bestellung muss in einer separaten JSON-Datei mit der Endung `.json`
im Encoding UTF-8 übermittelt werden, deren Dateiname eindeutig sein muss. Als
Dateiname bieten sich z.B. an:

- Timestamp
- Timestamp + Filial-ID im System des Kunden
- eindeutige Bestellnummer im System des Kunden

Die Bestellungen werden vom Kunden in das SFTP-Verzeichnis `/orders/`
gespeichert.

Jede eingehende JSON-Datei wird automatisch nach
[RECUP's JSON-Schema](order_schema-2020-01-17.json) validiert. Wenn diese
Validierung fehlschlägt, wird die Datei in das Verzeichnis
`/orders/unprocessable/` verschoben und nicht verarbeitet. Dateien in diesem
Verzeichnis dienen dem Kunden als Hinweis auf Fehler in der Struktur der
Bestelldaten, RECUP wird nicht gesondert darauf hinweisen.

Automatisiert erstellten JSON-Dateien sollte der Kunde während der Entwicklung
mittels eines JSON-Validators testen. Validatoren gibt es für alle gängigen
Programmiersprachen, hierbei kann RECUP aber keine Empfehlung aussprechen.  Für
schnelle Einmal-Tests hat sich bisher der frei verfügbare
[JSON Schema Validator](https://www.jsonschemavalidator.net/) bewährt.


### TL;DR

- SFTP-Verzeichnis `/orders/`
- eine JSON-Datei pro Bestellung, UTF-8
- Dateiname `XYZ.json`, "XYZ" muss eindeutig/unique sein
- eingehende JSON-Datei werden nach
  [RECUP's JSON-Schema](order_schema-2020-01-17.json) validiert
  - Erfolg: weitere Verarbeitung
  - Fehler: Datei wird in `/orders/unprocessable/` verschoben, keine Verarbeitung
- Beispiel einer JSON-Bestelldatei:
  - [mit Beschreibung](order-json-beschreibung.js)
  - [ohne Beschreibung](order-json-beispiel.json)


### Hinweise zu Datenfeldern

- RECUP-Artikelnummern beginnen immer mit "ART-"
- `firstName` und `lastName` dürfen leer sein (leerer String)
- sind `company`, `firstName` und `lastName` gesetzt, werden diese Felder als
  Empfänger auf dem Versandetikett stehen


### Verantwortlichkeiten

- Bereitstellung der SFTP-Server: RECUP
- Bereitstellung der Bestelldaten auf SFTP-Server (Push): Kunde
- Verarbeitung & Verschieben der Bestelldaten: RECUP
- periodischer Check auf nicht verarbeitbare JSON-Dateien: Kunde


## Änderungen an diesem Dokument

### 2020-01-31

Initiale Version.
