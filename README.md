# LeBonSandwich

## Commencer

Ces instructions vous permettront d'obtenir une copie du projet opérationnel sur votre machine locale à des fins de développement et de test. Voir déploiement pour les notes sur la façon de déployer le projet sur un système actif.

**Requetes api public :** api.lbs.local:10080

**Requete api privée :** private.lbs.local:10090

**Backeng de gestion :** gestion.lbs.local:10081

### Documentation API
* api.lbs.local:10080/apidoc
* private.lbs.local:10090/apidoc
* gestion.lbs.local:10081/apidoc


### Prérequis

Nécéssite Composer

### Installation

Récupération du projet

```
Clone le depot git
```

```
Importation de la BDD /sql/lbs.sql
```

```
Configuration du fichier src/conf/lbs.db.conf.ini
```

```
docker-compose up
```

```
docker-compose start
```

```
Dans /src composer install
```

## Fait avec

* [Slim](https://www.slimframework.com/) - Framework PhP
* [Eloquent](https://laravel.com/docs/5.0/eloquent) - ORM
* [Twig](https://twig.symfony.com/) - Template engine for PHP

## Auteurs

* **Daniel Ricklin** - [Github](https://github.com/DanielRicklin)
* **Mohamed Alhasne** - [Github](https://github.com/alhasnecode)
* **Baptiste Texier**- [Github](https://github.com/texier54)
* **Islam Elshobokshy** - [Github](https://github.com/elshobokshy)
