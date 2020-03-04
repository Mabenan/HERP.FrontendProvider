/*
 * UI5ResourceProvider.h
 *
 *  Created on: 04.03.2020
 *      Author: doene
 */

#ifndef REPS_HERP_FRONTENDPROVIDER_WEBSERVICES_UI5RESOURCEPROVIDER_H_
#define REPS_HERP_FRONTENDPROVIDER_WEBSERVICES_UI5RESOURCEPROVIDER_H_

#include <HERP.FrontendProvider.Precompiled.h>
#include <WebInterface.h>

class HERP_FRONTEND_PROVIDER_DLL_EXPORT UI5ResourceProvider: public WebInterface {

	Q_OBJECT
public:
	UI5ResourceProvider(QObject* parent = nullptr): WebInterface(parent){

    }
    virtual~UI5ResourceProvider(){}
	virtual QString getName() const;
	virtual QString getRoute(ApplicationServerInterface *app);
	virtual QHttpServerResponse execute(const QHttpServerRequest *request,
			ApplicationServerInterface *app);
};

#endif /* REPS_HERP_FRONTENDPROVIDER_WEBSERVICES_UI5RESOURCEPROVIDER_H_ */
