define({ "api": [
  {
    "type": "get",
    "url": "/cartes/:id",
    "title": "accéder à une carte",
    "group": "Cartes",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifiant unique de la catégorie</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de la réponse, ici resource</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>méta-données sur la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "STring",
            "optional": false,
            "field": "meta.locale",
            "description": "<p>langue de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "carte",
            "description": "<p>la ressource carte retournée</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "carte.id",
            "description": "<p>Identifiant de la carte</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "carte.date_creation",
            "description": "<p>Date de création de la carte</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "carte.date_valide",
            "description": "<p>Date de validité de la carte</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "carte.cumul",
            "description": "<p>Cumul de la carte</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n{\n\t\"type\" : \"collection,\n\t\"meta\" : {\n\t\t\"locale\":\"fr-FR\"\n\t},\n\t\"carte\" : {\n\t\t\"id\"  : \"4\",\n\t\t\"date_creation\" : \"0000-00-00\",\n\t\t\"date_valide\" : 0000-00-00\",\n\t\t\"cumul\" : \"14\"\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erreur : 401": [
          {
            "group": "Erreur : 401",
            "optional": false,
            "field": "RefusedAccess",
            "description": "<p>accès refusé à la ressource</p>"
          }
        ],
        "Erreur : 404": [
          {
            "group": "Erreur : 404",
            "optional": false,
            "field": "MissingParameter",
            "description": "<p>paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"type\" : \"error\",\n  \"error\" : 404,\n  \"message\" : \"ressource non disponible : /cartes/:id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Cartes",
    "name": "GetCartesId"
  },
  {
    "type": "get",
    "url": "/cartes/:id/auth",
    "title": "authentification",
    "group": "Cartes",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identifiant unique de la catégorie</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de la réponse, ici resource</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "auth",
            "description": "<p>la ressource auth retournée</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "auth.id",
            "description": "<p>Identifiant de l'auth</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth.nom",
            "description": "<p>Nom de l'auth</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth.passwd",
            "description": "<p>Mot de passe de l'auth</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "HTTP/1.1 200 OK\n\n{\n   \"type\" : \"collection,\n   \"id\"  : \"1\",\n   \"nom\" : \"michel\",\n   \"passwd\" : \"lebonmdp\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erreur : 404": [
          {
            "group": "Erreur : 404",
            "optional": false,
            "field": "MissingParameter",
            "description": "<p>paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"type\" : \"error\",\n  \"error\" : 404,\n  \"message\" : \"ressource non disponible : /cartes/:id/auth\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Cartes",
    "name": "GetCartesIdAuth"
  },
  {
    "type": "post",
    "url": "/cartes",
    "title": "ajouter une carte",
    "group": "Cartes",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Nom de la personne</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mot de passe</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de paramètres",
          "content": "{\n\t\"nom\"  : \"michel\",\n\t\"password\"  : \"lebonmdp\"\n}",
          "type": "request"
        }
      ]
    },
    "success": {
      "fields": {
        "Réponse : 200": [
          {
            "group": "Réponse : 200",
            "type": "json",
            "optional": false,
            "field": "commande",
            "description": "<p>Paiement accépté</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "POST /cartes/{id}/paiement HTTP/1.1\nHost: api.lbs.local:10080\nContent-Type: application/json;charset=utf8\nLocation: /cartes/r8786989-e0d2-4bfb-a72f-455ca4a16beb/paiement\n\n{\n\t\"id\": 3,\n\t\"nom\": \"michel\",\n\t\"cumule\": \"0\",\n\t\"date de validité\": \"2019-02-04 18:59:48\",\n\t\"date de création\": \"2018-02-04 18:59:48\"\n}",
          "type": "response"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Location:",
            "description": "<p>uri de la ressource créée et l'id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type:",
            "description": "<p>format de représentation de la ressource réponse</p>"
          }
        ]
      }
    },
    "filename": "./rest.php",
    "groupTitle": "Cartes",
    "name": "PostCartes"
  },
  {
    "type": "post",
    "url": "/cartes/:id/paiement",
    "title": "payer avec la carte",
    "group": "Cartes",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carte_bc",
            "description": "<p>Numéro de la carte bancaire</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date_expiration_bc",
            "description": "<p>Date d'expiration de la carte bancaire</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de paramètres",
          "content": "{\n\t\"carte_bc\"  : \"1111222233334444\",\n\t\"date_expiration_bc\"  : \"12/18\"\n}",
          "type": "request"
        }
      ]
    },
    "success": {
      "fields": {
        "Réponse : 200": [
          {
            "group": "Réponse : 200",
            "type": "json",
            "optional": false,
            "field": "commande",
            "description": "<p>Paiement accépté</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas de succès",
          "content": "POST /cartes/{id}/paiement HTTP/1.1\nHost: api.lbs.local:10080\nContent-Type: application/json;charset=utf8\nLocation: /cartes/r8786989-e0d2-4bfb-a72f-455ca4a16beb/paiement\n\n{\n\t\"carte_bc\"  : \"1111222233334444\",\n\t\"date_expiration_bc\"  : \"12/18\"\n}",
          "type": "response"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Location:",
            "description": "<p>uri de la ressource créée et l'id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type:",
            "description": "<p>format de représentation de la ressource réponse</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Réponse : 400": [
          {
            "group": "Réponse : 400",
            "optional": false,
            "field": "MissingParameter",
            "description": "<p>paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"type\": \"error\",\n  \"error\" : 400,\n  \"message\" : \"donnée manquante\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Cartes",
    "name": "PostCartesIdPaiement"
  },
  {
    "type": "get",
    "url": "/categories",
    "title": "Liste des catégories",
    "group": "Categorie",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>méta-données de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.count",
            "description": "<p>Count</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meta.locale",
            "description": "<p>Langue de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "categorie",
            "description": "<p>La catégorie</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categorie.id",
            "description": "<p>Id de la catégorie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categorie.nom",
            "description": "<p>Nom de la catégorie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categorie.description",
            "description": "<p>Description de la catégorie</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"type\": \"collection\",\n\t\"meta\": {\n\t\t\"count\": 6,\n\t\t\"locale\": \"fr-FR\"\n\t},\n\t\"categorie\": {\n\t\t\"id\": 1,\n\t\t\"nom\": \"bio\",\n\t\t\"description\": \"sandwichs ingrédients bio et locaux\"\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "GetCategories"
  },
  {
    "type": "get",
    "url": "/categories/:id",
    "title": "Trouver une catégorie",
    "group": "Categorie",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>L'id de la catégorie</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>méta-donnée de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meta.locale",
            "description": "<p>Langue de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "categories",
            "description": "<p>Liste des catégories</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categories.id",
            "description": "<p>Id de la catégories</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categories.nom",
            "description": "<p>Nom de la catégories</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categories.description",
            "description": "<p>Description de la catégories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"type\": \"collection\",\n\t\"meta\": {\n\t\t\"locale\": \"fr-FR\"\n\t},\n\t\"categorie\": {\n\t\t\"id\": 1,\n\t\t\"nom\": \"bio\",\n\t\t\"description\": \"sandwichs ingrédients bio et locaux\"\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erreur : 404": [
          {
            "group": "Erreur : 404",
            "optional": false,
            "field": "CategorieNotFound",
            "description": "<p>Categorie inexistante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"type\" : \"error',\n  \"error\" : 404,\n  \"message\" : ressource non disponible : /categories/86/\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "GetCategoriesId"
  },
  {
    "type": "get",
    "url": "/sandwichs/:id/categories",
    "title": "Liste des catégories à laquelle le sandwich appartient",
    "group": "Categorie",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>L'id du sandwich</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>méta-données de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.count",
            "description": "<p>Count</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.date",
            "description": "<p>Date du jour</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "categories",
            "description": "<p>Liste des catégories à laquelle le sandwich appartient</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categories.categorie.id",
            "description": "<p>Id de la categorie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categories.categorie.nom",
            "description": "<p>Nom de la catégorie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categories.categorie.description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categories.pivots.categorie.sand_id",
            "description": "<p>Id du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categories.pivots.categorie.cat_id",
            "description": "<p>Id de la catégorie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categories.links.href",
            "description": "<p>Lien</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"type\" : \"collection\",\n\t\"meta\" : {\n\t\t\"count\" : 2,\n\t\t\"date\" : \"04-02-2018\"\n\t},\n\t\"categories\":{\n\t\t\"categorie\":{\n\t\t\t\"id\": 4,\n\t\t\t\"nom\": \"traditionnel\",\n\t\t\t\"description\": \"sandwichs traditionnels : jambon, pâté, poulet etc ..\",\n\t\t\t\"pivot\":{\n\t\t\t\t\"sand_id\": 4,\n\t\t\t\t\"cat_id\": 3\n\t\t\t}\n\t\t},\n\t\t\"links\": {\n\t\t\t\"href\": \"/categories/3\"\n\t\t}\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erreur : 404": [
          {
            "group": "Erreur : 404",
            "optional": false,
            "field": "CategorieNotFoundInSandwich",
            "description": "<p>CategorieFromSandwich inexistante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"type\" : \"error\",\n  \"error\" : 404,\n  \"message\" : \"ressource non disponible : /sandwichs/:id/categories\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "GetSandwichsIdCategories"
  },
  {
    "type": "post",
    "url": "/categories",
    "title": "Ajout d'une catégorie",
    "group": "Categorie",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json;charset=utf-8</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Nom de la categorie</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description de la categorie</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "POST /categories/ HTTP/1.1\nHost: api.lbs.local:10080 \nContent-Type:application/json;charset=utf-8\n\n{\n\t\"nom\": \"nom de la categorie\",\n\t\"description\": \"description de la categorie\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "categories",
            "description": "<p>Liste des catégories</p>"
          },
          {
            "group": "Success 201",
            "type": "Number",
            "optional": false,
            "field": "categories.id",
            "description": "<p>Id de la catégories</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "categories.nom",
            "description": "<p>Nom de la catégories</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "categories.description",
            "description": "<p>Description de la catégories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 OK\nLocation: /categories/18\nContent-Type: application/json;charset=utf-8\n\n{\n\t\"id\": 18,\n\t\"nom\": \"nom de la categorie\",\n\t\"description\": \"description de la categorie\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Réponse : 400": [
          {
            "group": "Réponse : 400",
            "optional": false,
            "field": "MissingParameter",
            "description": "<p>paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"type\": \"error\",\n\t\"error\" : 400,\n\t\"message\" : \"donnée manquante\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "PostCategories"
  },
  {
    "type": "put",
    "url": "/categories/:id",
    "title": "Modification d'une catégorie",
    "group": "Categorie",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json;charset=utf-8</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id de la categorie</p>"
          }
        ],
        "paramètres de la requête": [
          {
            "group": "paramètres de la requête",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>Nom de la categorie</p>"
          },
          {
            "group": "paramètres de la requête",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description de la categorie</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "PUT /categories/1 HTTP/1.1\nHost: api.lbs.local:10080\nContent-Type: application/json;charset=utf8\n{\n\t\"nom\": \"nom\",\n\t\"description\": \"description\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "categories",
            "description": "<p>Liste des catégories</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categories.id",
            "description": "<p>Id de la catégories</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categories.nom",
            "description": "<p>Nom de la catégories</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categories.description",
            "description": "<p>Description de la catégories</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json;charset=utf8\n{\n\t\"id\": 1,\n\t\"nom\": \"nom\",\n\t\"description\": \"description\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "PutCategoriesId"
  },
  {
    "type": "get",
    "url": "/commandes/:id?token=:token",
    "title": "Affichage de la commande",
    "group": "Commande",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la commande</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token de  la commande</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>méta-données de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meta.locale",
            "description": "<p>Langue</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "commande",
            "description": "<p>Details de la commande</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commande.id",
            "description": "<p>Id de la commande</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.nom",
            "description": "<p>Nom du client</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.mail",
            "description": "<p>Mail du client</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.date",
            "description": "<p>Date de livraison voulu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.heure",
            "description": "<p>Heure de livraison voulu</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commande.etat",
            "description": "<p>Etat de la commande</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.token",
            "description": "<p>token de la commande</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commande.carte",
            "description": "<p>id de carte du client</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.created_at",
            "description": "<p>Date de création de la commande</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.updated_at",
            "description": "<p>Date de création ou de mise à jour de la commande</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"type\" : \"collection\",\n\t\"meta\" : {\n\t\t\"locale\" : \"fr-FR\"\n\t},\n\t\"commande\": {\n\t\t\"id\": \"cdab64c8-0925-11e8-8a06-1ba8be3d6fc9\",\n\t\t\"nom\": \"Jean Dupont\",\n\t\t\"mail\": \"jean.dupond@gmail.com\",\n\t\t\"date\": \"25-12-2018\",\n\t\t\"heure\": \"14:00\",\n\t\t\"etat\": 1,\n\t\t\"token\": \"1015257d7d2bfc9f50086d93ea5ddc722baf4ebdfa082377e3a8f8fae9236734\",\n\t\t\"carte\": null,\n\t\t\"created_at\": \"2018-02-03 21:04:20\",\n\t\t\"updated_at\": \"2018-02-03 21:04:20\"\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erreur : 404": [
          {
            "group": "Erreur : 404",
            "optional": false,
            "field": "CommandeNotFound",
            "description": "<p>Commande inexistante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"type\" : \"error\",\n  \"error\" : 404,\n  \"message\" : \"ressource non disponible : /commandes/:id\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Commande",
    "name": "GetCommandesIdTokenToken"
  },
  {
    "type": "post",
    "url": "/commandes",
    "title": "Ajout d'une catégorie",
    "group": "Commande",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json;charset=utf-8</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom_client",
            "description": "<p>Nom du client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail_client",
            "description": "<p>Mail du client</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "livraison",
            "description": "<p>Livraison</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "livraison.date",
            "description": "<p>Date de livraison</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "livraison.heure",
            "description": "<p>Heure de la livraison</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\t\"nom_client\": \"Jean Dupont\",\n\t\"mail_client\": \"jean.dupond@gmail.com\",\n\t\"livraison\":{\n\t\t\"date\": \"25-12-2018\",\n\t\t\"heure\": \"14:00\"\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "commande",
            "description": "<p>Liste des catégories</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commande.nom_client",
            "description": "<p>Nom du client</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.mail_client",
            "description": "<p>Mail du client</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "commande.livraison",
            "description": "<p>Livraison</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.livraison.date",
            "description": "<p>Date de livraison</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "commande.livraison.heure",
            "description": "<p>Heure de la livraison</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la livraison</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token d'authentification de la livraison</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 OK\n{\n\t\"commande\": {\n\t\t\"nom_client\": \"Jean Dupont\",\n\t\t\"mail_client\": \"jean.dupond@gmail.com\",\n\t\t\"livraison\": {\n\t\t\t\"date\": \"25-12-2018\",\n\t\t\t\"heure\": \"14:00\"\n\t\t}\n\t},\n\t\"id\": \"8c883224-091f-11e8-ac97-ffd5582c965b\",\n\t\"token\": \"790b34ab7b68eb358b46ac0800df53da590e602f7f2341192ec40307226867af\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Réponse : 400": [
          {
            "group": "Réponse : 400",
            "optional": false,
            "field": "MissingParameter",
            "description": "<p>paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"type\": \"error\",\n  \"error\" : 400,\n  \"message\" : \"donnée manquante\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Commande",
    "name": "PostCommandes"
  },
  {
    "type": "post",
    "url": "/commandes/:id/paiement",
    "title": "Paiement d'une commande",
    "group": "Commande",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json;charset=utf-8</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>L'id du sandwich</p>"
          }
        ],
        "paramètres de la requête": [
          {
            "group": "paramètres de la requête",
            "type": "String",
            "optional": false,
            "field": "carte_bc",
            "description": "<p>Numéro de carte banquaire du client</p>"
          },
          {
            "group": "paramètres de la requête",
            "type": "String",
            "optional": false,
            "field": "date_expiration_bc",
            "description": "<p>Date d'expiration de la carte banquaire du client</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\t\"carte_bc\": \"1111222233334444\",\n\t\"date_expiration_bc\": \"12/18\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\nPOST /commandes/ HTTP/1.1\nHost: api.lbs.local:10080\nContent-Type: application/json;charset=utf8\nLocation: /commandes/e3786989-e0d2-4cfb-a72f-455ca4a16beb/paiement\n\n{\n\t\"type\": \"message\",\n\t\"error\": \"200\",\n\t\"message\": \"Paiement accépté\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Réponse : 400": [
          {
            "group": "Réponse : 400",
            "optional": false,
            "field": "MissingParameter",
            "description": "<p>paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"type\": \"error\",\n  \"error\" : 400,\n  \"message\" : \"donnée manquante\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Commande",
    "name": "PostCommandesIdPaiement"
  },
  {
    "type": "post",
    "url": "/commandes/:id/sandwichs",
    "title": "Ajout d'un sandwich à une commande",
    "group": "Commande",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_commande",
            "description": "<p>Id de la commande</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "sandwich",
            "description": "<p>Sandwich</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sandwich.id_sandwich",
            "description": "<p>Id du sandwich</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sandwich.id_taille",
            "description": "<p>Id de la taille du sandwich</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sandwich.qte",
            "description": "<p>Id du sandwich</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\t\"id\": \"cdab64c8-0925-11e8-8a06-1ba8be3d6fc9\",\n\t\"sandwich\": {\n\t\t\"id_sandwich\": 4,\n\t\t\"id_taille\": 1,\n\t\t\"qte\": 1\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\nPOST /commandes/cdab64c8-0925-11e8-8a06-1ba8be3d6fc9/sandwichs HTTP1.1 \nHOST: api.lbs.local:10080 \nContent-Type: application/json;charset=utf-8 \nLocation: /commandes/cdab64c8-0925-11e8-8a06-1ba8be3d6fc9/sandiwchs\n{\n\t\"id_commande\": \"cdab64c8-0925-11e8-8a06-1ba8be3d6fc9\",\n\t\"sandwich\": {\n\t\t\"id_sandwich\": 4,\n\t\t\"id_taille\": 1,\n\t\t\"quantite\": 1\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Réponse : 400": [
          {
            "group": "Réponse : 400",
            "optional": false,
            "field": "MissingParameter",
            "description": "<p>paramètre manquant dans la requête</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"type\": \"error\",\n  \"error\" : 400,\n  \"message\" : \"donnée manquante\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Commande",
    "name": "PostCommandesIdSandwichs"
  },
  {
    "type": "get",
    "url": "/categories/:id/sandwichs",
    "title": "Liste des sandwichs apartenant à la catégorie",
    "group": "Sandwich",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>L'id de la catégorie</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>méta-données de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.count",
            "description": "<p>Count</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.date",
            "description": "<p>Date du jour</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sandwichs",
            "description": "<p>Liste des sandwichs appartenant à la catégorie</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sandwichs.sandwich.id",
            "description": "<p>Id du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwichs.sandwich.nom",
            "description": "<p>Nom du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwichs.sandwich.type_pain",
            "description": "<p>type de pain du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwichs.links.href",
            "description": "<p>Lien du sandwich</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"type\" : \"collection\",\n\t\"meta\" : {\n\t\t\"count\" : 1,\n\t\t\"date\" : \"04-02-2018\"\n\t},\n\t\"sandwichs\": {\n\t\t\"sandwich\":{\n\t\t\t\"id\": 4,\n\t\t\t\"nom\": \"le bucheron\",\n\t\t\t\"type_pain\": \"baguette campagne\"\n\t\t},\n\t\t\"links\":{\n\t\t\t\"href\": \"sandwichs/4\"\n\t\t}\n\t}\n\t\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erreur : 404": [
          {
            "group": "Erreur : 404",
            "optional": false,
            "field": "SandwichNotFoundFromCategorie",
            "description": "<p>SandwichFromCategorie inexistante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"type\" : \"error\",\n  \"error\" : 404,\n  \"message\" : \"ressource non disponible : categories/:id/sandwich\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Sandwich",
    "name": "GetCategoriesIdSandwichs"
  },
  {
    "type": "get",
    "url": "/sandwich",
    "title": "Liste des sandwichs",
    "group": "Sandwich",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>L'id du sandwich</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>méta-données de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.count",
            "description": "<p>Count</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.size",
            "description": "<p>Size</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.date",
            "description": "<p>Date du jour</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sandwichs",
            "description": "<p>Liste des sandwichs</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sandwichs.id",
            "description": "<p>Id du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwichs.nom",
            "description": "<p>Nom du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwichs.type_pain",
            "description": "<p>type de pain du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sandwichs.links",
            "description": "<p>Lien</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwichs.links.href",
            "description": "<p>Lien vers son détail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"type\" : \"collection\",\n\t\"meta\" : {\n\t\t\"count\" : 111,\n\t\t\"size\" : 10,\n\t\t\"date\" : \"04-02-2018\"\n\t},\n\t\"sandwichs\" : {\n\t\t\"id\"  : 4 ,\n\t\t\"nom\" : \"le bucheron\",\n\t\t\"type_pain\" : \"baguette campagne\",\n\t\t\"links\" : {\n\t\t\t\"href\" : \"/sandwichs/4\"\n\t\t}\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Sandwich",
    "name": "GetSandwich"
  },
  {
    "type": "get",
    "url": "/sandwich/:id",
    "title": "Trouver un sandwich",
    "group": "Sandwich",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>L'id du sandwich</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>méta-donnée de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meta.locale",
            "description": "<p>Langue de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "sandwich",
            "description": "<p>Sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sandwich.id",
            "description": "<p>Id du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwich.nom",
            "description": "<p>Nom du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwich.description",
            "description": "<p>Description du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwich.type_pain",
            "description": "<p>type de pain du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sandwich.img",
            "description": "<p>Lien de l'img du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "categories",
            "description": "<p>Categories</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categories.id",
            "description": "<p>Id de la categorie</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "categories.nom",
            "description": "<p>Nom de la categorie</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "categories.pivot",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categories.pivot.sand_id",
            "description": "<p>Id du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categories.pivot.cat_id",
            "description": "<p>Id de la categorie</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tailles",
            "description": "<p>Tailles</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tailles.id",
            "description": "<p>Id de la taille</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tailles.nom",
            "description": "<p>Nom de la taille</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tailles.prix",
            "description": "<p>prix de la taille du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links",
            "description": "<p>Lien</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links.categories",
            "description": "<p>Lien de la liaison</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "links.categories.href",
            "description": "<p>Lien</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "links.tailles",
            "description": "<p>Lien de la liaison</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "links.tailles.href",
            "description": "<p>Lien</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"type\": \"collection\",\n\t\"meta\": {\n\t\t\"locale\": \"fr-FR\"\n\t},\n\t\"sandwich\": {\n\t\t\"id\": 4,\n\t\t\"nom\": \"le bucheron\",\n\t\t\"description\": \"un sandwich de bucheron : frites, fromage, saucisse, steack, lard grillé, mayo\",\n\t\t\"type_pain\": \"baguette campagne\",\n\t\t\"img\": \"www.google.fr\"\n\t},\n\t\"categories\":{\n\t\t\"id\": 3,\n\t\t\"nom\": \"traditionnel\",\n\t\t\"pivot\":{\n\t\t\t\"sand_id\": 4,\n\t\t\t\"cat_id\": 3\n\t\t}\n\t},\n\t\"tailles\":{\n\t\t\"id\": 1,\n\t\t\"nom\": \"petite faim\",\n\t\t\"prix\": \"6.00\"\n\t},\n\t\"links\":{\n\t\t\"categories\": {\n\t\t\t\"href\": \"/sandwichs/4/categories\"\n\t\t},\n\t\t\"tailles\": {\n\t\t\t\"href\": \"/sandwichs/4/tailles\"\n\t\t}\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erreur : 404": [
          {
            "group": "Erreur : 404",
            "optional": false,
            "field": "SandwichNotFound",
            "description": "<p>Sandwich inexistante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 404 Not Found\n\n{\n\t\"type\" : \"error\",\n\t\"error\" : 404,\n\t\"message\" : \"ressource non disponible : /sandwichs/1/\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Sandwich",
    "name": "GetSandwichId"
  },
  {
    "type": "get",
    "url": "/sandwichs/:id/tailles",
    "title": "Liste des tailles à laquelle le sandwich appartient",
    "group": "Taille",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>L'id du sandwich</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type de réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "meta",
            "description": "<p>méta-données de la réponse</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.count",
            "description": "<p>Count</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "meta.date",
            "description": "<p>Date du jour</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tailles",
            "description": "<p>Liste des tailles à laquelle le sandwich appartient</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tailles.taille.id",
            "description": "<p>Id de la taille</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tailles.taille.nom",
            "description": "<p>Nom de la taille</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tailles.taille.prix",
            "description": "<p>Prix</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tailles.taille.pivots.categorie.sand_id",
            "description": "<p>Id du sandwich</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tailles.taille.pivots.categorie.cat_id",
            "description": "<p>Id de la catégorie</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\t\"type\" : \"collection\",\n\t\"meta\" : {\n\t\t\"count\" : 2,\n\t\t\"date\" : \"04-02-2018\"\n\t},\n\t\"tailles\":{\n\t\t\"taille\":{\n\t\t\t\"id\": 1,\n\t\t\t\"nom\": \"petite faim\",\n\t\t\t\"prix\": \"6.00\",\n\t\t\t\"pivot\":{\n\t\t\t\t\"sand_id\": 4,\n\t\t\t\t\"cat_id\": 1\n\t\t\t}\n\t\t}\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erreur : 404": [
          {
            "group": "Erreur : 404",
            "optional": false,
            "field": "TailleNotFoundInSandwich",
            "description": "<p>TailleFromSandwich inexistante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "exemple de réponse en cas d'erreur",
          "content": "HTTP/1.1 404 Not Found\n\n{\n  \"type\" : \"error\",\n  \"error\" : 404,\n  \"message\" : \"ressource non disponible : /sandwichs/:id/tailles\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./rest.php",
    "groupTitle": "Taille",
    "name": "GetSandwichsIdTailles"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "_home_daniel_ApiPhP_LeBonSandwich_api_apidoc_main_js",
    "groupTitle": "_home_daniel_ApiPhP_LeBonSandwich_api_apidoc_main_js",
    "name": ""
  }
] });
