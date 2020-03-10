/*
 * AppRoute.h
 *
 *  Created on: 10.03.2020
 *      Author: drichte
 */

#ifndef REPS_HERP_FRONTENDPROVIDER_DATA_APPROUTE_H_
#define REPS_HERP_FRONTENDPROVIDER_DATA_APPROUTE_H_

#include <HERP.FrontendProvider.Precompiled.h>

class HERP_FRONTEND_PROVIDER_DLL_EXPORT AppRoute : QObject {
	Q_OBJECT
public:

	QString routeName;
	QString viewKey;

	AppRoute();
	virtual ~AppRoute();
};

#endif /* REPS_HERP_FRONTENDPROVIDER_DATA_APPROUTE_H_ */
