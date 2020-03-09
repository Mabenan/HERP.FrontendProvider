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
public:

	RouteEntity() : ODataEntity(){
		this->description = "Route";
		this->name = "Route";
	};
	RouteEntity(const RouteEntity &routeEntity) : ODataEntity(routeEntity){

	}
	virtual void deleteEntity() const;
	virtual void update() const;
	virtual void insert() const;
	virtual QString getDescription();
	virtual void get(QMap<QString, QVariant> keys, QUrlQuery query);
	virtual ODataEntity* clone() const;
};

#endif /* REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITY_H_ */
