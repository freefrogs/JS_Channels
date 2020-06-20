### RWD tests
* Chrome DevTools,
* [Responsive View](http://responsiv.eu/),
* [Website Responsive Testing Tool](http://responsivetesttool.com/).

### Credits
* [regex](https://regex101.com/),
* stackoverflow & google,

### Opisy do rozwiązania
* zad1 -> założyłam, że kafelki kanałów ładują się w js;
* zad2 -> założyłam, że Wasze style to poprawne style i starałam się w nie mocno nie ingerować;
* zad3a -> założyłam, że użytkownik wyszukuje kanał po jego nazwie oraz, że jeżeli nie ma warunku (żaden z radio nie jest checked) to przycisk rosnąco/malejąco nie powinien być widoczny;
* zad3b -> ponieważ używam RegExp zablokowałam możliwość wprowadzania znaków specjalnych dla RegExp; polskie znaki podmieniam zarówno w input.value jak i w channel.title, a wpływ wielkości znaków niweluję za pomocą flagi 'i' (case-insensitive);
* zad3c -> po wyczyszczeniu danych pobieram ponownie dane dla kafelków tak jak w przypadku załadowania strony; 
* zad3d -> nie znam utm, gdy zaczełam o tym czytać okazał się to duży temat (pozostawiłam go do doczytania); rozwiązanie nie zostało przetestowane w Google Analytics; 
* zad3e -> założyłam, że liczba subscribers, videos i views zawsze bedzie całkowita;
