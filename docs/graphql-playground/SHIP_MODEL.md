# Playground: ShipModel

## GetShipModels

```
{
  shipModels {
    ...shipModelFields
  }
}

# Ship model fields
fragment shipModelFields on ShipModel {
  name
  isFlightReady
  specs {
    sizeClass
  }
}
```

## GetShipModel

```
query GetShipModel($id: ID!, $deadId: ID!) {
  shipModel: shipModel(id: $id) {
    __typename
    ... on ShipModel {
      ...shipModelFields
    }
    ... on WarnNotFound {
      notFoundNotice
    }
  }

  deadShipModel: shipModel(id: $deadId) {
    __typename
    ... on ShipModel {
      ...shipModelFields
    }
    ... on WarnNotFound {
      notFoundNotice
    }
  }
}

# Ship model fields
fragment shipModelFields on ShipModel {
  name
  description
  isFlightReady
  updatedAt
  specs {
    sizeClass
    crewClass
    lengthClass
    cargoCapacity
    updatedAt
  }
}
```

#### Query Variables

```json
{
  "id": "ad48bb7e-e909-457e-b6ca-94d1edba8aa3",
  "deadId": "3e3da2d1-f402-4883-a040-3e8437f0546a"
}
```

## CreateShipModel

```
mutation CreateShipModel(
  $apolloTriage: CreateShipModelInput!,
  $apolloMedivac: CreateShipModelInput!
) {
  apolloTriage: createShipModel(input: $apolloTriage)
  apolloMedivac: createShipModel(input: $apolloMedivac)
}
```

#### Query Variables
```json
{
  "apolloTriage": {
    "name": "Apollo Triage",
    "description": "The legendary Apollo chassis from Roberts Space Industries is the gold standard in medevac and rapid emergency response, having provided critical aid to the known universe for well over two centuries.",
    "specsInput": {
      "sizeClass": "LARGE",
      "crewClass": "SMALL",
      "lengthClass": "LARGE",
      "cargoCapacity": 28
    }
  },
  "apolloMedivac": {
    "name": "Apollo Medivac",
    "description": "Along with superior armor and dual missile racks, the 2948 Apollo Medivac model pays homage to the classic 2910 film, Astromedics: Back from the Brink, with livery that accurately recreates the headlining Kithara.",
    "specsInput": {
      "sizeClass": "LARGE",
      "crewClass": "SMALL",
      "lengthClass": "LARGE",
      "cargoCapacity": 28
    }
  }
}
```
