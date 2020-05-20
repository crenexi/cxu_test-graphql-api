# Playground: ShipModel

## CountShipModels

#### Query

```
{
  shipModelsCount
  shipSpecsCount
}
```

## GetShipModels

#### Query

```
query GetShipModels {
  shipModels {
    ...shipModelFields
  }
}

# Ship model fields
fragment shipModelFields on ShipModel {
  id
  name
  description
  isFlightReady
  specs {
    id
    cargoCapacity
  }
}
```

## GetShipModel

#### Query

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
  "id": "ID_HERE",
  "deadId": "3e3da2d1-f402-4883-a040-3e8437f0546a"
}
```

## CreateShipModel

#### Query

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

## UpdateShipModel

#### Query

```
mutation UpdateShipModel(
  $apolloTriageId: ID!,
  $apolloTriageUpdates: UpdateShipModelInput!,
  $apolloMedivacId: ID!,
  $apolloMedivacUpdates: UpdateShipModelInput!
) {
  apolloTriage: updateShipModel(
    id: $apolloTriageId,
    input: $apolloTriageUpdates
  )
  apolloMedivac: updateShipModel(
    id: $apolloMedivacId,
    input: $apolloMedivacUpdates
  )
}
```

#### Query Variables

```json
{
  "apolloTriageId": "ID_HERE",
  "apolloTriageUpdates": {
    "description": "The legendary Apollo chassis from Roberts Space Industries is the gold standard in medevac and rapid emergency response, having provided critical aid to the known universe for well over two centuries."
  },
  "apolloMedivacId": "ID_HERE",
  "apolloMedivacUpdates": {
    "specsInput": {
      "cargoCapacity": 28
    }
  }
}
```

Note: ensure 1-1 relationship updates occur as expected. In this example, updates to "specsInput" should update the "specs" 1-1 relationship.

## DeleteShipModel

#### Query

```
mutation DeleteShipModel($id: ID!) {
  deleteShipModel(id: $id)
}
```

#### Query Variables

```json
{
  "id": "ID_HERE"
}
```
