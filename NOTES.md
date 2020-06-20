### RWD tests
* Chrome DevTools,
* [Responsive View](http://responsiv.eu/),
* [Website Responsive Testing Tool](http://responsivetesttool.com/).

### Credits
* [regex](https://regex101.com/),
* stackoverflow & google,

### Opisy do rozwiązania
* zad1 -> założyłam, że kafelki kanałów ładują się w js, nie jestem pewna czy powinnam dodać loader;
* zad2 -> założyłam, że Wasze style to poprawne style i starałam się w nie mocno nie ingerować;
* zad3a -> założyłam, że użytkownik wyszukuje kanał po jego nazwie oraz, że jeżeli nie ma warunku (żaden z radio nie jest checked) to przycisk rosnąco/malejąco nie powinien być widoczny; nie jestem pewna czy z punktu widzenia UX mój guzik rosnąco/malejąco nie jest mylący;
* zad3b -> ponieważ używam RegExp zablokowałam możliwość wprowadzania znaków specjalnych dla RegExp; polskie znaki podmieniam zarówno w input.value jak i w channel.title, a wpływ wielkości znaków niweluję za pomocą flagi 'i' (case-insensitive);
* zad3c -> po wyczyszczeniu danych pobieram ponownie dane dla kafelków (nie jestem pewna czy to jest "ładne" rozwiązanie); 
* zad3d -> 
* zad3e -> założyłam, że liczba subscribers, videos i views zawsze bedzie całkowita;
