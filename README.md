#  📝 [Munkaidő Nyilvántartás](https://csikito.github.io/working_time_management/) 📝

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

## Képek
   ### Napi   
   ![day](https://github.com/user-attachments/assets/99f3ace2-ee71-4317-8443-6c73c54faf2f)
   ### Szerkesztés
   ![edit](https://github.com/user-attachments/assets/0bee8081-09d8-4aa0-8d1b-afc5c16bd721)
   ### Heti
   ![week](https://github.com/user-attachments/assets/79891f8a-4b42-4978-8a42-0aff9d2188af)
   ### Havi
   ![month](https://github.com/user-attachments/assets/4ee48bf2-435e-48a1-a575-1952c3d5a063)
   
## Megjegyzés
Ezt a projektet 8 + 3 óra alatt készítettem el. Az időkeret szűkössége miatt a funkcionalitásra és a kód alapvető strukturáltságára helyeztem a hangsúlyt. Tisztában vagyok vele, hogy van még hová fejlődni, és bízom benne, hogy a jövőbeli projekteken tovább tudom fejleszteni a készségeimet.
