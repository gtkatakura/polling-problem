/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type StoresList_stores = {
    readonly stores: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly companyName: string;
                readonly tradeName: string;
                readonly contract: {
                    readonly " $fragmentRefs": FragmentRefs<"StoresList_ContractResume_contract">;
                } | null;
            };
        }>;
    };
    readonly " $refType": "StoresList_stores";
};
export type StoresList_stores$data = StoresList_stores;
export type StoresList_stores$key = {
    readonly " $data"?: StoresList_stores$data;
    readonly " $fragmentRefs": FragmentRefs<"StoresList_stores">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "count"
    },
    {
      "kind": "RootArgument",
      "name": "cursor"
    },
    {
      "kind": "RootArgument",
      "name": "search"
    },
    {
      "kind": "RootArgument",
      "name": "where"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "StoresList_stores",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
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
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "StoresList_ContractResume_contract"
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
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'a756e3b89fd860a8cfa1cc0af89719d0';
export default node;
