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
 * @apiSuccess {Object[]} categories Liste des catégories
 * @apiSuccess {Number} categories.id Id de la catégories
 * @apiSuccess {String} categories.nom Nom de la catégories
 * @apiSuccess {String} categories.description Description de la catégories
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{
 * 		"id": 1,
 * 		"nom": "bio",
 * 		"description": "sandwichs ingrédients bio et locaux"
 * 	}]
 */
$app->get('/categories[/]', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);
	return $c->getCategorie($req, $resp, $args);
}
);

/**
 * @api {get} /categories/:id Trouver une catégorie
 * @apiGroup Categorie
 * @apiParam {id} id L'id de la catégorie
 * @apiSuccess {Object[]} categories Liste des catégories
 * @apiSuccess {Number} categories.id Id de la catégories
 * @apiSuccess {String} categories.nom Nom de la catégories
 * @apiSuccess {String} categories.description Description de la catégories
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{
 * 		"id": 1,
 * 		"nom": "bio",
 * 		"description": "sandwichs ingrédients bio et locaux"
 * 	}]
 */
$app->get('/categories/{id}', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getDescCategorie($req, $resp, $args);
	}
)->setName('catid');


/**
 * @api {get} /sandwich/:id Trouver un sandwich
 * @apiGroup Sandwich
 * @apiParam {id} id L'id du sandwich
 * @apiSuccess {Object[]} sandwich Sandwich
 * @apiSuccess {Number} sandwich.id Id du sandwich
 * @apiSuccess {String} sandwich.nom Nom du sandwich
 * @apiSuccess {String} sandwich.description Description du sandwich
 * @apiSuccess {String} sandwich.type_pain type de pain du sandwich
 * @apiSuccess {String} sandwich.img Lien de l'img du sandwich
 * @apiSuccess {Object[]} categories Categories
 * @apiSuccess {Number} categories.id Id de la categorie
 * @apiSuccess {String} categories.nom Nom de la categorie
 * @apiSuccess {Number} categories.pivot.sand_id Id du sandwich
 * @apiSuccess {Number} categories.pivot.cat_id Id de la categorie
 * @apiSuccess {Object[]} tailles Tailles
 * @apiSuccess {Number} tailles.id Id de la taille
 * @apiSuccess {String} tailles.nom Nom de la taille
 * @apiSuccess {Number} tailles.prix prix de la taille du sandwich
 * @apiSuccess {Object[]} links Lien
 * @apiSuccess {String} links.categories.href Lien
 * @apiSuccess {String} links.tailles.href Lien
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{"sandwich": {
 * 		"id": 4,
 * 		"nom": "le bucheron",
 * 		"description": "un sandwich de bucheron : frites, fromage, saucisse, steack, lard grillé, mayo",
 * 		"type_pain": "baguette campagne",
 * 		"img": "www.google.fr"
 * 	},
 * 	"categories":{
 * 		"id": 3,
 * 		"nom": "traditionnel",
 * 		"pivot":{
 * 			"sand_id": 4,
 * 			"cat_id": 3
 * 		}
 * 	},
 * 	"tailles":{
 * 		"id": 1,
 * 		"nom": "petite faim",
 * 		"prix": "6.00"
 * 	},
 * 	"links":{
 * 		"categories": {
 * 			"href": "/sandwichs/4/categories"
 * 		},
 * 		"tailles": {
 * 			"href": "/sandwichs/4/tailles"
 * 		}
 * 	}}]
 */
$app->get('/sandwichs/{id}', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getDescSandwich($req, $resp, $args);
	}
)->setName('sandid');



/**
 * @api {get} /sandwich Liste des sandwichs
 * @apiGroup Sandwich
 * @apiParam {id} id L'id du sandwich
 * @apiSuccess {Object[]} sandwichs Liste des sandwichs
 * @apiSuccess {Number} sandwichs.id Id du sandwich
 * @apiSuccess {String} sandwichs.nom Nom du sandwich
 * @apiSuccess {String} sandwichs.description Description du sandwich
 * @apiSuccess {String} sandwichs.type_pain type de pain du sandwich
 * @apiSuccess {String} sandwichs.img Lien de l'img du sandwich
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{
 * 		"id": 4,
 * 		"nom": "le bucheron",
 * 		"description": "un sandwich de bucheron : frites, fromage, saucisse, steack, lard grillé, mayo",
 * 		"type_pain": "baguette campagne",
 * 		"img": "www.google.fr"
 * 	}]
 */
$app->get('/sandwichs[/]', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getSandwich($req, $resp, $args);
	}
);



/**
 * @api {post} /categories Ajout d'une catégorie
 * @apiGroup Categorie
 * @apiParam {String} nom Nom de la categorie
 * @apiParam {String} description Description de la categorie
 * @apiParamExample {json} Input
 * 	{
 * 		"nom": "nom de la categorie",
 * 		"description": "description de la categorie"
 * 	}
 * @apiSuccess {Object[]} categories Liste des catégories
 * @apiSuccess {Number} categories.id Id de la catégories
 * @apiSuccess {String} categories.nom Nom de la catégories
 * @apiSuccess {String} categories.description Description de la catégories
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 201 OK
 * 	[{
 * 		"id": 17,
 * 		"nom": "nom de la categorie",
 * 		"description": "description de la categorie"
 * 	}]
 */
$app->post('/categories[/]', function (Request $req, Response $resp, $args) {
	$c = new lbs\api\control\CatalogueController($this);

	return $c->createCategorie($req, $resp, $args);
	}
);

/**
 * @api {put} /categories/:id Modification d'une catégorie
 * @apiGroup Categorie
 * @apiParam {String} nom Nom de la categorie
 * @apiParam {String} description Description de la categorie
 * @apiParamExample {json} Input
 * 	{
 * 		"nom": "nom de la categorie",
 * 		"description": "description de la categorie"
 * 	}
 * @apiSuccess {Object[]} categories Liste des catégories
 * @apiSuccess {Number} categories.id Id de la catégories
 * @apiSuccess {String} categories.nom Nom de la catégories
 * @apiSuccess {String} categories.description Description de la catégories
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{
 * 		"id": 1,
 * 		"nom": "bio",
 * 		"description": "sandwichs ingrédients bio et locaux"
 * 	}]
 */
$app->put('/categories/{id}', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->updateCategorie($req, $resp, $args);
	}
);

/**
 * @api {get} /categories/:id/sandwichs Liste des sandwichs apartenant à la catégorie
 * @apiGroup Sandwich
 * @apiParam {id} id L'id de la catégorie
 * @apiSuccess {Object[]} sandwichs Liste des sandwichs appartenant à la catégorie
 * @apiSuccess {Number} sandwichs.sandwich.id Id du sandwich
 * @apiSuccess {String} sandwichs.sandwich.nom Nom du sandwich
 * @apiSuccess {String} sandwichs.sandwich.type_pain type de pain du sandwich
 * @apiSuccess {String} sandwichs.links.href Lien du sandwich
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{"sandwich":{
 * 		"id": 4,
 * 		"nom": "le bucheron",
 * 		"type_pain": "baguette campagne"
 * 	},
 * 	"links":{
 * 		"href": "sandwichs/4"
 * 	}}]
 */
$app->get('/categories/{id}/sandwichs', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getSandwichFromCategorie($req, $resp, $args);
	}
)->setName('sandFromCat');


/**
 * @api {get} /sandwichs/:id/categories Liste des catégories à laquelle le sandwich appartient
 * @apiGroup Categorie
 * @apiParam {id} id L'id du sandwich
 * @apiSuccess {Object[]} categories Liste des catégories à laquelle le sandwich appartient
 * @apiSuccess {Number} categories.categorie.id Id de la categorie
 * @apiSuccess {String} categories.categorie.nom Nom de la catégorie
 * @apiSuccess {String} categories.categorie.description Description
 * @apiSuccess {Number} categories.pivots.categorie.sand_id Id du sandwich
 * @apiSuccess {Number} categories.pivots.categorie.cat_id Id de la catégorie
 * @apiSuccess {String} categories.links.href Lien
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{
 * 		"categorie":{
 * 			"id": 4,
 * 			"nom": "traditionnel",
 * 			"description": "sandwichs traditionnels : jambon, pâté, poulet etc ..",
 * 			"pivot":{
 * 				"sand_id": 4,
 * 				"cat_id": 3
 * 			}
 * 		},
 * 		"links": {
 * 			"href": "/categories/3"
 * 		}
 * 	}]
 */
$app->get('/sandwichs/{id}/categories', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->getCategorieFromSandwich($req, $resp, $args);
	}
)->setName('catFromSand');


/**
 * @api {get} /sandwichs/:id/tailles Liste des tailles à laquelle le sandwich appartient
 * @apiGroup Taille
 * @apiParam {id} id L'id du sandwich
 * @apiSuccess {Object[]} tailles Liste des tailles à laquelle le sandwich appartient
 * @apiSuccess {Number} tailles.taille.id Id de la taille
 * @apiSuccess {String} tailles.taille.nom Nom de la taille
 * @apiSuccess {String} tailles.taille.prix Prix
 * @apiSuccess {Number} tailles.taille.pivots.categorie.sand_id Id du sandwich
 * @apiSuccess {Number} tailles.taille.pivots.categorie.cat_id Id de la catégorie
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{
 * 		"taille":{
 * 			"id": 1,
 * 			"nom": "petite faim",
 * 			"prix": "6.00",
 * 			"pivot":{
 * 				"sand_id": 4,
 * 				"cat_id": 1
 * 			}
 * 		}
 * 	}]
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
 * @apiParam {String} nom_client Nom du client
 * @apiParam {String} mail_client Mail du client
 * @apiParam {Object[]} livraison Livraison
 * @apiParam {Datetime} livraison.date Date de livraison
 * @apiParam {Datetime} livraison.heure Heure de la livraison
 * @apiParamExample {json} Input
 * 	{
 * 		"nom_client": "Jean Dupont",
 * 		"mail_client": "jean.dupond@gmail.com",
 * 		"livraison":{
 * 			"date": "25-12-2018",
 * 			"heure": "14:00"
 * 		}
 * 	}
 * @apiSuccess {Object[]} commande Liste des catégories
 * @apiSuccess {Number} commande.nom_client Nom du client
 * @apiSuccess {String} commande.mail_client Mail du client
 * @apiSuccess {Object[]} commande.livraison Livraison
 * @apiSuccess {Datetime} commande.livraison.date Date de livraison
 * @apiSuccess {Datetime} commande.livraison.heure Heure de la livraison
 * @apiSuccess {Number} id Id de la livraison
 * @apiSuccess {String} token Token d'authentification de la livraison
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 201 OK
 * 	[{
 * 		"commande": {
 *   		"nom_client": "Jean Dupont",
 *   		"mail_client": "jean.dupond@gmail.com",
 *   		"livraison": {
 *     			"date": "25-12-2018",
 *     			"heure": "14:00"
 *   		}
 * 		},
 * 		"id": "8c883224-091f-11e8-ac97-ffd5582c965b",
 * 		"token": "790b34ab7b68eb358b46ac0800df53da590e602f7f2341192ec40307226867af"
 *	}]
 */
$app->post('/commandes[/]', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->createCommande($req, $resp, $args);
	}
)->add(new Validation( $validatorsCommandes));



/**
 * @api {post} /commandes/:id/paiement Paiement d'une commande
 * @apiGroup Commande
 * @apiParam {String} carte_bc Numéro de carte banquaire du client
 * @apiParam {Datetime} date_expiration_bc Date d'expiration de la carte banquaire du client
 * @apiParamExample {json} Input
 * 	{
 * 		"carte_bc": "1111 2222 3333 4444",
 * 		"date_expiration_bc": "12/18"
 * 	}
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{
 *   	"type": "message",
 *   	"error": "200",
 *   	"message": "Paiement accépté"
 *  }]
 */
$app->post('/commandes/{id}/paiement', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->payerCommande($req, $resp, $args);
	}
)->add('checkToken');


/**
 * @api {get} /commandes/:id?token=:token Affichage de la commande
 * @apiGroup Commande
 * @apiParam {id} id Id de la commande
 * @apiParam {token} token token de  la commande
 * @apiSuccess {Object[]} commande Details de la commande
 * @apiSuccess {Number} commande.id Id de la commande
 * @apiSuccess {String} commande.nom Nom du client
 * @apiSuccess {String} commande.mail Mail du client
 * @apiSuccess {Datetime} commande.date Date de livraison voulu
 * @apiSuccess {Datetime} commande.heure Heure de livraison voulu
 * @apiSuccess {Number} commande.etat Etat de la commande
 * @apiSuccess {String} commande.token token de la commande
 * @apiSuccess {Number} commande.carte id de carte du client
 * @apiSuccess {Datetime} commande.created_at Date de création de la commande
 * @apiSuccess {Datetime} commande.updated_at Date de création ou de mise à jour de la commande
 * @apiSuccessExample {json} Success
 * 	HTTP/1.1 200 OK
 * 	[{
 * 		"commande": {
 *   		"id": "cdab64c8-0925-11e8-8a06-1ba8be3d6fc9",
 *   		"nom": "Jean Dupont",
 *   		"mail": "jean.dupond@gmail.com",
 *   		"date": "25-12-2018",
 *   		"heure": "14:00",
 *   		"etat": 1,
 *   		"token": "1015257d7d2bfc9f50086d93ea5ddc722baf4ebdfa082377e3a8f8fae9236734",
 *   		"carte": null,
 *   		"created_at": "2018-02-03 21:04:20",
 *   		"updated_at": "2018-02-03 21:04:20"
 *		}
 *	}]
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
 * @apiParam {String} id_commande Id de la commande
 * @apiParam {Object[]} sandwich Sandwich
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
 * 	HTTP/1.1 200 OK
 * 	[{
 *   	"id_commande": "cdab64c8-0925-11e8-8a06-1ba8be3d6fc9",
 * 		"sandwich": {
 * 			"id_sandwich": 4,
 * 			"id_taille": 1,
 * 			"quantite": 1
 * 		}
 *  }]
 */
$app->post('/commandes/{id}/sandwichs', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\CatalogueController($this);

	return $c->createItem($req, $resp, $args);
	}
)->add(new Validation( $validatorsCommandes))->add('checkToken');



/**************************/
/*     Carte fidelite     */
/**************************/





$app->get('/cartes/{id}/auth', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\AuthController($this);

	return $c->authenticate($req, $resp, $args);
	}
);




$app->get('/cartes/{id}', function (Request $req, Response $resp, $args) {

	$c = new lbs\api\control\AuthController($this);

	return $c->getCarte($req, $resp, $args);
	}
);


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


$app->post('/cartes[/]', function (Request $req, Response $resp, $args) {
    $c = new lbs\api\control\AuthController($this);
    return $c->createCard($req, $resp, $args);
    }
)->add(new Validation( $validatorsCreateCart));


$app->run();
 