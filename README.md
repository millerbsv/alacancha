# !A la Cancha! :soccer: :basketball: :tennis: :bowling:
App para convocar jugadores en partidos amistosos en tu ciudad


## Pagina tutorial crear kubernets

https://learn.microsoft.com/es-es/cli/azure/install-azure-cli-windows?view=azure-cli-latest&pivots=msi

## Crear ad sp "Usuario"

az ad sp create-for-rbac \
  --name "sp-diego" \
  --role Contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>

## registrar permisos

az provider register --namespace Microsoft.ContainerRegistry
az provider register --namespace Microsoft.ContainerService
az provider show --namespace Microsoft.ContainerService --query "registrationState"


## Base de datos

CREATE ROLE servicio_auth LOGIN PASSWORD 'Ma.....';

## Calificación
CREATE ROLE servicio_calificacion LOGIN PASSWORD 'Ma.....';

## Cupos
CREATE ROLE servicio_cupos LOGIN PASSWORD 'Ma.....';

## Notificaciones
CREATE ROLE servicio_notificaciones LOGIN PASSWORD 'Ma.....';


## Crear usuario para microservicios

ALTER ROLE servicio_auth SET search_path TO auth;
ALTER ROLE servicio_calificacion SET search_path TO calificacion;
ALTER ROLE servicio_cupos SET search_path TO cupos;
ALTER ROLE servicio_notificaciones SET search_path TO notificaciones;


GRANT USAGE ON SCHEMA auth TO servicio_auth;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA auth TO servicio_auth;

GRANT USAGE ON SCHEMA calificacion TO servicio_calificacion;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA calificacion TO servicio_calificacion;

GRANT USAGE ON SCHEMA cupos TO servicio_cupos;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA cupos TO servicio_cupos;

GRANT USAGE ON SCHEMA notificaciones TO servicio_notificaciones;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA notificaciones TO servicio_notificaciones;


## distribución de puertos

auth	PORT=3001
calificacion	PORT=3002
cupos	PORT=3003
notificaciones	PORT=3004


## publicar imagen docker
docker build -t auth-service:1.0.0 .

## subir imagen ACR
az acr login --name <acrName>
docker tag auth-service:1.0.0 <acrName>.azurecr.io/auth-service:1.0.0
docker push <acrName>.azurecr.io/auth-service:1.0.0
