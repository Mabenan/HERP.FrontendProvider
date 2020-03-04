/*
 * AppFrameworkProvider.h
 *
 *  Created on: 04.03.2020
 *      Author: doene
 */

#ifndef REPS_HERP_FRONTENDPROVIDER_WEBSERVICES_APPFRAMEWORKPROVIDER_H_
#define REPS_HERP_FRONTENDPROVIDER_WEBSERVICES_APPFRAMEWORKPROVIDER_H_

#include <HERP.FrontendProvider.Precompiled.h>
#include <WebInterface.h>

class HERP_FRONTEND_PROVIDER_DLL_EXPORT AppFrameworkProvider: public WebInterface {
	Q_OBJECT
public:
	AppFrameworkProvider(QObject* parent = nullptr): WebInterface(parent){

    }
    virtual~AppFrameworkProvider(){}
	virtual QString getName() const;
	virtual QString getRoute(ApplicationServerInterface *app);
	virtual QHttpServerResponse execute(const QHttpServerRequest *request,
			ApplicationServerInterface *app);
};

#endif /* REPS_HERP_FRONTENDPROVIDER_WEBSERVICES_APPFRAMEWORKPROVIDER_H_ */
