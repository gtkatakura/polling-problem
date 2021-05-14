/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type StoresList_ContractResume_contract = {
    readonly id: string;
    readonly daysOfAntecedence: number;
    readonly " $refType": "StoresList_ContractResume_contract";
};
export type StoresList_ContractResume_contract$data = StoresList_ContractResume_contract;
export type StoresList_ContractResume_contract$key = {
    readonly " $data"?: StoresList_ContractResume_contract$data;
    readonly " $fragmentRefs": FragmentRefs<"StoresList_ContractResume_contract">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./StoresList_ContractResume_contract_refetch.graphql.ts'),
      "identifierField": "id"
    }
  },
  "name": "StoresList_ContractResume_contract",
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
      "name": "daysOfAntecedence",
      "storageKey": null
    }
  ],
  "type": "Contract",
  "abstractKey": null
};
(node as any).hash = '6598e9d6cd27dbfe3379ab63ea87cae9';
export default node;
