/*
 * AuthorizationModulePlugin.cpp
 *
 *  Created on: 29.02.2020
 *      Author: doene
 */

#include <FrontendProviderPlugin.h>
#include <webServices/UI5ResourceProvider.h>
#include <webServices/AppFrameworkProvider.h>
#include <webServices/PluginWebFilesProvider.h>
#include <model/ODataEntityContainer.h>
#include <entity/RouteEntitySet.h>
#include <ODataSchema.h>
#include <data/AppRoute.h>
FrontendProviderPlugin::FrontendProviderPlugin(QObject *parent) : ApplicationServerPluginInterface(parent) {
	// TODO Auto-generated constructor stub

}

FrontendProviderPlugin::~FrontendProviderPlugin() {
	// TODO Auto-generated destructor stub
}

void FrontendProviderPlugin::init(ApplicationServerInterface *app) {

	app->registerWebInterface(new UI5ResourceProvider(this));
	app->registerWebInterface(new AppFrameworkProvider(this));
	app->registerWebInterface(new PluginWebFilesProvider(this));
	AppRoute * appRoute = new AppRoute();
	appRoute->routeName = "Home";
	appRoute->viewKey = "view.Home";
	app->addValue("APP_FRONTEND_ROUTES", appRoute);

	ODataEntityContainer * routeEntityContainer = new ODataEntityContainer();

	routeEntityContainer->entitySets.insert("RouteSet", new RouteEntitySet(app));
	app->addValue("ODATA_ENTITY_MAP", routeEntityContainer);
}
void FrontendProviderPlugin::install(ApplicationServerInterface * app){

}
