# Database

The proposed database structure is intended to hold the relations on between users and condominiums.

The following structure is planned for hosting permissions 'in house' but tables as `Role`, `Permission`, `UserRole` and the attribute `roleOverride` of `UserCondiminium` can be ommited if using an external permission service such as [Permit](https://permit.io/).

This diagram does not take in consideration authorization info such as `session` or `password` as from creation this is intended to be managed by an external service as [Clerk](https://clerk.com/)

```mermaid
classDiagram
    class User
    User : +String id
    User : +String name
    User : +String lastName
    User : +String externalId
    User : +String status
    User : +Timestamp createdAt
    User : +String createdBy
    User : +Timestamp lastUpdatedAt
    User : +String lastUpdatedBy
    User : +updata(Partial~User~)
    User : +create(User)
    User : +deactivate(User)

    class Permission
    Permission: String id
    Permission: String name
    Permission: String description
    Permission: String resource
    Permission: List~String~ alloweActions
    Permission : +String status
    Permission : +Timestamp createdAt
    Permission : +String createdBy
    Permission : +Timestamp lastUpdatedAt
    Permission : +String lastUpdatedBy
    Permission : +updata(Partial~Permission~)
    Permission : +create(Permission)

    class Role
    Role: String id
    Role: String name
    Role: String description
    Role: List~Permission~ permissions
    Role : +String status
    Role : +Timestamp createdAt
    Role : +String createdBy
    Role : +Timestamp lastUpdatedAt
    Role : +String lastUpdatedBy
    Role : +updata(Partial~Role~)
    Role : +create(Role)

    Role "1" --> "*" Permission

    class UserRole
    UserRole: User user
    UserRole: Role role
    UserRole : +String status
    UserRole : +Timestamp createdAt
    UserRole : +String createdBy
    UserRole : +Timestamp lastUpdatedAt
    UserRole : +String lastUpdatedBy
    UserRole : +updata(Partial~UserRole~)
    UserRole : +create(UserRole)

    User "1" --> "1" UserRole
    Role "1" --> "1" UserRole

    class Address
    Address : +String id
    Address : +String typeId
    Address : +String addressLine1
    Address : +String addressLine2
    Address : +String zipcode
    Address : +String city
    Address : +String state
    Address : +String country
    Address : +String status
    Address : +Timestamp createdAt
    Address : +String createdBy
    Address : +Timestamp lastUpdatedAt
    Address : +String lastUpdatedBy
    Address : +updata(Partial~Address~)
    Address : +create(Address)
    Address : +deactivate(Address)

    class Condominium
    Condominium : +String id
    Condominium : +String typeId
    Condominium : +String name
    Condominium : +String status
    Condominium : +Address address
    Condominium : +Number totalResidences
    Condominium : +Number avialableParkingSpots
    Condominium : +Timestamp createdAt
    Condominium : +String createdBy
    Condominium : +Timestamp lastUpdatedAt
    Condominium : +String lastUpdatedBy
    Condominium : +updata(Partial~Condominium~)
    Condominium : +create(Condominium)
    Condominium : +deactivate(Condominium)

    Condominium "1" --> "1" Address
    
    class UserCondiminium
    UserCondiminium : +User user
    UserCondiminium : +Condominium condominium
    UserCondiminium : +UserRole roleOverride
    UserCondiminium : +String status
    UserCondiminium : +Timestamp createdAt
    UserCondiminium : +String createdBy
    UserCondiminium : +Timestamp lastUpdatedAt
    UserCondiminium : +String lastUpdatedBy
    UserCondiminium : +updata(Partial~UserCondiminium~)
    UserCondiminium : +create(UserCondiminium)
    UserCondiminium : +deactivate(UserCondiminium)

    User "*" --> "1" UserCondiminium
    Condominium "*" --> "1" UserCondiminium

    class Document
    Document : +String id
    Document : +String url
    Document : +String type
    Document : +String status
    Document : +Timestamp createdAt
    Document : +String createdBy
    Document : +Timestamp lastUpdatedAt
    Document : +String lastUpdatedBy
    Document : +updata(Partial~Document~)
    Document : +create(Document)
    Document : +deactivate(Document)

    class MovementType
    MovementType: String id
    MovementType: String name
    MovementType: String description
    MovementType: boolean hideIssuer
    MovementType: boolean hideCreator
    MovementType: boolean hideDescription

    class CondominiumExpenseAndIncome
    CondominiumExpenseAndIncome : +String id
    CondominiumExpenseAndIncome : +MovementType type
    CondominiumExpenseAndIncome : +String description
    CondominiumExpenseAndIncome : +String status
    CondominiumExpenseAndIncome : +Number quantity
    CondominiumExpenseAndIncome : +String reason
    CondominiumExpenseAndIncome : +String issuerId
    CondominiumExpenseAndIncome : +List~Document~ documents
    CondominiumExpenseAndIncome : +String status
    CondominiumExpenseAndIncome : +Timestamp createdAt
    CondominiumExpenseAndIncome : +String createdBy
    CondominiumExpenseAndIncome : +Timestamp lastUpdatedAt
    CondominiumExpenseAndIncome : +String lastUpdatedBy
    CondominiumExpenseAndIncome : +updata(Partial~CondominiumExpenseAndIncome~)
    CondominiumExpenseAndIncome : +create(CondominiumExpenseAndIncome)
    CondominiumExpenseAndIncome : +approve(CondominiumExpenseAndIncome)
    CondominiumExpenseAndIncome : +reject(CondominiumExpenseAndIncome)

    Condominium "1" --> "*" CondominiumExpenseAndIncome
    CondominiumExpenseAndIncome "1" --> "*" Document
    CondominiumExpenseAndIncome "1" --> "1" MovementType

    class Residence
    Residence : +String id
    Residence : +User owner
    Residence : +User co_owner
    Residence : +Condominium Condominium
    Residence : +String customIdentifier
    Residence : +String status
    Residence : +Timestamp createdAt
    Residence : +String createdBy
    Residence : +Timestamp lastUpdatedAt
    Residence : +String lastUpdatedBy
    Residence : +updata(Partial~User~)
    Residence : +create(User)
    Residence : +deactivate(User)

    Condominium "1" --> "*" Residence
    Residence "1" --> "2" User

    class Visitor
    Visitor : +String id
    Visitor : +User issuerId
    Visitor : +Condominium Condominium
    Visitor : +String name
    Visitor : +String lastName
    Visitor : +String email
    Visitor : +String phone
    Visitor : +Document visitCode
    Visitor : +Number requiredParkingSpots
    Visitor : +Number approvedParkingSpots
    Visitor : +Timestamp date
    Visitor : +String status
    Visitor : +Timestamp createdAt
    Visitor : +String createdBy
    Visitor : +Timestamp lastUpdatedAt
    Visitor : +String lastUpdatedBy
    Visitor : +updata(Partial~User~)
    Visitor : +create(User)
    Visitor : +approve(User)
    Visitor : +reject(User)

    User "1" --> "*" Visitor
```

To understand this diagran is important to know tha:

- an user can be asigned to multiple condominiums
- a condominium have multiple ways of make expenses and incomes
- each movement have an issuer an a creator
- regarding the movement type, one or many fields may have to be hidden for privacy.
- each movement need to have at least one document as proof
- if a movement is created by owner, co_owner or guard it needs appovar of hoa_merber, resident, accountant or administrator
- when owner, co_owner creates a visitor and requires parking spots it needs approval from hoa_merber, resident, accountant or administrator for those spots
- a visitor is alway approved and get a qr to get access to condominium
