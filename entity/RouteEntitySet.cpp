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
void RouteEntitySet::getSet(QUrlQuery query) {

	QList<QObject *> routes = app->getValues("APP_FRONTEND_ROUTES");
	for(QObject * routeObject : routes){
		AppRoute * appRoute = static_cast<AppRoute *>(routeObject);
		RouteEntity * entity = new RouteEntity(this->app);
		entity->data.insert("routeName", appRoute->routeName);
		entity->data.insert("viewKey", appRoute->viewKey);
		this->entities.append(entity);
	}

}

void RouteEntitySet::updateSet() const {
}

void RouteEntitySet::deleteSet() const {
}

void RouteEntitySet::insertSet() const {
}

ODataEntity* RouteEntitySet::get(QMap<QString, QVariant> keys,
		QUrlQuery query) {
}

ODataEntitySet* RouteEntitySet::clone() const {
	return new RouteEntitySet(*this);
}
