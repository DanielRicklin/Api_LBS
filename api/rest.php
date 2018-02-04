<?php


require_once __DIR__.'/../src/vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

//Slim application instance
$conf = ['settings' => ['displayErrorDetails' => true]];
$app = new \Slim\App($conf);

//Eloquent ORM settings
require_once __DIR__.'/../src/config/db.php';

//Dependency Injection
require_once __DIR__.'/../src/config/api/dependencies.php';

//Routes definitions
require_once __DIR__.'/../src/config/api/routes.php';

use Illuminate\Database\Eloquent\ModelNotFoundException;
use \Respect\Validation\Validator as v;
use \DavidePastore\Slim\Validation\Validation as Validation;

$error = require_once __DIR__.'/../src/conf/error.php';




function checkToken ( Request $rq, Response $rs, callable $next ) 
{
	// récupérer l'identifiant de cmmde dans la route et le token
	$id = $rq->getAttribute('route')->getArgument( 'id');
	$token = $rq->getQueryParam('token', null);

	// vérifier que le token correspond à la commande
	try 
	{
		\lbs\common\models\Commande::where('id', '=', $id)->where('token', '=',$token)->firstOrFail();

	} catch (ModelNotFoundException $e) {

		$rs= $rs->withHeader( 'Content-type', "application/json;charset=utf-8");

		$rs= $rs->withStatus(404);

		$temp = array("type" => "error", "error" => '404', "message" => "Le token n'est pas valide");
			
		$rs->getBody()->write(json_encode($temp));
		return $rs;

	};

	return $next($rq, $rs);
};

/**
 * @api {get} /categories Liste des catégories
 * @apiGroup Categorie
 * @apiVersion 1.0.0
 * @apiSuccess {String} type type de réponse
 * @apiSuccess {Object} meta méta-données de la réponse
 * @apiSuccess {Number} meta.count Count
 * @apiSuccess {String} meta.locale Langue de la réponse
 * @apiSuccess {Object} categorie La catégorie
 * @apiSuccess {Number} categorie.id Id de la catégorie
 * @apiSuccess {String} categorie.nom Nom de la catégorie
 * @apiSuccess {String} categorie.description Description de la catégorie
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"type": "collection",
 * 		"meta": {
 * 			"count": 6,
 * 			"locale": "fr-FR"
 * 		},
 * 		"categorie": {
 * 			"id": 1,
 * 			"nom": "bio",
 * 			"description": "sandwichs ingrédients bio et locaux"
 * 		}
 * 	]
 */
$app->get('/categories[/]', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);
	return $c->getCategorie($req, $resp, $args);
}
);

/**
 * @api {get} /categories/:id Trouver une catégorie
 * @apiGroup Categorie
 * @apiVersion 1.0.0
 * @apiParam {id} id L'id de la catégorie
 * @apiSuccess {String} type type de réponse
 * @apiSuccess {Object} meta méta-donnée de la réponse
 * @apiSuccess {String} meta.locale Langue de la réponse
 * @apiSuccess {Object} categories Liste des catégories
 * @apiSuccess {Number} categories.id Id de la catégories
 * @apiSuccess {String} categories.nom Nom de la catégories
 * @apiSuccess {String} categories.description Description de la catégories
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"type": "collection",
 * 		"meta": {
 * 			"locale": "fr-FR"
 * 		},
 * 		"categorie": {
 * 			"id": 1,
 * 			"nom": "bio",
 * 			"description": "sandwichs ingrédients bio et locaux"
 * 		}
 * 	}
 * @apiError (Erreur : 404) CategorieNotFound Categorie inexistante
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 404 Not Found
 *
 *     {
 *       "type" : "error',
 *       "error" : 404,
 *       "message" : ressource non disponible : /categories/86/"
 *     }
 */
$app->get('/categories/{id}', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getDescCategorie($req, $resp, $args);
	}
)->setName('catid');


/**
 * @api {get} /sandwich/:id Trouver un sandwich
 * @apiGroup Sandwich
 * @apiVersion 1.0.0
 * @apiParam {id} id L'id du sandwich
 * @apiSuccess {String} type type de réponse
 * @apiSuccess {Object} meta méta-donnée de la réponse
 * @apiSuccess {String} meta.locale Langue de la réponse
 * @apiSuccess {Object} sandwich Sandwich
 * @apiSuccess {Number} sandwich.id Id du sandwich
 * @apiSuccess {String} sandwich.nom Nom du sandwich
 * @apiSuccess {String} sandwich.description Description du sandwich
 * @apiSuccess {String} sandwich.type_pain type de pain du sandwich
 * @apiSuccess {String} sandwich.img Lien de l'img du sandwich
 * @apiSuccess {Object} categories Categories
 * @apiSuccess {Number} categories.id Id de la categorie
 * @apiSuccess {String} categories.nom Nom de la categorie
 * @apiSuccess {Object} categories.pivot
 * @apiSuccess {Number} categories.pivot.sand_id Id du sandwich
 * @apiSuccess {Number} categories.pivot.cat_id Id de la categorie
 * @apiSuccess {Object} tailles Tailles
 * @apiSuccess {Number} tailles.id Id de la taille
 * @apiSuccess {String} tailles.nom Nom de la taille
 * @apiSuccess {Number} tailles.prix prix de la taille du sandwich
 * @apiSuccess {Object} links Lien
 * @apiSuccess {Object} links.categories Lien de la liaison
 * @apiSuccess {String} links.categories.href Lien
 * @apiSuccess {Object} links.tailles Lien de la liaison
 * @apiSuccess {String} links.tailles.href Lien
 * @apiSuccessExample {json} Success
 *	HTTP/1.1 200 OK
 *	{
 *		"type": "collection",
 *		"meta": {
 *			"locale": "fr-FR"
 *		},
 *		"sandwich": {
 * 			"id": 4,
 *			"nom": "le bucheron",
 *			"description": "un sandwich de bucheron : frites, fromage, saucisse, steack, lard grillé, mayo",
 *			"type_pain": "baguette campagne",
 *			"img": "www.google.fr"
 *		},
 *		"categories":{
 *			"id": 3,
 *			"nom": "traditionnel",
 *			"pivot":{
 *				"sand_id": 4,
 *				"cat_id": 3
 *			}
 *		},
 *		"tailles":{
 *			"id": 1,
 *			"nom": "petite faim",
 *			"prix": "6.00"
 *		},
 *		"links":{
 *			"categories": {
 *				"href": "/sandwichs/4/categories"
 *			},
 *			"tailles": {
 *				"href": "/sandwichs/4/tailles"
 *			}
 *		}
 *	}
 * 
 * @apiError (Erreur : 404) SandwichNotFound Sandwich inexistante
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *	HTTP/1.1 404 Not Found
 *
 *	{
 *		"type" : "error",
 *		"error" : 404,
 *		"message" : "ressource non disponible : /sandwichs/1/"
 *	}
 */
$app->get('/sandwichs/{id}', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getDescSandwich($req, $resp, $args);
	}
)->setName('sandid');



/**
 * @api {get} /sandwich Liste des sandwichs
 * @apiGroup Sandwich
 * @apiVersion 1.0.0
 * @apiParam {id} id L'id du sandwich
 * 
 * @apiSuccess {String} type type de réponse
 * @apiSuccess {Object} meta méta-données de la réponse
 * @apiSuccess {Number} meta.count Count
 * @apiSuccess {Number} meta.size Size
 * @apiSuccess {Number} meta.date Date du jour 
 * @apiSuccess {Object} sandwichs Liste des sandwichs
 * @apiSuccess {Number} sandwichs.id Id du sandwich
 * @apiSuccess {String} sandwichs.nom Nom du sandwich
 * @apiSuccess {String} sandwichs.type_pain type de pain du sandwich
 * @apiSuccess {Object} sandwichs.links Lien
 * @apiSuccess {String} sandwichs.links.href Lien vers son détail
 * @apiSuccessExample {json} Success
 *	HTTP/1.1 200 OK
 *	{
 *		"type" : "collection",
 *		"meta" : {
 *			"count" : 111,
 *			"size" : 10,
 *			"date" : "04-02-2018"
 *		},
 *		"sandwichs" : {
 *			"id"  : 4 ,
 *			"nom" : "le bucheron",
 *			"type_pain" : "baguette campagne",
 *			"links" : {
 *				"href" : "/sandwichs/4"
 *			}
 *		}
 *	}
 */
$app->get('/sandwichs[/]', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getSandwich($req, $resp, $args);
	}
);



/**
 * @api {post} /categories Ajout d'une catégorie
 * @apiGroup Categorie
 * @apiVersion 1.0.0
 * @apiHeader {String} Content-Type application/json;charset=utf-8
 * @apiParam {String} nom Nom de la categorie
 * @apiParam {String} description Description de la categorie
 * @apiParamExample {json} Input
 * 	POST /categories/ HTTP/1.1
 *	Host: api.lbs.local:10080 
 *	Content-Type:application/json;charset=utf-8
 * 	
 * 	{
 * 		"nom": "nom de la categorie",
 * 		"description": "description de la categorie"
 * 	}
 * @apiSuccess (Success 201) {Object} categories Liste des catégories
 * @apiSuccess (Success 201) {Number} categories.id Id de la catégories
 * @apiSuccess (Success 201) {String} categories.nom Nom de la catégories
 * @apiSuccess (Success 201) {String} categories.description Description de la catégories
 * @apiSuccessExample {json} Success
 *	HTTP/1.1 201 OK
 *	Location: /categories/18
 *	Content-Type: application/json;charset=utf-8
 * 	
 *	{
 *		"id": 18,
 *		"nom": "nom de la categorie",
 *		"description": "description de la categorie"
 *	}
 * @apiError (Réponse : 400) MissingParameter paramètre manquant dans la requête
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *	HTTP/1.1 400 Bad Request
 *	{
 *		"type": "error",
 *		"error" : 400,
 *		"message" : "donnée manquante"
 *	}
 */
$app->post('/categories[/]', function (Request $req, Response $resp, $args) {
	$c = new lbs\api\control\CatalogueController($this);

	return $c->createCategorie($req, $resp, $args);
	}
);

/**
 * @api {put} /categories/:id Modification d'une catégorie
 * @apiGroup Categorie
 * @apiVersion 1.0.0
 * @apiHeader {String} Content-Type application/json;charset=utf-8
 * @apiParam {Number} id id de la categorie
 * @apiParam (paramètres de la requête) {String} nom Nom de la categorie
 * @apiParam (paramètres de la requête) {String} description Description de la categorie
 * @apiParamExample {json} Input
 *	PUT /categories/1 HTTP/1.1
 *	Host: api.lbs.local:10080
 *	Content-Type: application/json;charset=utf8
 * 	{
 * 		"nom": "nom",
 * 		"description": "description"
 * 	}
 * @apiSuccess {Object} categories Liste des catégories
 * @apiSuccess {Number} categories.id Id de la catégories
 * @apiSuccess {String} categories.nom Nom de la catégories
 * @apiSuccess {String} categories.description Description de la catégories
 * @apiSuccessExample {json} Success
 *	HTTP/1.1 200 OK
 *	Content-Type: application/json;charset=utf8
 * 	{
 * 		"id": 1,
 * 		"nom": "nom",
 * 		"description": "description"
 * 	}
 */
$app->put('/categories/{id}', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->updateCategorie($req, $resp, $args);
	}
);

/**
 * @api {get} /categories/:id/sandwichs Liste des sandwichs apartenant à la catégorie
 * @apiGroup Sandwich
 * @apiVersion 1.0.0
 * @apiParam {Number} id L'id de la catégorie
 * @apiSuccess {String} type type de réponse
 * @apiSuccess {Object} meta méta-données de la réponse
 * @apiSuccess {Number} meta.count Count
 * @apiSuccess {Number} meta.date Date du jour 
 * @apiSuccess {Object} sandwichs Liste des sandwichs appartenant à la catégorie
 * @apiSuccess {Number} sandwichs.sandwich.id Id du sandwich
 * @apiSuccess {String} sandwichs.sandwich.nom Nom du sandwich
 * @apiSuccess {String} sandwichs.sandwich.type_pain type de pain du sandwich
 * @apiSuccess {String} sandwichs.links.href Lien du sandwich
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"type" : "collection",
 *		"meta" : {
 * 			"count" : 1,
 * 			"date" : "04-02-2018"
 * 		},
 * 		"sandwichs": {
 * 			"sandwich":{
 * 				"id": 4,
 * 				"nom": "le bucheron",
 * 				"type_pain": "baguette campagne"
 * 			},
 * 			"links":{
 * 				"href": "sandwichs/4"
 * 			}
 * 		}
 * 		
 *	}
* @apiError (Erreur : 404) SandwichNotFoundFromCategorie SandwichFromCategorie inexistante
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 404 Not Found
 *
 *     {
 *       "type" : "error",
 *       "error" : 404,
 *       "message" : "ressource non disponible : categories/:id/sandwich"
 *     }
 */
$app->get('/categories/{id}/sandwichs', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getSandwichFromCategorie($req, $resp, $args);
	}
)->setName('sandFromCat');


/**
 * @api {get} /sandwichs/:id/categories Liste des catégories à laquelle le sandwich appartient
 * @apiGroup Categorie
 * @apiVersion 1.0.0
 * @apiParam {Number} id L'id du sandwich
 * @apiSuccess {String} type type de réponse
 * @apiSuccess {Object} meta méta-données de la réponse
 * @apiSuccess {Number} meta.count Count
 * @apiSuccess {Number} meta.date Date du jour 
 * @apiSuccess {Object} categories Liste des catégories à laquelle le sandwich appartient
 * @apiSuccess {Number} categories.categorie.id Id de la categorie
 * @apiSuccess {String} categories.categorie.nom Nom de la catégorie
 * @apiSuccess {String} categories.categorie.description Description
 * @apiSuccess {Number} categories.pivots.categorie.sand_id Id du sandwich
 * @apiSuccess {Number} categories.pivots.categorie.cat_id Id de la catégorie
 * @apiSuccess {String} categories.links.href Lien
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"type" : "collection",
 *		"meta" : {
 * 			"count" : 2,
 * 			"date" : "04-02-2018"
 * 		},
 * 		"categories":{
 * 			"categorie":{
 * 				"id": 4,
 * 				"nom": "traditionnel",
 * 				"description": "sandwichs traditionnels : jambon, pâté, poulet etc ..",
 * 				"pivot":{
 * 					"sand_id": 4,
 * 					"cat_id": 3
 * 				}
 * 			},
 * 			"links": {
 * 				"href": "/categories/3"
 * 			}
 * 		}
 * 	}
 * @apiError (Erreur : 404) CategorieNotFoundInSandwich CategorieFromSandwich inexistante
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 404 Not Found
 *
 *     {
 *       "type" : "error",
 *       "error" : 404,
 *       "message" : "ressource non disponible : /sandwichs/:id/categories"
 *     }
 */
$app->get('/sandwichs/{id}/categories', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getCategorieFromSandwich($req, $resp, $args);
	}
)->setName('catFromSand');


/**
 * @api {get} /sandwichs/:id/tailles Liste des tailles à laquelle le sandwich appartient
 * @apiGroup Taille
 * @apiVersion 1.0.0
 * @apiParam {Number} id L'id du sandwich
 * @apiSuccess {String} type type de réponse
 * @apiSuccess {Object} meta méta-données de la réponse
 * @apiSuccess {Number} meta.count Count
 * @apiSuccess {Number} meta.date Date du jour 
 * @apiSuccess {Object} tailles Liste des tailles à laquelle le sandwich appartient
 * @apiSuccess {Number} tailles.taille.id Id de la taille
 * @apiSuccess {String} tailles.taille.nom Nom de la taille
 * @apiSuccess {String} tailles.taille.prix Prix
 * @apiSuccess {Number} tailles.taille.pivots.categorie.sand_id Id du sandwich
 * @apiSuccess {Number} tailles.taille.pivots.categorie.cat_id Id de la catégorie
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"type" : "collection",
 *		"meta" : {
 * 			"count" : 2,
 * 			"date" : "04-02-2018"
 * 		},
 * 		"tailles":{
 * 			"taille":{
 * 				"id": 1,
 * 				"nom": "petite faim",
 *				"prix": "6.00",
 * 				"pivot":{
 * 					"sand_id": 4,
 * 					"cat_id": 1
 * 				}
 * 			}
 * 		}
 *	}
* @apiError (Erreur : 404) TailleNotFoundInSandwich TailleFromSandwich inexistante
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 404 Not Found
 *
 *     {
 *       "type" : "error",
 *       "error" : 404,
 *       "message" : "ressource non disponible : /sandwichs/:id/tailles"
 *     }
 */
$app->get('/sandwichs/{id}/tailles', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getTailleFromSandwich($req, $resp, $args);
	}
)->setName('tailleFromSand');



/*     Validator     */
$validatorsCommandes = [
'nom_client'    => v::StringType()->alpha()->length(3,30)->notEmpty(),
'mail_client'     => v::email()->notEmpty(),
'livraison'   => [ 'date' => v::date('d-m-Y')->min( 'now' )->notEmpty(),
					'heure' =>v::date('h:i')->notEmpty(),
] ];


/**
 * @api {post} /commandes Ajout d'une catégorie
 * @apiGroup Commande
 * @apiVersion 1.0.0
 * @apiHeader {String} Content-Type application/json;charset=utf-8
 * @apiParam {String} nom_client Nom du client
 * @apiParam {String} mail_client Mail du client
 * @apiParam {Object} livraison Livraison
 * @apiParam {String} livraison.date Date de livraison
 * @apiParam {String} livraison.heure Heure de la livraison
 * @apiParamExample {json} Input
 * 	{
 * 		"nom_client": "Jean Dupont",
 * 		"mail_client": "jean.dupond@gmail.com",
 * 		"livraison":{
 * 			"date": "25-12-2018",
 * 			"heure": "14:00"
 * 		}
 * 	}
 * @apiSuccess {Object} commande Liste des catégories
 * @apiSuccess {Number} commande.nom_client Nom du client
 * @apiSuccess {String} commande.mail_client Mail du client
 * @apiSuccess {Object} commande.livraison Livraison
 * @apiSuccess {String} commande.livraison.date Date de livraison
 * @apiSuccess {String} commande.livraison.heure Heure de la livraison
 * @apiSuccess {Number} id Id de la livraison
 * @apiSuccess {String} token Token d'authentification de la livraison
 * @apiSuccessExample {json} Success
 *	HTTP/1.1 201 OK
 *	{
 *		"commande": {
 *			"nom_client": "Jean Dupont",
 *			"mail_client": "jean.dupond@gmail.com",
 *			"livraison": {
 *				"date": "25-12-2018",
 *				"heure": "14:00"
 *			}
 *		},
 *		"id": "8c883224-091f-11e8-ac97-ffd5582c965b",
 *		"token": "790b34ab7b68eb358b46ac0800df53da590e602f7f2341192ec40307226867af"
 *	}
 * @apiError (Réponse : 400) MissingParameter paramètre manquant dans la requête
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "error",
 *       "error" : 400,
 *       "message" : "donnée manquante"
 *     }
 */
$app->post('/commandes[/]', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->createCommande($req, $resp, $args);
	}
)->add(new Validation( $validatorsCommandes));



/**
 * @api {post} /commandes/:id/paiement Paiement d'une commande
 * @apiGroup Commande
 * @apiVersion 1.0.0
 * @apiHeader {String} Content-Type application/json;charset=utf-8
 * @apiParam {Number} id L'id du sandwich
 * @apiParam (paramètres de la requête) {String} carte_bc Numéro de carte banquaire du client
 * @apiParam (paramètres de la requête) {String} date_expiration_bc Date d'expiration de la carte banquaire du client
 * @apiParamExample {json} Input
 * 	{
 * 		"carte_bc": "1111222233334444",
 * 		"date_expiration_bc": "12/18"
 * 	}
 * @apiSuccessExample {json} Success
 *	HTTP/1.1 200 OK
 *	POST /commandes/ HTTP/1.1
 *	Host: api.lbs.local:10080
 *	Content-Type: application/json;charset=utf8
 *	Location: /commandes/e3786989-e0d2-4cfb-a72f-455ca4a16beb/paiement
 * 	
 *	{
 *		"type": "message",
 *		"error": "200",
 *		"message": "Paiement accépté"
 *	}
 * 
 * @apiError (Réponse : 400) MissingParameter paramètre manquant dans la requête
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "error",
 *       "error" : 400,
 *       "message" : "donnée manquante"
 *     }
 */
$app->post('/commandes/{id}/paiement', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->payerCommande($req, $resp, $args);
	}
)->add('checkToken');


/**
 * @api {get} /commandes/:id?token=:token Affichage de la commande
 * @apiGroup Commande
 * @apiVersion 1.0.0
 * @apiParam {Number} id Id de la commande
 * @apiParam {String} token token de  la commande
 * @apiSuccess {String} type type de réponse
 * @apiSuccess {Object} meta méta-données de la réponse
 * @apiSuccess {String} meta.locale Langue
 * @apiSuccess {Object} commande Details de la commande
 * @apiSuccess {Number} commande.id Id de la commande
 * @apiSuccess {String} commande.nom Nom du client
 * @apiSuccess {String} commande.mail Mail du client
 * @apiSuccess {String} commande.date Date de livraison voulu
 * @apiSuccess {String} commande.heure Heure de livraison voulu
 * @apiSuccess {Number} commande.etat Etat de la commande
 * @apiSuccess {String} commande.token token de la commande
 * @apiSuccess {Number} commande.carte id de carte du client
 * @apiSuccess {String} commande.created_at Date de création de la commande
 * @apiSuccess {String} commande.updated_at Date de création ou de mise à jour de la commande
 * @apiSuccessExample {json} Success
 *	HTTP/1.1 200 OK
 *	{
 *		"type" : "collection",
 *		"meta" : {
 *			"locale" : "fr-FR"
 *		},
 *		"commande": {
 *			"id": "cdab64c8-0925-11e8-8a06-1ba8be3d6fc9",
 *			"nom": "Jean Dupont",
 *			"mail": "jean.dupond@gmail.com",
 *			"date": "25-12-2018",
 *			"heure": "14:00",
 *			"etat": 1,
 *			"token": "1015257d7d2bfc9f50086d93ea5ddc722baf4ebdfa082377e3a8f8fae9236734",
 *			"carte": null,
 *			"created_at": "2018-02-03 21:04:20",
 *			"updated_at": "2018-02-03 21:04:20"
 *		}
 *	}
 * @apiError (Erreur : 404) CommandeNotFound Commande inexistante
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 404 Not Found
 *
 *     {
 *       "type" : "error",
 *       "error" : 404,
 *       "message" : "ressource non disponible : /commandes/:id"
 *     }
 */
$app->get('/commandes/{id}', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getDescCommande($req, $resp, $args);
	}
)->setName('comid');




/*     Validator     */
$validatorsComSand = [
'sandwich'   => [ 'id_sandwich' => v::digit()->notEmpty(),
					'id_taille' =>v::digit()->notEmpty(),
						'qte'    => v::digit()->notEmpty(),
] ];




/**
 * @api {post} /commandes/:id/sandwichs Ajout d'un sandwich à une commande
 * @apiGroup Commande
 * @apiVersion 1.0.0
 * @apiParam {String} id_commande Id de la commande
 * @apiParam {Object} sandwich Sandwich
 * @apiParam {Number} sandwich.id_sandwich Id du sandwich
 * @apiParam {Number} sandwich.id_taille Id de la taille du sandwich
 * @apiParam {Number} sandwich.qte Id du sandwich
 * @apiParamExample {json} Input
 * 	{
 * 		"id": "cdab64c8-0925-11e8-8a06-1ba8be3d6fc9",
 * 		"sandwich": {
 * 			"id_sandwich": 4,
 * 			"id_taille": 1,
 * 			"qte": 1
 * 		}
 * 	}
 * @apiSuccessExample {json} Success
 *	HTTP/1.1 200 OK
 *	POST /commandes/cdab64c8-0925-11e8-8a06-1ba8be3d6fc9/sandwichs HTTP1.1 
 *	HOST: api.lbs.local:10080 
 *	Content-Type: application/json;charset=utf-8 
 *	Location: /commandes/cdab64c8-0925-11e8-8a06-1ba8be3d6fc9/sandiwchs
 *	{
 *		"id_commande": "cdab64c8-0925-11e8-8a06-1ba8be3d6fc9",
 *		"sandwich": {
 *			"id_sandwich": 4,
 *			"id_taille": 1,
 *			"quantite": 1
 *		}
 *	}
 * @apiError (Réponse : 400) MissingParameter paramètre manquant dans la requête
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "error",
 *       "error" : 400,
 *       "message" : "donnée manquante"
 *     }
 */
$app->post('/commandes/{id}/sandwichs', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->createItem($req, $resp, $args);
	}
)->add(new Validation( $validatorsCommandes))->add('checkToken');



/**************************/
/*     Carte fidelite     */
/**************************/




/**
 * @api {get} /cartes/:id/auth  authentification
 * @apiGroup Cartes
 * @apiVersion 1.0.0
 * @apiParam {Number} id Identifiant unique de la catégorie
 * @apiSuccess {String} type type de la réponse, ici resource
 * @apisuccess {Object} auth la ressource auth retournée
 * @apiSuccess {Number} auth.id Identifiant de l'auth
 * @apiSuccess {String} auth.nom Nom de l'auth
 * @apiSuccess {String} auth.passwd Mot de passe de l'auth
 *
 * @apiSuccessExample {json} exemple de réponse en cas de succès
 *     HTTP/1.1 200 OK
 *
 *     {
 *        "type" : "collection,
 *        "id"  : "1",
 *        "nom" : "michel",
 *        "passwd" : "lebonmdp"
 *     }
 *
 * @apiError (Erreur : 404) MissingParameter paramètre manquant dans la requête
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 404 Not Found
 *
 *     {
 *       "type" : "error",
 *       "error" : 404,
 *       "message" : "ressource non disponible : /cartes/:id/auth"
 *     }
 */
$app->get('/cartes/{id}/auth', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\AuthController($this);

	return $c->authenticate($req, $resp, $args);
	}
);



/**
 * @api {get} /cartes/:id  accéder à une carte
 * @apiGroup Cartes
 * @apiVersion 1.0.0
 * @apiParam {Number} id Identifiant unique de la catégorie
 * @apiSuccess {String} type type de la réponse, ici resource
 * @apisuccess {Object} meta méta-données sur la réponse
 * @apisuccess {STring}  meta.locale langue de la réponse
 * @apisuccess {Object} carte la ressource carte retournée
 * @apiSuccess {Number} carte.id Identifiant de la carte
 * @apiSuccess {String} carte.date_creation Date de création de la carte
 * @apiSuccess {String} carte.date_valide Date de validité de la carte
 * @apiSuccess {Number} carte.cumul Cumul de la carte
 *
 * @apiSuccessExample {json} exemple de réponse en cas de succès
 *	HTTP/1.1 200 OK
 *	{
 *		"type" : "collection,
 *		"meta" : {
 *			"locale":"fr-FR"
 * 		},
 *		"carte" : {
 *			"id"  : "4",
 *			"date_creation" : "0000-00-00",
 *			"date_valide" : 0000-00-00",
 *			"cumul" : "14"
 *		}
 *	}
 *
 * @apiError (Erreur : 401) RefusedAccess accès refusé à la ressource
 * @apiError (Erreur : 404) MissingParameter paramètre manquant dans la requête
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 404 Not Found
 *
 *     {
 *       "type" : "error",
 *       "error" : 404,
 *       "message" : "ressource non disponible : /cartes/:id"
 *     }
 */
$app->get('/cartes/{id}', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\AuthController($this);

	return $c->getCarte($req, $resp, $args);
	}
);

/**
 * @api {post} /cartes/:id/paiement payer avec la carte
 * @apiGroup Cartes
 * @apiVersion 1.0.0
 * @apiParam {String} carte_bc Numéro de la carte bancaire
 * @apiParam {String} date_expiration_bc Date d'expiration de la carte bancaire
 *
 * @apiParamExample {request} exemple de paramètres
 *	{
 *		"carte_bc"  : "1111222233334444",
 *		"date_expiration_bc"  : "12/18"
 *	}
 *
 * @apiSuccess (Réponse : 200) {json} commande Paiement accépté
 *
 * @apiHeader {String} Location: uri de la ressource créée et l'id
 * @apiHeader {String} Content-Type: format de représentation de la ressource réponse
 *
 * @apiSuccessExample {response} exemple de réponse en cas de succès
 *	POST /cartes/{id}/paiement HTTP/1.1
 *	Host: api.lbs.local:10080
 *	Content-Type: application/json;charset=utf8
 *	Location: /cartes/r8786989-e0d2-4bfb-a72f-455ca4a16beb/paiement
 *
 *	{
 *		"carte_bc"  : "1111222233334444",
 *		"date_expiration_bc"  : "12/18"
 *	}
 *
 * @apiError (Réponse : 400) MissingParameter paramètre manquant dans la requête
 *
 * @apiErrorExample {json} exemple de réponse en cas d'erreur
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "type": "error",
 *       "error" : 400,
 *       "message" : "donnée manquante"
 *     }
 */
$app->post('/cartes/{id}/paiement', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\AuthController($this);

	return $c->payerCarte($req, $resp, $args);
	}
);



/* Validator */
$validatorsCreateCart = [
    'nom' => v::notEmpty(),
    'password' =>v::notEmpty(),
];

/**
 * @api {post} /cartes ajouter une carte
 * @apiGroup Cartes
 * @apiVersion 1.0.0
 * @apiParam {String} nom Nom de la personne
 * @apiParam {String} password Mot de passe
 *
 * @apiParamExample {request} exemple de paramètres
 *	{
 *		"nom"  : "michel",
 *		"password"  : "lebonmdp"
 *	}
 *
 * @apiSuccess (Réponse : 200) {json} commande Paiement accépté
 *
 * @apiHeader {String} Location: uri de la ressource créée et l'id
 * @apiHeader {String} Content-Type: format de représentation de la ressource réponse
 *
 * @apiSuccessExample {response} exemple de réponse en cas de succès
 *	POST /cartes/{id}/paiement HTTP/1.1
 *	Host: api.lbs.local:10080
 *	Content-Type: application/json;charset=utf8
 *	Location: /cartes/r8786989-e0d2-4bfb-a72f-455ca4a16beb/paiement
 *
 *	{
 *		"id": 3,
 *		"nom": "michel",
 *		"cumule": "0",
 *		"date de validité": "2019-02-04 18:59:48",
 *		"date de création": "2018-02-04 18:59:48"
 *	}
 */
$app->post('/cartes[/]', function (Request $req, Response $resp, $args) {
    $c = new lbs\api\control\AuthController($this);
    return $c->createCard($req, $resp, $args);
    }
)->add(new Validation( $validatorsCreateCart));


$app->run();
 