/*
 * AppFrameworkProvider.cpp
 *
 *  Created on: 04.03.2020
 *      Author: doene
 */

#include <webServices/AppFrameworkProvider.h>
#include <data/AppRoute.h>

QString AppFrameworkProvider::getName() const {
	return "appFrameworkProvider";
}

QString AppFrameworkProvider::getRoute(ApplicationServerInterface *app) {
	return "/(index.html|$|controller\/.*|view\/.*|formatter\/.*|i18n\/.*|[^\/]*$)";
}

QHttpServerResponse AppFrameworkProvider::execute(
		const QHttpServerRequest *request, ApplicationServerInterface *app) {
	qDebug() << "AppFramework";
	QString requestedFile = request->url().path();
	requestedFile = requestedFile.remove(0,1);
	qDebug() << requestedFile;
	QDir currentDir = QDir(QCoreApplication::applicationDirPath());
	currentDir.cd("frontend");
	if(requestedFile.isEmpty())
	{
		requestedFile = "index.html";
	}
	if(requestedFile == "manifest.json"){
	    QFile jsonFile(currentDir.absoluteFilePath(requestedFile));
	    jsonFile.open(QFile::ReadOnly);
	    QJsonObject manifest = QJsonDocument::fromJson(jsonFile.readAll()).object();
		QJsonObject sapui5 = manifest["sap.ui5"].toObject();
		QJsonArray routes;
		QJsonObject targets;
		QList<QObject *> routeObjects = app->getValues("APP_FRONTEND_ROUTES");
		for(QObject * routeObject : routeObjects){
			AppRoute * appRoute = static_cast<AppRoute *>(routeObject);
			QJsonObject jsonRoute;
			jsonRoute["pattern"] = QJsonValue::fromVariant(QVariant::fromValue(appRoute->viewKey));
			jsonRoute["name"] = QJsonValue::fromVariant(QVariant::fromValue(appRoute->viewKey));
			jsonRoute["target"] = QJsonValue::fromVariant(QVariant::fromValue(appRoute->viewKey));
			QJsonObject appRouteTarget = QJsonObject();
			appRouteTarget["viewName"] = appRoute->viewKey;
			appRouteTarget["viewLevel"] = 1;
			targets[appRoute->viewKey] = appRouteTarget;
			routes.append(jsonRoute);
		}
		QJsonObject jsonRoute;
		jsonRoute["pattern"] = QJsonValue::fromVariant(QVariant::fromValue(QString("")));
		jsonRoute["name"] = QJsonValue::fromVariant(QVariant::fromValue(QString("home")));
		jsonRoute["target"] = QJsonValue::fromVariant(QVariant::fromValue(QString("home")));
		QJsonObject appRouteTarget = QJsonObject();
		appRouteTarget["viewName"] = "view.Home";
		appRouteTarget["viewLevel"] = 1;
		targets["home"] = appRouteTarget;
		routes.append(jsonRoute);
		QJsonObject routing;
		routing = sapui5["routing"].toObject();
		routing["routes"] = routes;
		routing["targets"] = targets;
		sapui5["routing"] = routing;
		manifest["sap.ui5"] = sapui5;
		qDebug() << manifest;
		return manifest;
	}else{
	return QHttpServerResponse::fromFile(currentDir.absoluteFilePath(requestedFile));
	}
}
