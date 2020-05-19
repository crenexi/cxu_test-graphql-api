# Playground: ShipModel Operations

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

### Query Variables
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
