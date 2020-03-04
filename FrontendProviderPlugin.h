/*
 * AuthorizationModulePlugin.h
 *
 *  Created on: 29.02.2020
 *      Author: doene
 */

#ifndef REPS_HERP_AUTHORIZATIONMODULE_AUTHORIZATIONMODULEPLUGIN_H_
#define REPS_HERP_AUTHORIZATIONMODULE_AUTHORIZATIONMODULEPLUGIN_H_

#include <ApplicationServerPluginInterface.h>
#include <HERP.FrontendProvider.Precompiled.h>

class HERP_FRONTEND_PROVIDER_DLL_EXPORT FrontendProviderPlugin: public ApplicationServerPluginInterface {

    Q_OBJECT
    Q_PLUGIN_METADATA(IID ApplicationServerPluginInterface_iid FILE "HERP.FrontendProviderPlugin.json")
    Q_INTERFACES(ApplicationServerPluginInterface)
public:
	FrontendProviderPlugin(QObject *parent = nullptr);
	virtual ~FrontendProviderPlugin();
	virtual void init(ApplicationServerInterface *app);
	virtual void install(ApplicationServerInterface *app);
};

#endif /* REPS_HERP_AUTHORIZATIONMODULE_AUTHORIZATIONMODULEPLUGIN_H_ */
