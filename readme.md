```

    Projekt: 24Hours - 24Hours Moment Creator .
    Ansvarlige: Elever og Undervisere på Medie College Viborg

    Alt kode er skrevet ved hjælp af JavaScript, Html og CSS.
    Vi benytter node til backend funktionalitet såsom skrive, slette og kopiere filer.

    Kig på package.json for at se vores pakker.
    
    Vi benytter express til lokalt udviklings miljø.

```

# Introduktion.

I moderne udvikling taler vi meget om Cloud, Micro Services og Headless servere osv.

Denne applikation kan betragtes som en "micro service" i den forstand at det er en applikation med ét simpelt formål i en større sammenhæng. Den skal oprette moment sider til brug på 24Hours sitet.

Når der skal inddateres data til en applikation, skal det foregår "et eller andet sted". Det foregår traditionelt i et form for CMS (*content-management-system*).

CMS´er kan have en tendens til at vokse sig enorme i takt med at ønsker og behov vokser, og derfor er opdelingen i "micro services" en mulighed for at dele ansvar op i meget mindre bidder. 
Det gør det lettere at vedligeholde og udskifte dele af sin infrastruktur, når andre muligheder byder sig.

Denne applikation er en headless service til at oprette moments til 24hours sitet. Det er i princippet et meget lille CMS system. Vi arbejder med filerne lokalt men det kunne lige så godt foregå på en server i sky´en.

Der hvor vi yderligere adskiller os, er at vi ikke har automatiseret den sidste del af processen, men derimod selv aflevere/uploader vores resultat.

Nedenfor er en beskrivelsen af hvordan du kommer igang med at benytte applikationen.

# Opstart.

Klon eller kopier dette projekt til din egen maskine.

## Install

Benyt kommandoen nedenfor for at installere node_modules.
```
npm install
```

## Start

Benyt kommandoen nedenfor for at starte serveren.
```
npm run start-server 
```

Siden vil nu køre på din maskine ~ se kommando prompten for `http://localhost:1337` adressen, den kan være ændret.

## Oprette moments

Du vil blive mødt af en side med en overskrift "Opret et øjeblik".

Her vil du se en formular til at oprette ``stamdata`` for den pågældende fotografs "øjeblik".

### Stamdata

#### 1. Oprette stamdata

Når vi opretter stamdata først, gør vi det for automatisk at få oprettet:

* En html.fil
* En json.fil
* En asset mappe til billeder.

#### Stamdata Object. (*Bemærk at vi skal have square billede med*)
```
{
    "title": "En god titel",
    "time": "18:30",
    "date": "2022-05-04",
    "square": "01-rep.jpg",
    "description": "En god beskrivelse 💪",
    "author": "En forfatter "
}
```

### Templates

Næste skridt er at tilføje mindst én template til selve øjeblikket.

Det er muligt at benytte tre forskellige templates. Navngivet udfra det meget sindrige system 01, 02, 03.

#### Template 01
```
{
    "template": "01",
    "media": [
        {
            "image": "[BILLEDE.jpg]",
            "text": "[BILLEDE_TEKST]"
        },
        {
            "image": "[BILLEDE.jpg]",
            "text": "[BILLEDE_TEKST]"
        }
    ]
}
```

#### Template 02
```
{
    "template": "02",
    "media": [
        {
            "image": "[BILLEDE.jpg]",
            "text": "[BILLEDE_TEKST]"
        }
    ]
}
```

#### Template 03
```
{
    "template": "02",
    "media": [
        {
            "image": "[BILLEDE.jpg]",
            "text": "[BILLEDE_TEKST]"
        }
    ]
}
```
Benyt mindst én af disse templates og gerne flere, der er i princippet ingen begrænsning.

## Afslut.

Når du er færdig tryk afslut.

Nu har du en mappe med de filer der skal på serveren for dette moment. Denne mappe skal afleveres til den ansvarlige for upload til serveren.



