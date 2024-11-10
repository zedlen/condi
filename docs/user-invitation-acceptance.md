# User accept invitation

After a user is invited to use condi, he will get an invitation email with a link where he would be able to sign up to the application.

```mermaid
sequenceDiagram
  actor User as User
  participant AS as Authentication Service
  participant Condi as Condi
  participant US as Users Service
  participant PS as Permission Service

  AS-->>User: Send invitation mail
  User->>AS: Sign up in platform

  AS-->>User: Succesfull register <br/> redirect to condi

  AS-->>Condi: Webhook: new user created
  Condi-->>+US: New user event
  US->>PS: Create user with<br/> specified role and tenant in meta data
  PS->>US: User created correctly
  US->US: Create new user on DB
```

After the user register on authentication service, this service with notify Condi(our gateway) of the new user, this will create a new event that user service is listening to, when reciving the event, user service will create the user on permission service with the permission and scope defined on metadata of user.
