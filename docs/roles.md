# User roles

To manage access to resources and acction in Condi application all permissions are handle with Role-Based Access Control(RBAC) also a user is asigned to a tenant(Condominium).

The avialable roles in the application now are:

- MASTER
- PADAWAN
- ADMIN
- RESIDENT
- ACCOUNTANT
- GUARD
- OWNER
- CO_OWNER

To understand better each role here's a detailed explanation of each one.

## MASTER

This is a user that its intention is only to create and manage users, without having access to any tenant, at beggining of times this will be a full access user that will help to configure the app, after that will only create admin/padawan users.

## PADAWAN

This is also a full access user, the difference with master will be that this user will be able to only see and control the condominuims with explicit access the intention of this user is to ~~be a helpdesk~~ help admin with any issue that could be happening within his tenant(s).

## ADMIN

This user will be in charge of managing it asigned tenant(s). Will have te ability to invite users with lower hierarchy. Also will be able to see and answer to tickets created by owner, co_owners and guard. The admin will have the ability to update the current budget of its tenant, create and approve new expences and register payments and incomes. The admin will be able to create new condominiums. If admin is supervised by a padawan, the created condominuim will be asigned to that user also (or could be radom, to be defined).

## Resident

The resident will be able to see and answer tickets created by owner, co_owners and guard. The resident will have the ability create new expences and register payments and incomes.

## ACCOUNTANT

The accountant will have the ability create and approve new expences and register payments and incomes.

## GUARD

The guard will be able to create tickets and scan visitors qr to log their entrance.

## OWNER

The owner will be able to create tickets and create visits to share the qr to provide access to condominum. The owner will have the hability to see the budget and expenses and to register it's fee payment.

## CO_OWNER

The owner will be able to create tickets and create visits to share the qr to provide access to condominum. The owner will have the hability to see the budget and expenses and to register it's fee payment.

## HOA_MEMBER

HOA role will be asigned only to a owner. Is not listed as will be specially asigned only by admin or resident. And will share permissions with resident.
