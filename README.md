# Munkaidő Nyilvántartás

Ez egy időnyilvántartó alkalmazás, amely lehetővé teszi a felhasználók számára, hogy nyomon kövessék munkaidejüket, megtekintsék a napi, heti és havi összesítőket, és kezeljék a munkaórákat és szabadságokat. Az alkalmazás Vue.js alapú, és Bootstrapet használ a stílushoz.

## Fő Funkciók

- **Napi nézet**: A felhasználók megtekinthetik az adott nap eseményeit óránkénti bontásban, és láthatják a munkaidőt és szabadságot színes sávokkal jelölve.
- **Heti nézet**: A heti összesítőben megjelennek a hét napjai, munkaórák, projektek/tag-ek és szabadság státusz.
- **Havi nézet**: Csempe formátumú naptár, amely összefoglalja a munkaidőt és szabadságot havi bontásban.
- **CRUD műveletek**: Lehetőség van munkaórák hozzáadására, szerkesztésére és törlésére a napi nézetben, illetve a napok közötti váltásra.

## Technológiák

- **Frontend keretrendszer**: Vue.js
- **Stílus**: Bootstrap
- **Adatkezelés**: IndexedDB a munkaidő bejegyzések tárolására
- **Dátumkezelés**: date-fns könyvtár
- **Eseménykezelés**: `emit` események a komponensek közötti kommunikációhoz

## Telepítés és Futtatás

1. Klónozd a projektet:
   ```bash
   git clone working_time_management
   cd working_time_management
   ```

## Telepítsd a szükséges csomagokat:

```
npm install
```

### Futtasd az alkalmazást:

```
npm run serve
```

### Nyisd meg a böngészőt, és látogass el a következő címre:

```
http://localhost:8080
```

## Használat

1.  **Napi nézet**:

    - A napi nézetben az aktuális nap eseményei jelennek meg óránkénti bontásban.
    - A szabadság napok világos zöld sávval vannak jelölve 8:00 és 16:00 között, míg a munkaidő sárga színnel.
    - Az események mellett található gombokkal szerkesztheted vagy törölheted a bejegyzéseket.

2.  **Heti nézet**:

    - A heti nézetben láthatod az összesített munkaórákat, projektek/tag-eket és szabadság státuszt minden napra.
    - Az összes munkaóra a hét végén kerül összegzésre.

3.  **Havi nézet**:

    - A havi nézet egy csempés naptár, amely összefoglalja a napi munkaórákat.
    - A szabadság napokat zölddel, a munkaórás napokat sárgával jelöljük.
