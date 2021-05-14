/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type StoresList_ContractResume_contract_refetchVariables = {
    id: string;
};
export type StoresList_ContractResume_contract_refetchResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"StoresList_ContractResume_contract">;
    } | null;
};
export type StoresList_ContractResume_contract_refetch = {
    readonly response: StoresList_ContractResume_contract_refetchResponse;
    readonly variables: StoresList_ContractResume_contract_refetchVariables;
};



/*
query StoresList_ContractResume_contract_refetch(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...StoresList_ContractResume_contract
    id
  }
}

fragment StoresList_ContractResume_contract on Contract {
  id
  daysOfAntecedence
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StoresList_ContractResume_contract_refetch",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StoresList_ContractResume_contract"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StoresList_ContractResume_contract_refetch",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "daysOfAntecedence",
                "storageKey": null
              }
            ],
            "type": "Contract",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1f0d09d171462373c0f8b44493039430",
    "id": null,
    "metadata": {},
    "name": "StoresList_ContractResume_contract_refetch",
    "operationKind": "query",
    "text": "query StoresList_ContractResume_contract_refetch(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...StoresList_ContractResume_contract\n    id\n  }\n}\n\nfragment StoresList_ContractResume_contract on Contract {\n  id\n  daysOfAntecedence\n}\n"
  }
};
})();
(node as any).hash = '6598e9d6cd27dbfe3379ab63ea87cae9';
export default node;
