/*
 * PluginWebFilesProvider.h
 *
 *  Created on: 31.03.2020
 *      Author: drichte
 */

#ifndef REPS_HERP_FRONTENDPROVIDER_WEBSERVICES_PLUGINWEBFILESPROVIDER_H_
#define REPS_HERP_FRONTENDPROVIDER_WEBSERVICES_PLUGINWEBFILESPROVIDER_H_

#include <HERP.FrontendProvider.Precompiled.h>
#include <WebInterface.h>
class HERP_FRONTEND_PROVIDER_DLL_EXPORT PluginWebFilesProvider :  public WebInterface {

	Q_OBJECT
public:
	PluginWebFilesProvider(QObject* parent = nullptr): WebInterface(parent){

    }
	virtual ~PluginWebFilesProvider();
	virtual QString getName() const;
	virtual QString getRoute(ApplicationServerInterface *app);
	virtual QHttpServerResponse execute(const QHttpServerRequest *request,
			ApplicationServerInterface *app);
};

#endif /* REPS_HERP_FRONTENDPROVIDER_WEBSERVICES_PLUGINWEBFILESPROVIDER_H_ */
