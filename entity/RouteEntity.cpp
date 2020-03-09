/*
 * RouteEntity.cpp
 *
 *  Created on: 08.03.2020
 *      Author: doene
 */

#include <entity/RouteEntity.h>

void RouteEntity::deleteEntity() const {
}

void RouteEntity::update() const {
}

void RouteEntity::insert() const {
}

QString RouteEntity::getDescription() {
	return this->description;
}

void RouteEntity::get(QMap<QString, QVariant> keys, QUrlQuery query) {
}

ODataEntity* RouteEntity::clone() const {
	return new RouteEntity(*this);
}
