#Auth
SERVICE=auth
VERSION=latest
IMAGE=acralacancha.azurecr.io/$SERVICE:$VERSION
docker build -t $IMAGE ../$SERVICE/
docker push $IMAGE

#spot
SERVICE=spot
VERSION=latest
IMAGE=acralacancha.azurecr.io/$SERVICE:$VERSION
docker build -t $IMAGE ../$SERVICE/ls

docker push $IMAGE

#calificacion
SERVICE=calificacion
VERSION=latest
IMAGE=acralacancha.azurecr.io/$SERVICE:$VERSION
docker build -t $IMAGE ../$SERVICE/
docker push $IMAGE