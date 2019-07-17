# October Take Home API Project

## Getting Started
To begin the server run the following command:
```
>> node index.js 
```

To test if the api works, in a new tab run the following command:
```
>> curl -sS "{LOCALHOST_PROVIDED_ABOVE}/{QUERY}"
```

## English  
### Description:  
To query a company, enter a "+" or "-" seperated string to the "/" route. If other information of the company needs to be provided, seperate them in the query with the '&' character. 

### Disclaimer:  
In certain cases, the number of the company is not found through google. In this case, I display an error message and ask for more precise information about the company. I chose to do this instead of checking each link in the page as that method is inprecise and nodejs is not multithreaded and cant be parralelized (easily).

## Francais  
### La description:  
Pour chercher une entreprise, entrez un "+" ou "-" chaîne après de la route "/". Si d'autres informations de l'entreprise doit être fournie, séparez-les dans la requête avec '&'.

### Avertissement:  
Dans certains cas, le numéro de l'entreprise n'est pas trouvé par Google. Dans ce cas, j’affiche un message d’erreur et en redemande informations précises sur l'entreprise. J'ai choisi de le faire à la place de vérifier chaque lien dans la page car cette méthode est imprécise et nodejs n'est pas multithread et ne peut être parralélisé (facilement).

## Examples:
### Working:
* china-arts  
* china-arts&75010-paris  
* hotel+bellevue&71000+macon  
* sa-lubing-international&62840-sailly-sur-la-lys  

## Not working due to insufficent information:
* experdeco  
* sa-lubing-international  