/*
 * RouteEntitySet.cpp
 *
 *  Created on: 08.03.2020
 *      Author: doene
 */

#include <entity/RouteEntitySet.h>

void RouteEntitySet::getSet(QUrlQuery query) {
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
