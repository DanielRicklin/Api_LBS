<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * 
 * @api {get} /commandes?sort=:sort&?state=:state Affichage des commandes
 * @apiGroup commandes
 * @apiVersion  1.0.0
 * 
 * @apiParam {String} sort Ranger les commandes (only 'created_at')
 * @apiParam {Number} state Avoir les commandes selon leur état ('1': commandé, '2': payé, '3': prete, '4': livré)
 * 
 * @apiSuccess (200) {String} type type de requête
 * @apiSuccess (200) {Object} meta Meta données
 * @apiSuccess (200) {Number} meta.count Nombre de commandes
 * @apiSuccess (200) {String} meta.date Date de la requête
 * @apiSuccess (200) {Object} commandes Toutes les commandes
 * @apiSuccess (200) {Number} commandes.id id de la commande
 * @apiSuccess (200) {String} commandes.nom Nom du client
 * @apiSuccess (200) {String} commandes.prenom Prenom du client
 * @apiSuccess (200) {String} commandes.mail Mail du client
 * @apiSuccess (200) {Object} commandes.livraison Date et heure de livraison
 * @apiSuccess (200) {String} commandes.livraison.date Date de livraison
 * @apiSuccess (200) {String} commandes.livraison.heure Heure de livraison
 * @apiSuccess (200) {String} commandes.etat Etat de la livraison 
 * 
 * @apiSuccessExample {json} Success
 *  {
 *      "type": "collection",
 *      "meta": {
 *          "count": 17,
 *          "date": "02-04-2018"
 *      },
 *      "commandes":{
 *          "id": "b37ca5ba-05d0-11e8-ae96-6929a53b463d",
 *          "nom": "Dupont",
 *          "prenom": "Jean",
 *          "mail": "jd@gmail.com",
 *          "livraison": {
 *              "date": "07-02-2019",
 *              "heure": "12:30"
 *          },
 *          "etat": 1
 *      }
 *  }
 * 
 * 
 */
$app->get('/commandes[/]', 'CommandeController:getCommandes')->setName('p_get_commandes');

/**
 * 
 * @api {get} /commandes/:id Affichage des commandes
 * @apiGroup commandes
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} id Id de la commande
 * 
 * @apiSuccess (200) {String} type type de requête
 * @apiSuccess (200) {Object} meta Meta données
 * @apiSuccess (200) {String} meta.date Date de la requête
 * @apiSuccess (200) {Number} meta.locale Langue
 * @apiSuccess (200) {Object} commande Toutes les commandes
 * @apiSuccess (200) {Number} commande.id id de la commande
 * @apiSuccess (200) {String} commande.nom Nom du client
 * @apiSuccess (200) {String} commande.prenom Prenom du client
 * @apiSuccess (200) {String} commande.mail Mail du client
 * @apiSuccess (200) {Object} commande.livraison Date et heure de livraison
 * @apiSuccess (200) {String} commande.livraison.date Date de livraison
 * @apiSuccess (200) {String} commande.livraison.heure Heure de livraison
 * @apiSuccess (200) {String} commande.etat Etat de la livraison 
 * @apiSuccess (200) {Object} commande.items Les sandwichs commandés
 * @apiSuccess (200) {Number} commande.items.id Id de l'item
 * @apiSuccess (200) {Object} commande.items.tailles_sandwich
 * @apiSuccess (200) {Number} commande.items.tailles_sandwich.id Id de la taille
 * @apiSuccess (200) {String} commande.items.tailles_sandwich.nom Nom de la taille
 * @apiSuccess (200) {String} commande.items.tailles_sandwich.description Description de la taille
 * @apiSuccess (200) {Object} commande.items.sandwich
 * @apiSuccess (200) {Number} commande.items.sandwich.id Id du sandwich
 * @apiSuccess (200) {String} commande.items.sandwich.nom Nom du sandwich
 * @apiSuccess (200) {String} commande.items.sandwich.description Description du sandwich
 * @apiSuccess (200) {String} commande.items.sandwich.type_pain Type de pain
 * @apiSuccess (200) {String} commande.items.sandwich.img Img lié au sandwich
 * @apiSuccess (200) {String} commande.items.quantité Nombre d'exemplaire voulu
 * 
 * 
 * @apiSuccessExample {json} Success
 *  {
 *      "type": "collection",
 *      "meta": {
 *          "count": 17,
 *          "date": "02-04-2018"
 *      },
 *      "commandes":{
 *          "id": "b37ca5ba-05d0-11e8-ae96-6929a53b463d",
 *          "nom": "Dupont",
 *          "prenom": "Jean",
 *          "mail": "jd@gmail.com",
 *          "livraison": {
 *              "date": "07-02-2019",
 *              "heure": "12:30"
 *          },
 *          "etat": 1,
 *          "items": {
 *              "id": 2,
 *              "taille_sandwich": {
 *                  "id": 3,
 *                  "nom": "grosse faim",
 *                  "description": "à partager, ou pour les affamés"
 *              },
 *              "sandwich": {
 *                  "id": 7,
 *                  "nom" "le forestier",
 *                  "description": "un bon sandwich au gout de la forêt",
 *                  "type_pain": "pain complet",
 *                  "img": "www.google.fr"
 *              },
 *              "quantité": 2
 *          }
 *      }
 *  }
 * 
 * 
 */
$app->get('/commandes/{id}[/]', 'CommandeController:getCommande')->setName('p_get_commande');

/**
 * 
 * @api {patch} /commandes/:id/edit_state Affichage des commandes
 * @apiGroup commandes
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Number} id Id de la commande
 * @apiParam (paramêtre de la requête) {Number} etat Etat voulu pour la commande ('2': payé, '3':en livraison ou '4': livré)
 * @apiParamExample (json) Input
 *  {
 *      "etat": 2
 *  }
 * 
 * @apiSuccess (201) {String} type type de requête
 * @apiSuccess (201) {Object} meta Meta données
 * @apiSuccess (201) {String} meta.date Date de la requête
 * @apiSuccess (201) {Number} meta.local Langue
 * @apiSuccess (201) {Object} commande Toutes les commandes
 * @apiSuccess (201) {Number} commande.id id de la commande
 * @apiSuccess (201) {String} commande.nom Nom du client
 * @apiSuccess (201) {String} commande.prenom Prenom du client
 * @apiSuccess (201) {String} commande.mail Mail du client
 * @apiSuccess (201) {Object} commande.livraison Date et heure de livraison
 * @apiSuccess (201) {String} commande.livraison.date Date de livraison
 * @apiSuccess (201) {String} commande.livraison.heure Heure de livraison
 * @apiSuccess (201) {String} commande.etat Etat de la livraison 
 * 
 * @apiSuccessExample {json} Success
 *  {
 *      "type": "collection",
 *      "meta": {
 *          "date": "02-04-2018",
 *          "local": "fr-FR"
 *      },
 *      "commandes":{
 *          "id": "b37ca5ba-05d0-11e8-ae96-6929a53b463d",
 *          "nom": "Dupont",
 *          "prenom": "Jean",
 *          "mail": "jd@gmail.com",
 *          "livraison": {
 *              "date": "07-02-2019",
 *              "heure": "12:30"
 *          },
 *          "etat": 2
 *      }
 *  }
 * 
 */
$app->patch('/commandes/{id}/edit_state[/]', 'CommandeController:editState')->setName('p_edit_state');