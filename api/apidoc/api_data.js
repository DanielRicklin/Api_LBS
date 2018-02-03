define({ "api": [
  {
    "type": "get",
    "url": "/categories",
    "title": "Liste des catégories",
    "group": "Categorie",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
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
          "content": "HTTP/1.1 200 OK\n[{\n\t\"id\": 1,\n\t\"nom\": \"bio\",\n\t\"description\": \"sandwichs ingrédients bio et locaux\"\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "GetCategories"
  },
  {
    "type": "get",
    "url": "/categories/:id",
    "title": "Trouver une catégorie",
    "group": "Categorie",
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
            "type": "Object[]",
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
          "content": "HTTP/1.1 200 OK\n[{\n\t\"id\": 1,\n\t\"nom\": \"bio\",\n\t\"description\": \"sandwichs ingrédients bio et locaux\"\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "GetCategoriesId"
  },
  {
    "type": "get",
    "url": "/sandwichs/:id/categories",
    "title": "Liste des catégories à laquelle le sandwich appartient",
    "group": "Categorie",
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
            "type": "Object[]",
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
          "content": "HTTP/1.1 200 OK\n[{\n\t\"categorie\":{\n\t\t\"id\": 4,\n\t\t\"nom\": \"traditionnel\",\n\t\t\"description\": \"sandwichs traditionnels : jambon, pâté, poulet etc ..\",\n\t\t\"pivot\":{\n\t\t\t\"sand_id\": 4,\n\t\t\t\"cat_id\": 3\n\t\t}\n\t},\n\t\"links\": {\n\t\t\"href\": \"/categories/3\"\n\t}\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "GetSandwichsIdCategories"
  },
  {
    "type": "post",
    "url": "/categories",
    "title": "Ajout d'une catégorie",
    "group": "Categorie",
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
          "content": "{\n\t\"nom\": \"nom de la categorie\",\n\t\"description\": \"description de la categorie\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
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
          "content": "HTTP/1.1 201 OK\n[{\n\t\"id\": 17,\n\t\"nom\": \"nom de la categorie\",\n\t\"description\": \"description de la categorie\"\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "PostCategories"
  },
  {
    "type": "put",
    "url": "/categories/:id",
    "title": "Modification d'une catégorie",
    "group": "Categorie",
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
          "content": "{\n\t\"nom\": \"nom de la categorie\",\n\t\"description\": \"description de la categorie\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
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
          "content": "HTTP/1.1 200 OK\n[{\n\t\"id\": 1,\n\t\"nom\": \"bio\",\n\t\"description\": \"sandwichs ingrédients bio et locaux\"\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Categorie",
    "name": "PutCategoriesId"
  },
  {
    "type": "get",
    "url": "/commandes/:id?token=:token",
    "title": "Affichage de la commande",
    "group": "Commande",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la commande</p>"
          },
          {
            "group": "Parameter",
            "type": "token",
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
            "type": "Object[]",
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
            "type": "Datetime",
            "optional": false,
            "field": "commande.date",
            "description": "<p>Date de livraison voulu</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
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
            "type": "Datetime",
            "optional": false,
            "field": "commande.created_at",
            "description": "<p>Date de création de la commande</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "commande.updated_at",
            "description": "<p>Date de création ou de mise à jour de la commande</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "\tHTTP/1.1 200 OK\n\t[{\n\t\t\"commande\": {\n  \t\t\"id\": \"cdab64c8-0925-11e8-8a06-1ba8be3d6fc9\",\n  \t\t\"nom\": \"Jean Dupont\",\n  \t\t\"mail\": \"jean.dupond@gmail.com\",\n  \t\t\"date\": \"25-12-2018\",\n  \t\t\"heure\": \"14:00\",\n  \t\t\"etat\": 1,\n  \t\t\"token\": \"1015257d7d2bfc9f50086d93ea5ddc722baf4ebdfa082377e3a8f8fae9236734\",\n  \t\t\"carte\": null,\n  \t\t\"created_at\": \"2018-02-03 21:04:20\",\n  \t\t\"updated_at\": \"2018-02-03 21:04:20\"\n\t\t}\n\t}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Commande",
    "name": "GetCommandesIdTokenToken"
  },
  {
    "type": "post",
    "url": "/commandes",
    "title": "Ajout d'une catégorie",
    "group": "Commande",
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
            "type": "Object[]",
            "optional": false,
            "field": "livraison",
            "description": "<p>Livraison</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "livraison.date",
            "description": "<p>Date de livraison</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
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
            "type": "Object[]",
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
            "type": "Object[]",
            "optional": false,
            "field": "commande.livraison",
            "description": "<p>Livraison</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "commande.livraison.date",
            "description": "<p>Date de livraison</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
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
          "content": "\tHTTP/1.1 201 OK\n\t[{\n\t\t\"commande\": {\n  \t\t\"nom_client\": \"Jean Dupont\",\n  \t\t\"mail_client\": \"jean.dupond@gmail.com\",\n  \t\t\"livraison\": {\n    \t\t\t\"date\": \"25-12-2018\",\n    \t\t\t\"heure\": \"14:00\"\n  \t\t}\n\t\t},\n\t\t\"id\": \"8c883224-091f-11e8-ac97-ffd5582c965b\",\n\t\t\"token\": \"790b34ab7b68eb358b46ac0800df53da590e602f7f2341192ec40307226867af\"\n\t}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Commande",
    "name": "PostCommandes"
  },
  {
    "type": "post",
    "url": "/commandes/:id/paiement",
    "title": "Paiement d'une commande",
    "group": "Commande",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carte_bc",
            "description": "<p>Numéro de carte banquaire du client</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "date_expiration_bc",
            "description": "<p>Date d'expiration de la carte banquaire du client</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\t\"carte_bc\": \"1111 2222 3333 4444\",\n\t\"date_expiration_bc\": \"12/18\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "\tHTTP/1.1 200 OK\n\t[{\n  \t\"type\": \"message\",\n  \t\"error\": \"200\",\n  \t\"message\": \"Paiement accépté\"\n }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Commande",
    "name": "PostCommandesIdPaiement"
  },
  {
    "type": "post",
    "url": "/commandes/:id/sandwichs",
    "title": "Ajout d'un sandwich à une commande",
    "group": "Commande",
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
            "type": "Object[]",
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
          "content": "\tHTTP/1.1 200 OK\n\t[{\n  \t\"id_commande\": \"cdab64c8-0925-11e8-8a06-1ba8be3d6fc9\",\n\t\t\"sandwich\": {\n\t\t\t\"id_sandwich\": 4,\n\t\t\t\"id_taille\": 1,\n\t\t\t\"quantite\": 1\n\t\t}\n }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Commande",
    "name": "PostCommandesIdSandwichs"
  },
  {
    "type": "get",
    "url": "/categories/:id/sandwichs",
    "title": "Liste des sandwichs apartenant à la catégorie",
    "group": "Sandwich",
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
            "type": "Object[]",
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
          "content": "HTTP/1.1 200 OK\n[{\"sandwich\":{\n\t\"id\": 4,\n\t\"nom\": \"le bucheron\",\n\t\"type_pain\": \"baguette campagne\"\n},\n\"links\":{\n\t\"href\": \"sandwichs/4\"\n}}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Sandwich",
    "name": "GetCategoriesIdSandwichs"
  },
  {
    "type": "get",
    "url": "/sandwich",
    "title": "Liste des sandwichs",
    "group": "Sandwich",
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
            "type": "Object[]",
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
            "field": "sandwichs.description",
            "description": "<p>Description du sandwich</p>"
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
            "type": "String",
            "optional": false,
            "field": "sandwichs.img",
            "description": "<p>Lien de l'img du sandwich</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n\t\"id\": 4,\n\t\"nom\": \"le bucheron\",\n\t\"description\": \"un sandwich de bucheron : frites, fromage, saucisse, steack, lard grillé, mayo\",\n\t\"type_pain\": \"baguette campagne\",\n\t\"img\": \"www.google.fr\"\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Sandwich",
    "name": "GetSandwich"
  },
  {
    "type": "get",
    "url": "/sandwich/:id",
    "title": "Trouver un sandwich",
    "group": "Sandwich",
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
            "type": "Object[]",
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
            "type": "Object[]",
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
            "type": "Object[]",
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
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>Lien</p>"
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
          "content": "HTTP/1.1 200 OK\n[{\"sandwich\": {\n\t\"id\": 4,\n\t\"nom\": \"le bucheron\",\n\t\"description\": \"un sandwich de bucheron : frites, fromage, saucisse, steack, lard grillé, mayo\",\n\t\"type_pain\": \"baguette campagne\",\n\t\"img\": \"www.google.fr\"\n},\n\"categories\":{\n\t\"id\": 3,\n\t\"nom\": \"traditionnel\",\n\t\"pivot\":{\n\t\t\"sand_id\": 4,\n\t\t\"cat_id\": 3\n\t}\n},\n\"tailles\":{\n\t\"id\": 1,\n\t\"nom\": \"petite faim\",\n\t\"prix\": \"6.00\"\n},\n\"links\":{\n\t\"categories\": {\n\t\t\"href\": \"/sandwichs/4/categories\"\n\t},\n\t\"tailles\": {\n\t\t\"href\": \"/sandwichs/4/tailles\"\n\t}\n}}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./rest.php",
    "groupTitle": "Sandwich",
    "name": "GetSandwichId"
  },
  {
    "type": "get",
    "url": "/sandwichs/:id/tailles",
    "title": "Liste des tailles à laquelle le sandwich appartient",
    "group": "Taille",
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
            "type": "Object[]",
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
          "content": "HTTP/1.1 200 OK\n[{\n\t\"taille\":{\n\t\t\"id\": 1,\n\t\t\"nom\": \"petite faim\",\n\t\t\"prix\": \"6.00\",\n\t\t\"pivot\":{\n\t\t\t\"sand_id\": 4,\n\t\t\t\"cat_id\": 1\n\t\t}\n\t}\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
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
