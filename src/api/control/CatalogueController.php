<?php

	namespace lbs\api\control;
	use Ramsey\Uuid\Uuid;

	class CatalogueController {

	private $container;

		public function  __construct(\Slim\Container $c)
		{
			$this->container = $c;
		}

		public function getCategorie($req, $resp, $args) {

			// ajoute ou remplace
			$rs= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

			$retour = \lbs\common\models\Categorie::get();

			$arr = array('type' => 'collection', 'meta' => [ 'count' => count($retour), 'locale' => 'fr-FR'], 'categorie' => $retour);
			$rs->getBody()->write(json_encode($arr));

			return $rs;
		}

		public function getSandwich($req, $resp, $args) {

			// ajoute ou remplace
			$rs= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

			$arr = \lbs\common\models\Sandwich::select('id', 'nom', 'type_pain');

			$page = 0;
			$size = 10;

			if(!empty($req->getQueryParams()))
			{	
				if(isset($req->getQueryParams()['t']))
					$arr->where('type_pain', '=', $req->getQueryParams()['t']);

				if(isset($req->getQueryParams()['img']))
					$arr->where('img', '!=', 'null');

				if(isset($req->getQueryParams()['size']) and $req->getQueryParams()['size']>0)
					$size = $req->getQueryParams()['size'];

				if(isset($req->getQueryParams()['page']) and $req->getQueryParams()['page']>0)
					if($req->getQueryParams()['page'] > ceil(count($arr->get())/$size))
						$page = ceil(count($arr->get())/$size);
					else
						$page = $req->getQueryParams()['page'];
			}

			$count = count($arr->get());
			$requete = $arr->offset(($page-1)*$size)->limit($size)->get();

			foreach ($requete as $key => $value) {

				$url = $this->container['router']->pathFor('sandid', [ 'id' => $value['id'] ]);

				$tab[] = array('sandwich' => $value, 'links' => ['href' => $url]);
			}

			$arr = array('type' => 'collection', 'meta' => [ 'count' => $count, 'size' => $size,'date' => date('d-m-Y')], 'sandwichs' => $tab);

			$rs->getBody()->write(json_encode($arr));

			return $rs;
		}

		public function getDescSandwich($req, $resp, $args) {

			// ajoute ou remplace
			$rs= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

			$arr = new \lbs\common\models\Sandwich();

			try {
				$arr = $arr->where('id', '=', $args['id'])->firstOrFail();

				$arrCateg = $arr->categories()->select('id', 'nom')->get();

				$arrTaille = $arr->tailles()->select('id', 'nom', 'prix')->get();

				foreach ($arrTaille as $key => $value) {
					unset($value['pivot']);
				}

				$urlCateg = $this->container['router']->pathFor('catFromSand', [ 'id' => $args['id'] ]);

				$urlTailles = $this->container['router']->pathFor('tailleFromSand', [ 'id' => $args['id'] ]);

				$temp = array('type' => 'collection', 'meta' => ['locale' => 'fr-FR'], 'sandwich' => $arr, 'categories' => $arrCateg, 'tailles' => $arrTaille, 'links' => ['categories' => ['href' => $urlCateg], 'tailles' => ['href' => $urlTailles]]);
			}
			catch(\Exception $e)
			{
				$url = $this->container['router']->pathFor('sandid', [ 'id' => $args['id'] ]);

				$temp = array("type" => "error", "error" => '404', "message" => "ressource non disponible : ".$url);
			}
			
			$rs->getBody()->write(json_encode($temp));

			return $rs;

		}

		public function getDescCategorie($req, $resp, $args) {

			// ajoute ou remplace
			$rs= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

			$arr = new \lbs\common\models\Categorie();

			try {
				$arr = $arr->where('id', '=', $args['id'])->firstOrFail();
				$temp = array('type' => 'collection', 'meta' => ['locale' => 'fr-FR'], 'categorie' => $arr);
			}
			catch(\Exception $e)
			{
				$url = $this->container['router']->pathFor('catid', [ 'id' => $args['id'] ]);

				$temp = array("type" => "error", "error" => '404', "message" => "ressource non disponible : ".$url);
			}
			
			$rs->getBody()->write(json_encode($temp));

			return $rs;

		}

		public function createCategorie($req, $resp, $args) {

			$parsedBody = $req->getParsedBody();

			if(isset($parsedBody['nom']) && isset($parsedBody['description']))
			{
				//return Write::json_error($rs, code:400, message:'Manque un truc');

				$categ = new \lbs\common\models\Categorie();
				$categ->nom = filter_var($parsedBody['nom'], FILTER_SANITIZE_STRING);
				$categ->description = filter_var($parsedBody['description'], FILTER_SANITIZE_STRING);

				try {
					$categ->save();
				} catch(\Exception $e) {
					$resp= $resp->withStatus(400);
					
					$temp = array("type" => "error", "error" => '400', "message" => "Création de la catégorie impossible");
						
					$resp->getBody()->write(json_encode($temp));
					
					return $resp;
				}

				$resp= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

				$resp= $resp->withStatus(201);

				$resp = $resp->withHeader('Location', $this->container['router']->pathFor('catid', ['id' => $categ->id] ) );

				$resp->getBody()->write(json_encode($categ->toArray()));
				return $resp;
			}
			else
			{
				$resp= $resp->withStatus(400);

				$temp = array("type" => "error", "error" => '400', "message" => "Donnée manquante");
				
				$resp->getBody()->write(json_encode($temp));

				return $resp;
			}
		}

		public function updateCategorie($req, $resp, $args) {

			$parsedBody = $req->getParsedBody();

			$resp= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

			if(isset($parsedBody['nom']) && isset($parsedBody['description']))
			{

				try {

					$categ = \lbs\common\models\Categorie::findOrFail((int)$args['id']);
					$categ->nom = filter_var($parsedBody['nom'], FILTER_SANITIZE_STRING);
					$categ->description = filter_var($parsedBody['description'], FILTER_SANITIZE_STRING);

				} catch(\Exception $e) {
					$resp= $resp->withStatus(404);

					$temp = array("type" => "error", "error" => '404', "message" => "Aucune categorie existant avec cette id");
					
					$resp->getBody()->write(json_encode($temp));

					return $resp;
				}

				try {
					$categ->save();
				} catch(\Exception $e) {
					$resp= $resp->withStatus(500);
					return $resp;
				}

				$resp= $resp->withStatus(200);

				$resp = $resp->withHeader('Location', $this->container['router']->pathFor('catid', ['id' => $categ->id] ) );

				$resp->getBody()->write(json_encode($categ->toArray()));
				return $resp;
			}
			else
			{
				$resp= $resp->withStatus(400);

				$temp = array("type" => "error", "error" => '400', "message" => "Donnée manquante");
				
				$resp->getBody()->write(json_encode($temp));

				return $resp;
			}
		}

		public function getSandwichFromCategorie($req, $resp, $args) {

			// ajoute ou remplace
			$rs= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

			$arr = new \lbs\common\models\Categorie();

			try {
				$arr = $arr->where('id', '=', $args['id'])->firstOrFail();
				$requete = $arr->sandwichs()->select('id', 'nom', 'type_pain')->get();

				$count = count($requete);
			}
			catch(\Exception $e)
			{
				$url = $this->container['router']->pathFor('sandid', [ 'id' => $args['id'] ]);

				$temp = array("type" => "error", "error" => '404', "message" => "ressource non disponible : ".$url);

				$rs->getBody()->write(json_encode($temp));

				return $rs;
			}

			foreach ($requete as $key => $value) {

				$url = $this->container['router']->pathFor('sandid', [ 'id' => $value['id'] ]);

				$tab[] = array('sandwich' => $value, 'links' => ['href' => $url]);
			}

			if(!isset($tab))
				$arr = array('type' => 'collection', 'meta' => [ 'count' => $count,'date' => date('d-m-Y')], 'sandwichs' => '');
			else
				$arr = array('type' => 'collection', 'meta' => [ 'count' => $count,'date' => date('d-m-Y')], 'sandwichs' => $tab);

			$rs->getBody()->write(json_encode($arr));

			return $rs;

		}


		public function getCategorieFromSandwich($req, $resp, $args) {

			// ajoute ou remplace
			$rs= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

			$arr = new \lbs\common\models\Sandwich();

			try {
				$arr = $arr->where('id', '=', $args['id'])->firstOrFail();
				$requete = $arr->categories()->select()->get();

				$count = count($requete);
			}
			catch(\Exception $e)
			{
				$url = $this->container['router']->pathFor('catid', [ 'id' => $args['id'] ]);

				$temp = array("type" => "error", "error" => '404', "message" => "ressource non disponible : ".$url);

				$rs->getBody()->write(json_encode($temp));

				return $rs;
			}

			foreach ($requete as $key => $value) {

				$url = $this->container['router']->pathFor('catid', [ 'id' => $value['id'] ]);

				$tab[] = array('categorie' => $value, 'links' => ['href' => $url]);
			}

			if(!isset($tab))
				$arr = array('type' => 'collection', 'meta' => [ 'count' => $count,'date' => date('d-m-Y')], 'categories' => '');
			else
				$arr = array('type' => 'collection', 'meta' => [ 'count' => $count,'date' => date('d-m-Y')], 'categories' => $tab);

			$rs->getBody()->write(json_encode($arr));

			return $rs;

		}


		public function getTailleFromSandwich($req, $resp, $args) {

			// ajoute ou remplace
			$rs= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

			$arr = new \lbs\common\models\Sandwich();

			try {
				$arr = $arr->where('id', '=', $args['id'])->firstOrFail();
				$requete = $arr->tailles()->select('id', 'nom', 'prix')->get();

				$count = count($requete);
			}
			catch(\Exception $e)
			{
				$temp = array("type" => "error", "error" => '404', "message" => "ressource non disponible : ");

				$rs->getBody()->write(json_encode($temp));

				return $rs;
			}

			foreach ($requete as $key => $value) {

				$tab[] = array('taille' => $value);
			}

			if(!isset($tab))
				$arr = array('type' => 'collection', 'meta' => [ 'count' => $count,'date' => date('d-m-Y')], 'tailles' => '');
			else
				$arr = array('type' => 'collection', 'meta' => [ 'count' => $count,'date' => date('d-m-Y')], 'tailles' => $tab);

			$rs->getBody()->write(json_encode($arr));

			return $rs;

		}


		public function createCommande($req, $resp, $args) {

			/*if ($req->getAttribute( 'has_errors' )) {

				$resp= $resp->withStatus(400);

				$temp = array("type" => "error", "error" => '400', "message" => "Donnée manquante");
				
				$resp->getBody()->write(json_encode($temp));

				return $resp;	
			} 
			else {*/
				$parsedBody = $req->getParsedBody();
			if(isset($parsedBody['nom_client']) && isset($parsedBody['mail_client']) && isset($parsedBody['livraison']['date']) && isset($parsedBody['livraison']['heure'])){
				

				$com = new \lbs\common\models\Commande();
				$com->id = Uuid::uuid1();
				$com->nom = filter_var($parsedBody['nom_client'], FILTER_SANITIZE_STRING);
				$com->mail = filter_var($parsedBody['mail_client'], FILTER_SANITIZE_STRING);
				$com->etat = 1;
				$com->date = $parsedBody['livraison']['date'];
				$com->heure = $parsedBody['livraison']['heure'];
				$com->token = bin2hex(random_bytes(32));

				try {
					$com->save();
				} catch(\Exception $e) {
					echo $e->getmessage();
				}

				$resp= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

				$resp= $resp->withStatus(201);

				$resp = $resp->withHeader('Location', $this->container['router']->pathFor('comid', ['id' => $com->id] ) );

				$tab = ['commande' => ['nom_client' => $com->nom, 'mail_client' => $com->mail, 'livraison' => ['date' => $com->date, 'heure' => $com->heure]], 'id' => $com->id, 'token' => $com->token];

				$resp->getBody()->write(json_encode($tab));
				return $resp;
			}else{
				$resp= $resp->withStatus(400);
				
				$temp = array("type" => "error", "error" => '400', "message" => "Donnée manquante");
								
				$resp->getBody()->write(json_encode($temp));
				
				return $resp;
			}
			//}
		}


		public function payerCommande($req, $resp, $args) {


			/*if ($req->getAttribute( 'has_errors' )) {

				$resp= $resp->withStatus(400);

				$temp = array("type" => "error", "error" => '400', "message" => "Donnée manquante");
				
				$resp->getBody()->write(json_encode($temp));

				return $resp;	
			} 
			else {*/

				$parsedBody = $req->getParsedBody();

				if(isset($parsedBody['carte_bc']) && isset($parsedBody['date_expiration_bc']))
				{

					$com = \lbs\common\models\Commande::findOrFail($args['id']);

					$com->etat = 2;
					$com->save();

					return $resp->withJson(array(
						'type' => 'message',
						'error' => 200,
						'message' => 'Paiement accépté'
					), 200);
				}
				else
				{

					$resp= $resp->withStatus(400);

					$temp = array("type" => "error", "error" => '400', "message" => "Donnée manquante");
					
					$resp->getBody()->write(json_encode($temp));

					return $resp;	
				}

			//}

		}

		public function getDescCommande($req, $resp, $args) {

			// ajoute ou remplace
			$rs= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

			$arr = new \lbs\common\models\Commande();

			try {
				$arr = $arr->where('id', '=', $args['id'])->firstOrFail();

				$temp = array('type' => 'collection', 'meta' => ['locale' => 'fr-FR'], 'commande' => $arr);

				if($arr->token != $req->getQueryParams()['token'])
				{

					$resp= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

					$resp= $resp->withStatus(405);

					$temp = array("type" => "error", "error" => '405', "message" => "Not allowed");
					
					$resp->getBody()->write(json_encode($temp));

					return $resp;
				}

			}
			catch(\Exception $e)
			{
				$url = $this->container['router']->pathFor('sandid', [ 'id' => $args['id'] ]);

				$temp = array("type" => "error", "error" => '404', "message" => "ressource non disponible : ".$url);

				$rs->getBody()->write(json_encode($temp));

				return $rs;
			}
			
			$rs->getBody()->write(json_encode($temp));

			return $rs;


		}


		public function createItem($req, $resp, $args) {

			if ($req->getAttribute( 'has_errors' )) {

				$resp= $resp->withStatus(400);

				$temp = array("type" => "error", "error" => '400', "message" => "Donnée manquante");
				
				$resp->getBody()->write(json_encode($temp));

				return $resp;	
			} 
			else {

				$parsedBody = $req->getParsedBody();

				$item = new \lbs\common\models\Item();
				$item->id_commande = $args['id'];
				$item->id_sandwich = $parsedBody['sandwich']['id_sandwich'];
				$item->id_taille_sandwich = $parsedBody['sandwich']['id_taille'];
				$item->qte = $parsedBody['sandwich']['qte'];

				try {
					$item->save();
				} catch(\Exception $e) {
					echo $e->getmessage();
				}

				$resp= $resp->withHeader( 'Content-type', "application/json;charset=utf-8");

				$resp= $resp->withStatus(201);

				//$resp = $resp->withHeader('Location', $this->container['router']->pathFor('comid', ['id' => $item->id] ) );

				$tab = ['id_commande' => $item->id_commande, 'sandwich' => ['id_sandwich' => $item->id_sandwich, 'id_taille' => $item->id_taille_sandwich, 'quantite' => $item->qte]];

				$resp->getBody()->write(json_encode($tab));
				return $resp;

			}
		}

	}
