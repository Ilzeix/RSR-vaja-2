# Validacija vhoda (be-2)

Paket: **be2-h613**

## Zagon

```bash
npm install
npm run start
```

Ob prvem zagonu se baza `app.db` napolni iz `seed.json`; za svež začetek izbriši `app.db`.

## Naloge

### Naloga 1

Pri ustvarjanju žanra (`POST /genres`) z necelim številom pri `minAge` (npr. `2.5`) se žanr kljub temu ustvari, namesto da bi zahteva vrnila napako.

### Naloga 2

`POST /members` z neveljavnim `email` (brez znaka `@`) kljub temu ustvari člana (odgovor 201), namesto da bi zahteva vrnila 400.

### Naloga 3

Delna posodobitev izposoje (`PATCH /loans/:id`) s telesom, ki vsebuje samo eno od polj (npr. samo `returned`), vrne 400 Bad Request, namesto da bi se posodobilo samo to polje.

### Razširitev 1

`POST /genres` naj `minAge` sprejme samo v mejah 0–18 (vključno). Vrednost izven teh mej →
400 Bad Request.

### Razširitev 2

`PATCH /members/:id` naj sprejme delno telo (eno ali več polj `name`, `email`, `active`) in
jih validira enako kot `POST`; neveljavno polje → 400 Bad Request. Polja, ki jih telo ne
vsebuje, ostanejo nespremenjena. Ta razširitev deluje šele, ko je na tem kontrolerju
registriran `ValidationPipe` (glej pripadajočo nalogo popravka).

### Razširitev 3

`loanedAt` pri `POST /loans` in pri `PATCH /loans/:id` (če je polje podano) ne sme biti datum
v prihodnosti; sicer 400 Bad Request. Dodaj lasten validator decorator z imenom
`@NotInFuture()` na polje `loanedAt` v DTO (implementacija je prepuščena tebi).

Obnašanje, ki ga naloge ne predpisujejo, je prepuščeno tebi. Preostali del aplikacije mora še naprej delovati po spodnji pogodbi (pri preverjanju je to postavka "Ostala aplikacija").

## Obstoječi API (pogodba)

Vsi odgovori so JSON. `id` je število. Seznami so urejeni po `id` naraščajoče. Podatki se ob zagonu naložijo iz `seed.json` (če je baza prazna).

| Vir        | Polja                                                              |
| ---------- | ------------------------------------------------------------------ |
| `/authors` | `id`, `name`, `country`                                            |
| `/books`   | `id`, `title`, `isbn`, `year`, `authorId`                          |
| `/members` | `id`, `name`, `email`, `active`                                    |
| `/genres`  | `id`, `name`, `minAge`                                             |
| `/loans`   | `id`, `bookId`, `memberId`, `loanedAt`, `returned`, `durationDays` |
| `/reviews` | `id`, `bookId`, `rating`, `comment`                                |

| Zahteva             | `/authors`, `/books`, `/members`                    | `/genres`, `/loans`, `/reviews`                                     |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| `GET /<vir>`        | 200, seznam                                         | 200, seznam                                                         |
| `GET /<vir>/:id`    | 200, objekt; neobstoječ id → 404                    | 200, objekt; neobstoječ id → 404                                    |
| `POST /<vir>`       | 201, ustvarjen objekt z `id`; neveljavno telo → 400 | 201, ustvarjen objekt z `id`; neveljavno telo → 400                 |
| `PATCH /<vir>/:id`  | 200, posodobljen objekt; neobstoječ id → 404        | 200, posodobljen objekt; neobstoječ id → 404; neveljavno telo → 400 |
| `DELETE /<vir>/:id` | 200; neobstoječ id → 404                            | –                                                                   |

`GET /health` → 200.

### Validacija telesa zahteve

`POST /<vir>` pri vseh virih preveri telo zahteve po spodnji tabeli; pri neveljavnem telesu vrne 400
Bad Request (oblika sporočila o napaki ni predpisana). Pri `/genres`, `/loans`, `/reviews` enako
velja tudi za `PATCH /<vir>/:id`, in sicer samo za polja, ki so v telesu dejansko podana —
manjkajoča polja ostanejo nespremenjena.

| Vir        | Polje          | Tip / pravilo                     |
| ---------- | -------------- | --------------------------------- |
| `/authors` | `name`         | neprazen niz                      |
|            | `country`      | neprazen niz                      |
| `/books`   | `title`        | neprazen niz                      |
|            | `isbn`         | neprazen niz                      |
|            | `year`         | celo število                      |
|            | `authorId`     | celo število                      |
| `/members` | `name`         | neprazen niz                      |
|            | `email`        | veljaven e-poštni naslov          |
|            | `active`       | logična vrednost (`true`/`false`) |
| `/genres`  | `name`         | neprazen niz                      |
|            | `minAge`       | celo število                      |
| `/loans`   | `bookId`       | celo število                      |
|            | `memberId`     | celo število                      |
|            | `loanedAt`     | niz                               |
|            | `returned`     | logična vrednost (`true`/`false`) |
|            | `durationDays` | celo število                      |
| `/reviews` | `bookId`       | celo število                      |
|            | `comment`      | neprazen niz                      |
|            | `rating`       | celo število                      |

`PATCH /authors/:id`, `PATCH /books/:id` in `PATCH /members/:id` sprejmejo telo z enim ali več
polji; katera polja (če katera) pri tem preverjajo, ni del te pogodbe.

Aplikacija bere vrata iz spremenljivke okolja `PORT` (privzeto 3000) in pot do baze iz `DB_PATH` (privzeto `app.db`). Tega ne spreminjaj: `npm run check` aplikacijo zažene na svojih vratih in s svežo začasno bazo (tvoja `app.db` ostane nedotaknjena).

## Preverjanje

1. Poženi `npm run check`.
2. Izpisano kodo vnesi v aplikacijo pri vaji "Validacija vhoda". Aplikacija ti pokaže, katere naloge so pravilno rešene.

Ne spreminjaj `seed.json` in datotek v mapi `.rsr/`.
