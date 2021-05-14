import type { FC } from 'react'
import React, { Suspense, useState } from 'react'
import { Button, Flex, Search, StatefulTable, Text } from '@vtex/admin-ui'
import { graphql } from 'babel-plugin-relay/macro'
import {
  useLazyLoadQuery,
  useFragment,
  useRefetchableFragment,
  useIsConnected,
} from 'react-relay-offline'

import type { StoresListQuery } from './__generated__/StoresListQuery.graphql'
import type { StoresList_ContractResume_contract$key } from './__generated__/StoresList_ContractResume_contract.graphql'
import type { StoresList_stores$key } from './__generated__/StoresList_stores.graphql'
import type { StoresList_ContractResume_contract_refetch } from './__generated__/StoresList_ContractResume_contract_refetch.graphql'

type StoresWhereInput = any

type ContractResumeProps = {
  contract: StoresList_ContractResume_contract$key
}

export const ContractResume: FC<ContractResumeProps> = (props) => {
  const { data: contract, refetch } = useRefetchableFragment<
    StoresList_ContractResume_contract_refetch,
    StoresList_ContractResume_contract$key
  >(
    graphql`
      fragment StoresList_ContractResume_contract on Contract
      @refetchable(queryName: "StoresList_ContractResume_contract_refetch") {
        id
        daysOfAntecedence
      }
    `,
    props.contract
  )

  const reload = () => refetch({}, { fetchPolicy: 'network-only' })

  return (
    <Flex>
      <Text variant="highlight">Antecedence: {contract.daysOfAntecedence}</Text>
      <Button size="small" onClick={reload}>
        Reload
      </Button>
    </Flex>
  )
}

type StoreListProps = {
  where: StoresWhereInput
}

const PER_PAGE = 3

declare global {
  interface RelayConnections {
    StoreList_stores: {
      where: StoresWhereInput
      search?: string
    }
  }
}

export const StoresList: FC<StoreListProps> = ({ where }) => {
  const response = useLazyLoadQuery<StoresListQuery>(
    graphql`
      query StoresListQuery(
        $count: Int
        $cursor: String
        $where: StoresWhereInput!
        $search: String
      ) {
        ...StoresList_stores
      }
    `,
    { count: PER_PAGE, where, search: '' },
    {
      fetchPolicy: 'store-and-network',
      networkCacheConfig: {
        poll: 3000,
      },
    }
  )

  const list = useFragment<StoresList_stores$key>(
    graphql`
      fragment StoresList_stores on Query {
        stores(first: $count, after: $cursor, where: $where, search: $search) {
          edges {
            node {
              id
              # eslint-disable-next-line relay/unused-fields
              companyName
              # eslint-disable-next-line relay/unused-fields
              tradeName
              contract {
                ...StoresList_ContractResume_contract
              }
            }
          }
        }
      }
    `,
    response.data!
  )

  const isConnected = useIsConnected()

  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    // list.refetch(
    //   {
    //     count: Math.max(list.data.stores.edges.length, PER_PAGE),
    //     where,
    //     search: searchText,
    //   },
    //   {
    //     fetchPolicy: isConnected ? 'store-and-network' : 'store-only',
    //     onComplete: (error) => {
    //       if (!error) setSearch(searchText)
    //     },
    //   }
    // )
  }

  return (
    <>
      <Search
        id={`search-${where.category}`}
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSubmit={handleSearch}
        loading={false}
      />
      <StatefulTable
        getRowKey={(item) => item.id}
        density="compact"
        columns={[
          {
            id: 'companyName',
            header: 'Company Name',
            width: 148,
          },
          {
            id: 'tradeName',
            header: 'Trade Name',
            width: 156,
          },
          {
            id: 'contract',
            header: 'Contract',
            width: 156,
            resolver: {
              type: 'plain',
              render: function renderContract({ item }) {
                if (!item.contract) return null

                return (
                  <Suspense fallback={<Text variant="small">Loading</Text>}>
                    <ContractResume contract={item.contract} />
                  </Suspense>
                )
              },
            },
          },
        ]}
        items={list.stores.edges.map((edge) => edge.node)}
      />
      {/* <Button
        onClick={() => list.loadNext(PER_PAGE)}
        disabled={!list.hasNext || list.isLoadingNext}
      >
        {list.isLoadingNext ? 'Loading...' : 'Load more'}
      </Button> */}
    </>
  )
}
