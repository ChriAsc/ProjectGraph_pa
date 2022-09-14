# ProjectGraph_pa - Progetto di Programmazione Avanzata 2022

Il servizio realizzato permette di gestire la creazione e la valutazione di modelli di ottimizzazione su grafo. In particolare, il sistema deve prevedere la possibilità di gestire l’aggiornamento di pesi effettuato da utenti autenticati. Il progetto simula il concetto del crowd-sourcing dove gli utenti possono contribuire in maniera attiva. Un'applicazione potrebbe essere - per esempio - tenere traccia dei minuti che sono necessari per percorre un determinato tratto di strada.

In primo luogo, si individuano due tipologie di utenti che possono accedere al sistema, ovvero lo User e l'Admin, autenticati mediante JWT. 
Riguardo al servizio, le operazioni ammesse per lo User sono:
- Creare un nuovo modello e in particolare specificare il grafo con i relativi pesi
  - Per ogni modello valido viene addebitato un numero di token, con il seguente costo
    - 0.25 per ogni nodo,
    - 0.01 per ogni arco
- Eseguire il modello
  - Per ogni esecuzione viene applicato un costo pari a quello addebitato in fase di creazione
-	Cambiare il peso di uno o più archi
  - Il peso dell’arco viene gestito mediante una media esponenziale
- Filtrare i propri modelli in base al numero di archi e di nodi;
- Cancellare uno o più modelli associati all'utente;
- Ottenere l'elenco delle esecuzioni;
- Effettuare una simulazione che consenta di variare il peso relativo ad un arco, specificando il valore di inizio, fine ed il passo di incremento.

## Framework e librerie
- [Node.js](https://nodejs.org/it/)
- [Express](https://expressjs.com/it/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com)
- [node-dijkstra](https://www.npmjs.com/package/node-dijkstra)
