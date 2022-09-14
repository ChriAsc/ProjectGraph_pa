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
