# Schnittstellenbeschreibung RECUP Partner-Plattform ⇄ Kunden

Version: 2020-01-31  
Autor: Carlo Zottmann, it@recup.de


## Generelles

Der Datenaustausch zwischen Kunden und RECUP erfolgt über einen SFTP-Server. Der Server wird bereitgestellt von RECUP.

Der Kunde legt Bestellungen als JSON-Files auf dem Server ab, deren Verarbeitung erfolgt periodisch durch RECUP. Nach Bearbeitung wird RECUP das jeweilige File aus dem Eingangsordner entfernen.


## Anlieferung von Bestellungen

Jede Bestellung muss in einer separaten JSON-Datei mit der Dateiendung `.json` im Encoding UTF-8 übermittelt werden, deren Dateiname eindeutig sein muss. Als Dateiname bieten sich z.B. an:

    * Timestamp
    * Timestamp + Filial-ID im System des Kunden
    * eindeutige Bestellnummer im System des Kunden

Die Bestellungen werden vom Kunden in das SFTP-Verzeichnis `/orders/` gespeichert.

Jede eingehende JSON-Datei wird automatisch nach RECUP's JSON-Schema validiert. Wenn diese Validierung fehlschlägt, wird die Datei in das Verzeichnis `/orders/unprocessable/` verschoben und nicht verarbeitet. Dateien in diesem Verzeichnis dienen dem Kunden als Hinweis auf Fehler bei der Erstellung der Bestelldaten, RECUP wird nicht gesondert darauf hinweisen.

JSON-Schema: https://github.com/recup/servitor/blob/master/lib/order_schema.json
JSON Schema Validator: https://www.jsonschemavalidator.net/
Beispiel: ~/Dev\ Bucket/Beispiel-Bestellung.json

### TL;DR

- SFTP-Verzeichnis `/orders/`
- eine JSON-Datei pro Bestellung, UTF-8
- Dateiname `XYZ.json`, "XYZ" muss eindeutig/unique sein
- eingehende JSON-Datei werden nach Schema validiert
	- Erfolg: weitere Verarbeitung
	- Fehler: Datei wird in `/orders/unprocessable/` verschoben, keine Verarbeitung


### Hinweise zu Datenfeldern

- RECUP-Artikelnummern beginnen immer mit "ART-"
- `firstName` und `lastName` dürfen leer sein (leerer String)
- sind `company`, `firstName` und `lastName` gesetzt, werden diese Felder als Empfänger auf dem Versandetikett stehen


### Verantwortlichkeiten

- Bereitstellung der SFTP-Server: RECUP
- Bereitstellung der Bestelldaten auf SFTP-Server (Push): Kunde
- Verarbeitung & Verschieben der Bestelldaten: RECUP
- periodischer Check auf nicht verarbeitbare JSON-Dateien: Kunde


## TODO / TBD

Infos zu Mailversand während der Bestellung?

