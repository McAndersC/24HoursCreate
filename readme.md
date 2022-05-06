```

    Projekt: MCDM - 24Hours Moment Creator Software Solutions.
    Ansvarlige: Elever og Undervisere på Medie College Viborg

```

# Introduktion.

I moderne udvikling taler vi meget om Cloud, Micro Services og Headless.

Denne applikation kan betragtes som en "micro service" i den forstand at det er en applikation med ét formål. At oprette moment sider til brug på 24Hours sitet.

Når der skal inddateres data til en applikation, skal det foregår "et eller andet sted". Det foregår traditionelt i et form for CMS (*content-management-system*).

CMS´er kan have en tendens til at vokse sig enorme i takt med at ønsker og behov vokser og derfor er opdelingen i "micro services" en mulighed for at dele programmernes ansvar op i meget mindre bidder.

Denne applikation er en mikro service til at oprette moments til 24hours sitet. Det er i princippet et meget lille CMS system.

Der hvor vi adskiller os er at vi ikke har automatiseret den sidste del af processen men derimod selv aflevere/uploader vores resultat.

Nedenfor er en beskrivelsen af hvordan du kommer igang med at benytte applikationen.

Alt kode er skrevet ved hjælp af JavaScript, Html og CSS.
Vi benytter node til backend funktionalitet, skrive, slette og kopiere filer.

# Opstart.

Klon eller kopier dette projekt til din egen maskine.

## Start

Benyt kommandoen nedenfor for at starte serveren.
```
npm run start-server 
```

Siden vil nu køre på din maskine se kommando prompten for selve localhost adressen.

## Oprette moments

Når du url´en vil du blive mødt af en side med en overskrift "Opret et øjeblik".

Her vil du se en formular til at oprette ``stamdata`` for den pågældende fotografs "øjeblik".

### Stamdata

Når vi opretter stamdata først, gør vi det for automatisk at få oprettet:

* En html.fil
* En json.fil
* En asset mappe til billeder.

Herefter kan vi kopiere fotografens billeder ind i assets mappen.

Nu kan vi tilføje templates.

### Templates

Næste skridt er at tilføje mindst én template til selve øjeblikket.


.....to be......



