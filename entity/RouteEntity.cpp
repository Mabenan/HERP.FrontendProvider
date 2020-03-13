/*
 * RouteEntity.cpp
 *
 *  Created on: 08.03.2020
 *      Author: doene
 */

#include <entity/RouteEntity.h>

void RouteEntity::deleteEntity(QMap<QString, QVariant> keys, QUrlQuery query, QVariantMap head) const {
}

void RouteEntity::update(QMap<QString, QVariant> keys, QUrlQuery query, QVariantMap head) const {
}

void RouteEntity::insert(QMap<QString, QVariant> keys, QUrlQuery query, QVariantMap head) const {
}

QString RouteEntity::getDescription() {
	return this->description;
}

void RouteEntity::get(QMap<QString, QVariant> keys, QUrlQuery query, QVariantMap head) {
}

ODataEntity* RouteEntity::clone() const {
	return new RouteEntity(*this);
}
