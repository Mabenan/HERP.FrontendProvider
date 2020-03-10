/*
 * RouteEntity.h
 *
 *  Created on: 08.03.2020
 *      Author: doene
 */

#ifndef REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITY_H_
#define REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITY_H_

#include <model/ODataEntity.h>
#include <ApplicationServerInterface.h>
#include <HERP.FrontendProvider.Precompiled.h>

class RouteEntity: public ODataEntity {

private:
	ApplicationServerInterface * app;
public:

	RouteEntity(ApplicationServerInterface * app) : ODataEntity(){
		this->description = "Route";
		this->name = "Route";
		this->app = app;
		this->property.insert("routeName", new ODataProperty("Edm.String", true));
		this->property.insert("viewKey", new ODataProperty("Edm.String", false));
	};
	RouteEntity(const RouteEntity &routeEntity) : ODataEntity(routeEntity){

		this->app = routeEntity.app;

	}
	virtual void deleteEntity() const;
	virtual void update() const;
	virtual void insert() const;
	virtual QString getDescription();
	virtual void get(QMap<QString, QVariant> keys, QUrlQuery query);
	virtual ODataEntity* clone() const;
};

#endif /* REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITY_H_ */
