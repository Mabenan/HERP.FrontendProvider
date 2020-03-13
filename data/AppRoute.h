/*
 * AppRoute.h
 *
 *  Created on: 10.03.2020
 *      Author: drichte
 */

#ifndef REPS_HERP_FRONTENDPROVIDER_DATA_APPROUTE_H_
#define REPS_HERP_FRONTENDPROVIDER_DATA_APPROUTE_H_

#include <HERP.FrontendProvider.Precompiled.h>
#include <QObject>
#include <data/AuthObject.h>
class HERP_FRONTEND_PROVIDER_DLL_EXPORT AppRoute :  public QObject {
	Q_OBJECT
public:

	QString routeName;
	QString viewKey;
	AuthObject * neededAuthObject;

	AppRoute();
	virtual ~AppRoute();
};

#endif /* REPS_HERP_FRONTENDPROVIDER_DATA_APPROUTE_H_ */
