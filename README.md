# Progetto di Programmazione Avanzata 2022 - ProjectGraph_pa 

## Obiettivo del progetto
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

Invece, le operazione ammesse per l'Admin sono:
- Effettuare la ricarica per un utente fornendo la mail ed il “credito” da aggiungere,
- Creare un nuovo User

### Framework e librerie
- [Node.js](https://nodejs.org/it/)
- [Express](https://expressjs.com/it/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com)
- [node-dijkstra](https://www.npmjs.com/package/node-dijkstra)

### Rotte

|Tipo|Rotta|Ruolo|
|:---:|:---:|:---:|
|POST|/addModel|User|
|POST|/executeModel|User|
|POST|/changeWeight|User|
|GET|/models/:nodes/:edges|User|
|GET|/delete/:ids|User|
|GET|/executions|User|
|POST|/simulation|User|
|POST|/recharge|Admin|
|POST|/addUser|Admin|

### Autenticazione mediante JWT
Tutte le rotte implementate richiedono che nella richiesta l'utente specifichi un token JWT valido, il quale conterrà i dati essenziali e permetterà l'autenticazione. Il payload del JWT deve contenere i campi "username" e "main_role". Questi valori vengono confrontati e validati se corrispondono a quelli presenti nel Database.
Esempio di payload associato al token dell'utente:
~~~
{
    "username": "username",
    "main_role": 2
}
~~~

Esempio di payload associato al token dell'admin:
~~~
{
    "username": "admin",
    "main_role": 2
    "mail": "user@name.com",
    "budget": 10
}
~~~

#####  1) /addModel
Questa rotta POST permette di creare un nuovo modello valido.
Il modello viene passato nel body della richiesta.
Prima di poter creare il modello, la richiesta deve superare i controlli del middleware, in modo da capire se l'utente ha credito sufficiente e se il grafo è formattato correttamente. Successivamente, si procede ad inserire nel database il nuovo modello.
Un esempio di body valido:
~~~
{
	"graph": {
		"A": {
			"B": 1
		},
		"B": {
			"A": 1,
			"C": 2,
			"D": 4
		}
	}
}
~~~

##### 2) /executeModel
Questa rotta POST permette di eseguire uno dei modelli.
Nel body della richiesta si devono specificare: id del modello, il nordo di partenza e il nodo di destinazione.
Prima di poter eseguire il modello, la richiesta deve superare i controlli del middleware, in modo da capire se l'utente ha credito sufficiente e se il modello esiste. Successivamente, si procede con l'esecuzione del modello al fine di ottenere il percorso migliore e il costo associato (in termini di pesi).
Un esempio di body valido:
~~~
{
	"id": 1,
	"start": "A",
	"stop": "B"
}
~~~

#### 3) /changeWeight
Questa rotta POST permette di cambiare peso ad uno o più archi.
Nel body della richiesta si devono specificare il/i grafo/i; internamente si devono specificare: id del modello, il primo estremo dell'arco, il secondo estremo dell'arco, il peso suggerito dall'utente.
Prima di poter cambiare il peso, la richiesta deve superare i controlli del middleware, in modo da capire se l'utente esiste e se i parametri sono validi; succesivamente, qualora l'arco esista, si procede con l'aggiornamento del peso dell’arco mediante una media esponenziale $p(i,j) = α * p(i,j) + (1 – α) * p_{new}(i,j)$ dove $p(i,j)$ è il precedente costo associato all’arco che collega i nodi $(i,j)$ e $p_{new}$ è il nuovo costo suggerito dall’utente. L'aggiornamento consiste nella creazione di un modello con una nuova versione.
Un esempio di body valido:
~~~
{
	"graphs": [{
		"id": 1,
		"first_node": "A",
		"second_node": "B",
		"weight": 2
	}, {
		"id": 2,
		"first_node": "B",
		"second_node": "C",
		"weight": 6
	}]
}
~~~

#### 4) /models/:nodes/:edges
Questa rotta GET permette di fitrare i modelli associati all'utente in base al numero di nodi e di archi specificati.
Prima di poter creare il modello, la richiesta deve superare i controlli del middleware, in modo da capire se l'utente esiste.
In seguito, verranno restituiti i modelli.

#### 5) /delete/:ids
Questa rotta GET permette di cancellare uno o più modelli associati all'utente.
Prima dell'eliminazione, si esegue un controllo riguardo all'esistenza dell'utente richiedente e successivamente si procede.

#### 6) /executions
Questa rotta GET restituisce l'elenco delle esecuzioni, riportando i dati come id dell'esecuzione, tempo di esecuzione, costo di esecuzione, id del modello, costo relativo alla soluzione ottima, nodo di partenza e nodo di arrivo.

#### 7) /simulation
Questa rotta POST consente di effettuare una simulazione.
Nel body della richiesta si devono specificare: id del modello, il primo estremo dell'arco, il secondo estremo dell'arco, il peso iniziale, il peso finale, il passo di incremento, il nodo di partenza e il nodo di arrivo.
Prima di poter avviare la simulazione, la richiesta deve superare i controlli del middleware, in modo da capire se l'utente esiste e se i parametri passati sono validi. In seguito, si procede con la simulazione e si ottiene l'elenco di tutti i risultati, il best result e relativa configurazione dei pesi.
Un esempio di body valido:
~~~
{
	"id": 1,
	"fNode": "A",
	"sNode": "B",
	"startWeight": 2,
	"stopWeight": 4,
	"step": 0.5,
	"startNode": "A",
	"stopNode": "D"
}
~~~

#### 8) /recharge
Questa rotta POST consente di effettuare la ricarica per un utente da parte di un admin.
Prima di procedere con la ricarica viene fatto un controllo del privilegio e della mail; se l'esito è positivo, si restituisce il nome dell'utente con il credito aggiornato.

#### 9) /addUser
Questa rotta POST consente di creare un nuovo utente da parte di un admin.
Affinchè la richiesta sia valida, nel body bisogna specificare il nome scelto per l'utente.
Prima di procedere con la creazione viene fatto un controllo del privilegio e dell'eventuale presenza di un utente con lo stesso nome. Successivamente avviene la creazione.
Un esempio di body valido:
~~~
{
	"name": "user_name"
}
~~~

## Progettazione

### Use Case Diagram

- User
<img src = "/Images/Use_Case_User.png">

- Admin
<img src = "/Images/Use_Case_Admin.png">

### Sequence Diagram

- Middleware User
<img src = "/Images/Sequence_Middleware_User.png">

- Middleware Admin
<img src = "/Images/Sequence_Middleware_Admin.png">

- Middleware Errore
<img src = "/Images/Sequence_Middleware_Err.png">

>  POST /addModel
<img src = "/Images/Sequence_nuovo_modello.png">

> POST /executeModel
<img src = "/Images/Sequence_esecuzione_modello.png">

> POST /changeWeight
<img src = "/Images/Sequence_cambio_peso.png">

> GET /models/:nodes/:edges
<img src = "/Images/Sequence_filtro.png">

> GET /delete/:ids
<img src = "/Images/Sequence_cancellazione.png">

> GET /executions
<img src = "/Images/Sequence_esecuzioni.png">

> POST /simulation
<img src = "/Images/Sequence_simulazione.png">

> POST /recharge
<img src = "/Images/Sequence_admin_ricarica.png">

> POST /addUser
<img src = "/Images/Sequence_nuovo_utente.png">

### Pattern implementati

#### Model - View - Controller
L'MVC è un pattern architetturale formato da tre componenti:
- Model, che è vicino ai dati e che aggiorna la vista;
- Controller, che consiste nella gestione delle azioni (API), manipolando il modello;
- View, che è responsabile della visualizzazione grafica.
Generalmente, l'utente utilizza il controller per manipolare lo stato degli oggetti, poi il modello va ad aggiornare la vista; perciò ci potrebbero essere problemi dovuti al forte accoppiamento tra vista (monolitica) e modello. Tuttavia, nel caso in questione non è presente una View vera e propria, in quanto viene utilizzato Postman per eseguire chiamate GET o POST, il quale è un client al pari di un utente (che usa una UI) o di un altro back-end.

<img src = "/Images/MVC.PNG">

#### Singleton
Il Singleton è un design pattern creazionale ed è utile nel momento in cui serve un'istanza singola, evitando la replicazione delle risorse. Perciò, il Singleton è stato implementato per creare una connessione al database, in modo da evitare connessioni multiple.

<img src = "/Images/Singleton.PNG">

#### Factory
La Factory è un design pattern creazionale che permette di creare oggetti in diversi modi, poiché le varie classi concrete implementano la stessa interfaccia. Infatti, tale pattern è stato implementato per descrivere i diversi errori e le diverse eccezioni possibili (ognuna con un proprio messaggio e un proprio status code).

<img src = "/Images/Factory.PNG">

#### Chain Of Responsability
Il CoR è un design pattern comportamentale che permette di passare la richiesta lungo la catena (fin tanto che ci sono gli handler da interrogare) e ad ogni punto di controllo si verifica se non ci sono errori. In particolare, gli handlers hanno lo scopo di verificare che un criterio sia soddisfatto e - se ciò è rispettato - di passare la responsabilità a quello successivo. Nel caso in questione, tale pattern è implementato tramite i middleware, cioè una funzione che ha l'accesso alla richiesta, alla risposta e all'handler successivo, permettendo di fare richieste stratificate; per cui, i middleware error-handling servono per gestire l'errore eventuale.


<img src = "/Images/COR.PNG">

## Avvio del servizio tramite Docker
L'applicazione e il database sono gestiti tramite container Docker, per cui è richiesta l'installazione del Docker Engine e di Docker Compose. Perciò, si devono eseguire i seguenti passi:
- clonare la repository con ``git clone https://github.com/ChriAsc/ProjectGraph_pa``
- posizionarsi nella cartella root del progetto, in cui si trovano il Dockerfile e docker-compose.yml
- modificare il file .env già presente al fine di inserire le variabili d'ambiente, le quali sono
	- MYSQL_DATABASE: il nome del database da utilizzare
	- MYSQL_USER: il nome dell’utente (diverso da root) che si connetterà al DB, creato con la costruzione dell'immagine di mysql
	- MYSQL_PASSWORD: la password dell’utente per accedere al DB
	- MYSQL_HOST: l'host su cui si contatta il database
	- MYSQL_PORT: la porta interna al container su cui si espone il DB
	- HOST: l'host su cui si contatterà il server
	- PORT: la porta interna al container
	- EXTERNAL_PORT: la porta del sistema host su cui si mappa la porta interna al container
	- SECRET_KEY: la chiave usata per la firma del JWT
	- ALPHA: parametro "peso" nella media esponenziale
- avviare Docker mediante il comando ``docker-compose up``

Il servizio sarà disponibile su: ``http://HOST:EXTERNAL_PORT/``

Per terminare e rimuovere i container, digitare ``docker-compose down``.

#### Note
Si consiglia di impostare l'.env nel seguente modo, scegliendo a piacere il valore della chiave per la firma JWT.

* MYSQL_DATABASE=optimization
* MYSQL_USER=mysql
* MYSQL_PASSWORD=pa22
* MYSQL_HOST=mysqldb
* MYSQL_PORT=3306
* PORT=8080
* EXTERNAL_PORT=8080
* SECRET_KEY=
* ALPHA=0.5

In tal caso il servizio sarà disponibile su: http://localhost:8080/

## Test
