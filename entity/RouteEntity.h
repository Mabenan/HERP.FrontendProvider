/*
 * RouteEntity.h
 *
 *  Created on: 08.03.2020
 *      Author: doene
 */

#ifndef REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITY_H_
#define REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITY_H_

#include <model/ODataEntity.h>

class RouteEntity: public ODataEntity {
	Q_OBJECT
public:

	RouteEntity(QObject * parent) : ODataEntity(parent){
		this->description = "Route";
		this->name = "Route";
	};
	virtual void deleteEntity() const;
	virtual void update() const;
	virtual void insert() const;
	virtual QString getDescription();
	virtual void get(QMap<QString, QVariant> keys, QUrlQuery query);
};

#endif /* REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITY_H_ */
