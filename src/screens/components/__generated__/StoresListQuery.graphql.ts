/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type StoreCategory = "KIOSK" | "SHOPPING" | "STREET";
export type StoresWhereInput = {
    category: StoreCategoryOperatorInput;
};
export type StoreCategoryOperatorInput = {
    eq?: StoreCategory | null;
    in?: Array<StoreCategory> | null;
    neq?: StoreCategory | null;
    nin?: Array<StoreCategory> | null;
};
export type StoresListQueryVariables = {
    count?: number | null;
    cursor?: string | null;
    where: StoresWhereInput;
    search?: string | null;
};
export type StoresListQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"StoresList_stores">;
};
export type StoresListQuery = {
    readonly response: StoresListQueryResponse;
    readonly variables: StoresListQueryVariables;
};



/*
query StoresListQuery(
  $count: Int
  $cursor: String
  $where: StoresWhereInput!
  $search: String
) {
  ...StoresList_stores
}

fragment StoresList_ContractResume_contract on Contract {
  id
  daysOfAntecedence
}

fragment StoresList_stores on Query {
  stores(first: $count, after: $cursor, where: $where, search: $search) {
    edges {
      node {
        id
        companyName
        tradeName
        contract {
          ...StoresList_ContractResume_contract
          id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "where"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "StoresListQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "StoresList_stores"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "StoresListQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "after",
            "variableName": "cursor"
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "search",
            "variableName": "search"
          },
          {
            "kind": "Variable",
            "name": "where",
            "variableName": "where"
          }
        ],
        "concreteType": "StoreConnection",
        "kind": "LinkedField",
        "name": "stores",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "StoreEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Store",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "companyName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "tradeName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Contract",
                    "kind": "LinkedField",
                    "name": "contract",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "daysOfAntecedence",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "10b356059dda3bf3c4b0deb9c181879a",
    "id": null,
    "metadata": {},
    "name": "StoresListQuery",
    "operationKind": "query",
    "text": "query StoresListQuery(\n  $count: Int\n  $cursor: String\n  $where: StoresWhereInput!\n  $search: String\n) {\n  ...StoresList_stores\n}\n\nfragment StoresList_ContractResume_contract on Contract {\n  id\n  daysOfAntecedence\n}\n\nfragment StoresList_stores on Query {\n  stores(first: $count, after: $cursor, where: $where, search: $search) {\n    edges {\n      node {\n        id\n        companyName\n        tradeName\n        contract {\n          ...StoresList_ContractResume_contract\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'abc60c13890c86c079856c5399f15c71';
export default node;
