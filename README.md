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
In certain cases, the number of the company is not found through google. In this case, I display an error message and ask for more precise information about the company. I chose to do this instead of checking each link in the page as that method is inprecise and nodejs is not multithreaded and cant be parralelized (easily). In addition, if the native Google API cant find the buisness based on the query, the API looks through relevant search results and in these cases, the results are not consistent.  

## Francais  
### La description:  
Pour chercher une entreprise, entrez un "+" ou "-" chaîne après de la route "/". Si d'autres informations de l'entreprise doit être fournie, séparez-les dans la requête avec '&'.

### Avertissement:  
Dans certains cas, le numéro de l'entreprise n'est pas trouvé par Google. Dans ce cas, j’affiche un message d’erreur et en redemande informations précises sur l'entreprise. J'ai choisi de le faire à la place de vérifier chaque lien dans la page car cette méthode est imprécise et nodejs n'est pas multithread et ne peut être parralélisé (facilement). En plus, si l'API Google native ne peut pas trouver l'entreprise en fonction de la requête, mon API examine les résultats de recherche pertinents et, dans ce cas, les résultats ne sont pas cohérents.  

## Examples:
### Working Query's:
* 74970-MARIGNIER (however when EXPERDECO is included in query, there are no results, most likely due to lack of accents)
* SA-LUBING-INTERNATIONAL&62840-SAILLY-SUR-LA-LYS 
* 301941407&SA-LUBING-INTERNATIONAL&62840-SAILLY-SUR-LA-LYS  
* ATMOSPHERE&07110-CHASSIERS 

### Not working when SIREN Added
* 308198449&ATMOSPHERE&07110-CHASSIERS

### Not working due to insufficent information:
* experdeco  
* sa-lubing-international  