### RWD tests
* Chrome DevTools,
* [Responsive View](http://responsiv.eu/),
* [Website Responsive Testing Tool](http://responsivetesttool.com/).

### Code validation
* [HTML](https://validator.w3.org/),
* [CSS](https://jigsaw.w3.org/css-validator/),
* [JS](https://validatejavascript.com/).

### Credits
* [regex](https://regex101.com/),
* [Can I use](https://www.caniuse.com/),
* [Koa.js Crash Course - Traversy Media](https://www.youtube.com/watch?v=z84uTk5zmak),
* stackoverflow & google,

### Opisy do rozwiązania
* zad1 -> założyłam, że kafelki kanałów ładują się w js;
* zad2 -> założyłam, że Wasze style to poprawne style i starałam się w nie mocno nie ingerować;
* zad3a -> założyłam, że użytkownik wyszukuje kanał po jego nazwie. Jeżeli nie ma warunku (żaden z radio nie jest checked) to przycisk rosnąco/malejąco nie powinien być widoczny oraz w momencie zmiany warunków czyszczona jest wartość input;
* zad3b -> ponieważ użyłam RegExp zablokowałam możliwość wprowadzania znaków specjalnych dla RegExp; polskie znaki podmieniam zarówno w input.value jak i w channel.title, a wpływ wielkości znaków niweluję za pomocą flagi 'i' (case-insensitive);
* zad3c -> po wyczyszczeniu danych pobieram ponownie dane dla kafelków tak jak w przypadku załadowania strony; 
* zad3d -> nie znam utm, gdy zaczełam o tym czytać okazał się to duży temat (pozostawiłam go do doczytania); rozwiązanie nie zostało przetestowane w Google Analytics; 
* zad3e -> założyłam, że liczba subscribers, videos i views zawsze bedzie całkowita;
* dodatkowe1 -> użyłam zmiennych css, zgodnie z Can I Use dla all users są wdrożone w 94,4%;
* dodatkowe2 -> użyłam localStorage oraz notacji dat według schematu: 29 September 2020, założyłam, że każde odświeżenie strony to ponowne wejście na stronę;
* router -> moje pierwsze zetknięcie z Koa, podeszłam do tematu łopatologicznie;