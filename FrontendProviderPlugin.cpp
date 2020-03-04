/*
 * AuthorizationModulePlugin.cpp
 *
 *  Created on: 29.02.2020
 *      Author: doene
 */

#include <FrontendProviderPlugin.h>
#include <webServices/UI5ResourceProvider.h>
#include <webServices/AppFrameworkProvider.h>

FrontendProviderPlugin::FrontendProviderPlugin(QObject *parent) : ApplicationServerPluginInterface(parent) {
	// TODO Auto-generated constructor stub

}

FrontendProviderPlugin::~FrontendProviderPlugin() {
	// TODO Auto-generated destructor stub
}

void FrontendProviderPlugin::init(ApplicationServerInterface *app) {

	app->registerWebInterface(new UI5ResourceProvider(this));
	app->registerWebInterface(new AppFrameworkProvider(this));


}
void FrontendProviderPlugin::install(ApplicationServerInterface * app){

}
