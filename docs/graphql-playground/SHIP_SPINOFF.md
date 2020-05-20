# Playground: ShipSpinoff

## CreateShipSpinoff

```
mutation CreateShipSpinoff($modelId:ID, $input: CreateShipSpinoffInput!) {
  createShipSpinoff(modelId: $modelId, input: $input)
}
```

#### Query

```json
{
  "modelId": "ID_HERE",
  "input": {
    "name": "Apollo Triage Stealth Edition",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  }
}
```

## UpdateShipSpinoff

```
mutation UpdateShipSpinoff($id: ID!, $input: UpdateShipSpinoffInput!) {
	updateShipSpinoff(id: $id, input: $input)
}
```

#### Query

```json
{
  "id": "ID_HERE",
  "input": {
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  }
}
```

## DeleteShipSpinoff

```
mutation DeleteShipSpinoff($id: ID!) {
  deleteShipSpinoff(id: $id)
}
```

#### Query

```json
{
  "id": "ID_HERE"
}
```
