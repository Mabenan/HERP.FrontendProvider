/*
 * AuthorizationModulePlugin.cpp
 *
 *  Created on: 29.02.2020
 *      Author: doene
 */

#include <FrontendProviderPlugin.h>
#include <webServices/UI5ResourceProvider.h>
#include <webServices/AppFrameworkProvider.h>
#include <model/ODataEntityContainer.h>
#include <entity/RouteEntitySet.h>
#include <ODataSchema.h>

FrontendProviderPlugin::FrontendProviderPlugin(QObject *parent) : ApplicationServerPluginInterface(parent) {
	// TODO Auto-generated constructor stub

}

FrontendProviderPlugin::~FrontendProviderPlugin() {
	// TODO Auto-generated destructor stub
}

void FrontendProviderPlugin::init(ApplicationServerInterface *app) {

	app->registerWebInterface(new UI5ResourceProvider(this));
	app->registerWebInterface(new AppFrameworkProvider(this));


	ODataEntityContainer * routeEntityContainer = new ODataEntityContainer();
	ODataSchema * schema1 = new ODataSchema("FrontendSchema", routeEntityContainer);

	routeEntityContainer->entitySets.insert("RouteSet", new RouteEntitySet());
	app->addValue("ODATA_SCHEMA_MAP", schema1);
}
void FrontendProviderPlugin::install(ApplicationServerInterface * app){

}
