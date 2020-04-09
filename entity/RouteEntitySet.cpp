/*
 * RouteEntitySet.cpp
 *
 *  Created on: 08.03.2020
 *      Author: doene
 */

#include <entity/RouteEntitySet.h>
#include <QList>
#include <QObject>
#include <data/AppRoute.h>
#include <QVariant>
#include <QVariantMap>
void RouteEntitySet::getSet(QUrlQuery query, QVariantMap head) {

	QList<QObject*> routes = app->getValues("APP_FRONTEND_ROUTES");
	for (QObject *routeObject : routes) {
		AppRoute *appRoute = static_cast<AppRoute*>(routeObject);
		bool auth = true;
		if (appRoute->neededAuthObject != "") {
			QVariantMap variantMap;
			variantMap.insert("auth_guid", head["auth_guid"]);
			auth = app->isUserAuthorized(head["user"].toString(),
					appRoute->neededAuthObject, variantMap);
		}
		if (auth && !appRoute->hiddenRoute) {
			RouteEntity *entity = new RouteEntity(this->app);
			entity->data.insert("routeName", appRoute->routeName);
			entity->data.insert("viewKey", appRoute->viewKey);
			this->entities.append(entity);
		}
	}

}

void RouteEntitySet::updateSet(QUrlQuery query, QVariantMap head) const {
}

void RouteEntitySet::deleteSet(QUrlQuery query, QVariantMap head) const {
}

void RouteEntitySet::insertSet(QUrlQuery query, QVariantMap head) const {
}

ODataEntity* RouteEntitySet::get(QMap<QString, QVariant> keys, QUrlQuery query,
		QVariantMap head) {
	QString routeName = keys["routeName"].toString();
	RouteEntity *entity = new RouteEntity(this->app);

	QList<QObject*> routes = app->getValues("APP_FRONTEND_ROUTES");
	for (QObject *routeObject : routes) {
		AppRoute *appRoute = static_cast<AppRoute*>(routeObject);
		if(appRoute->routeName == routeName){
			bool auth = true;
			if (appRoute->neededAuthObject != "") {
				QVariantMap variantMap;
				variantMap.insert("auth_guid", head["auth_guid"]);
				auth = app->isUserAuthorized(head["user"].toString(),
						appRoute->neededAuthObject, variantMap);
			}
			if (auth) {
			entity->data.insert("routeName", appRoute->routeName);
			entity->data.insert("viewKey", appRoute->viewKey);
			}
		}
	}
	return entity;
}

ODataEntitySet* RouteEntitySet::clone() const {
	return new RouteEntitySet(*this);
}
