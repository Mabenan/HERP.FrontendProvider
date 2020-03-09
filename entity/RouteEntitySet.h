/*
 * RouteEntitySet.h
 *
 *  Created on: 08.03.2020
 *      Author: doene
 */

#ifndef REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITYSET_H_
#define REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITYSET_H_

#include <model/ODataEntitySet.h>
#include <entity/RouteEntity.h>
class RouteEntitySet: public ODataEntitySet {
public:
	RouteEntitySet() : ODataEntitySet() {
		this->entity = new RouteEntity();
		this->name = "RouteSet";


	};
	virtual void getSet(QUrlQuery query);
	virtual void updateSet() const;
	virtual void deleteSet() const;
	virtual void insertSet() const;
	virtual ODataEntity* get(QMap<QString, QVariant> keys, QUrlQuery query);
	virtual ODataEntitySet* clone() const;
};

#endif /* REPS_HERP_FRONTENDPROVIDER_ENTITY_ROUTEENTITYSET_H_ */
