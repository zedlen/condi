# Creating a new user

To create a new user it has to options.

## User with role MASTER creates an ADMIN

When an master/padawan user create an admin user, this admin user will be created without assigned tenant as the admin will have the ability to create it's own tenants, also this will bring the ability to assing the admin to an existing tenant after admin accepts invitation. You will find the request to create a new admin user in the api docs or in postman example collection.

```mermaid
sequenceDiagram
  actor UserMaster as User Master/Padawan
  participant Condi as Condi
  participant UserService as UserService
  participant AuthenticationService as AuthenticationService


  UserMaster ->>+ Condi: Invite admin user
  Note right of UserMaster: When master creates(invites) an admin user <br/> it will be without condominiums nor resideces asigned <br/> after accepting invitation admin user will be able to create <br/> new condomiums (tenant on permision service) <br/> and invite users to that condominium
  Condi -->>+ UserMaster: Invitation request created
  break bad request from user
    Condi -->> UserMaster: Invalid/Bad request
  end
  Condi -->> UserService: create admin invitation
  Note over Condi, UserService: This is an async request <br/> using a message broker
  UserService ->> AuthenticationService: create invitaion
  AuthenticationService -->> UserService: Invitation created
  break when invitation was<br/>already send
    AuthenticationService -->> UserService: Invitation already sended
  end
```

## User with role ADMIN creates any role with lower hierarchy

When an admin user creates an user with lower hierarchy, this user will be created with at least an assigned tenant an optional an residence assigned to the user(this wil be in case of owner/co_owner).

```mermaid
sequenceDiagram
  actor UserAdmin as User Admin
  participant Condi as Condi
  participant UserService as UserService
  participant AuthenticationService as AuthenticationService


  UserAdmin ->>+ Condi: Invite admin user
  Note right of UserAdmin: When Admin invites an user(guard/resident/owner/co-owner) <br/> it will be without atleast one condominium and one residece asigned <br/> after accepting invitation user will be able to see the scope he was invited for
  Condi -->>+ UserAdmin: Invitation request created
  break bad request from user
    Condi -->> UserAdmin: Invalid/Bad request
  end
  Condi -->> UserService: create invitation
  Note over Condi, UserService: This is an async request <br/> using a message broker
  UserService ->> AuthenticationService: create invitaion
  AuthenticationService -->> UserService: Invitation created
  break when invitation was<br/>already send
    AuthenticationService -->> UserService: Invitation already sended
  end
```
